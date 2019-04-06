using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Projekcik.Api.Models;
using Projekcik.Api.Models.DTO;
using Projekcik.Api.Services;

namespace Projekcik.Api.Controllers
{
    [Route("api/externalauth")]
    public class ExternalAuthController : ControllerBase
    {
        private static readonly HttpClient Client = new HttpClient();
        private readonly IConfiguration _configuration;
        private readonly ITokenIssuer _tokenIssuer;
        private readonly IUserService _userService;

        private string AppId { get; }
        private string AppSecret { get; }

        public ExternalAuthController(IConfiguration configuration, ITokenIssuer tokenIssuer, IUserService userService)
        {
            _configuration = configuration;
            _tokenIssuer = tokenIssuer;
            _userService = userService;

            AppId = _configuration["Facebook:AppId"];
            AppSecret = _configuration["Facebook:AppSecret"];
        }

        [HttpPost("facebook-login")]
        public async Task<IActionResult> Facebook([FromBody]FacebookAuthViewModel model)
        {
            // 1.generate an app access token
            var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={AppId}&client_secret={AppSecret}&grant_type=client_credentials");
            var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);
            // 2. validate the user access token
            var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={model.AccessToken}&access_token={appAccessToken.AccessToken}");
            var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

            if (!userAccessTokenValidation.Data.IsValid)
                return BadRequest("Invalid facebook token");

            // 3. we've got a valid token so we can request user data from fb
            var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday,picture&access_token={model.AccessToken}");
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);
            if (string.IsNullOrWhiteSpace(userInfo.Email))
                return BadRequest("Could not get user's email address from facebook. Please check login permissions");

            // 4. ready to create the local user account (if necessary) and jwt
            var existingUser = _userService.GetByEmailAddress(userInfo.Email);
            if (existingUser == null)
            {
                var newUser = new User
                {
                    FirstName = userInfo.FirstName,
                    LastName = userInfo.LastName,
                    FacebookId = userInfo.Id,
                    EmailAddress = userInfo.Email,
                    UserName = userInfo.Email,
                    PictureUrl = userInfo.Picture.Data.Url
                };

                _userService.Create(newUser, Guid.NewGuid().ToString());
            }

            // generate the jwt for the local user...
            existingUser = _userService.GetByEmailAddress(userInfo.Email);
            if (existingUser == null)
                return BadRequest("Could not create user account");

            var token = _tokenIssuer.Issue(existingUser);
            return Ok(new
            {
                existingUser.Id,
                token
            });
        }
    }
}
