using System;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Projekcik.Api.Models;
using Projekcik.Api.Models.DTO;
using Projekcik.Api.Services;

namespace Projekcik.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ITokenIssuer _tokenIssuer;
        private readonly IUserService _userService;


        public AuthController(IUserService userService,
            ITokenIssuer tokenIssuer)
        {
            _userService = userService;
            _tokenIssuer = tokenIssuer;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthDto userDto)
        {
            var user = _userService.Authenticate(userDto.EmailAddress, userDto.Password);
            if (user == null)
                return BadRequest(new {message = "E-mail address or password is incorrect"});
            var token = _tokenIssuer.Issue(user);

            return Ok(new
            {
                user.Id,
                token
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto registerDto)
        {
            var user = Mapper.Map<User>(registerDto);
            try
            {
                _userService.Create(user, registerDto.Password);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }
    }
}