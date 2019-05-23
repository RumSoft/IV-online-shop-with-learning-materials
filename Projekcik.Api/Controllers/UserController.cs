using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projekcik.Api.Helpers;
using Projekcik.Api.Services;

namespace Projekcik.Api.Controllers
{
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IHttpContextAccessor _user;

        public UserController(IUserService userService, IHttpContextAccessor user)
        {
            _userService = userService;
            _user = user;
        }

        /// <summary>
        /// returns limited data (that should be visible for everyone)
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("{userId}")]    
        public IActionResult GetUserInfo(Guid userId)
        {
            var user = _userService.GetById(userId);
            return Ok(new
            {
                user.Id,
                user.UserName,
                user.PictureUrl
            });
        }

        /// <summary>
        /// returns full user data
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("me")]
        public IActionResult GetMyFullInfo()
        {
            var userId = _user.GetCurrentUserId();
            var user = _userService.GetById(userId);
            return Ok(new
            {
                user.Id,
                user.EmailAddress,
                user.FirstName,
                user.LastName,
                user.UserName,
                user.Balance,
                user.PictureUrl
            });
        }
    }
}
