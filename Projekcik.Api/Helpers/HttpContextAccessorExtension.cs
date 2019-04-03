using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Projekcik.Api.Helpers
{
    public static class HttpContextAccessorExtension
    {
        public static Guid CurrentUser(this IHttpContextAccessor httpContextAccessor)
        {
            var stringId =
                httpContextAccessor?.HttpContext?.User?.Claims.FirstOrDefault(
                    x => x.Type == ClaimTypes.Sid)?.Value;
            Guid.TryParse(stringId, out var userId);
            return userId;
        }

    }
}
