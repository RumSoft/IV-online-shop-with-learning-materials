using Projekcik.Api.Models;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Projekcik.Api.Services
{
    public interface ITokenIssuer
    {
        string Audience { get; set; }
        string Issuer { get; set; }
        string SecurityKey { get; set; }

        JwtSecurityToken Issue(IEnumerable<Claim> claims);
        string Issue(User user);
        bool Validate(string token, bool ignoreLifetimeValidation = false);
        string SerializeToken(JwtSecurityToken token);
        JwtSecurityToken DeserializeToken(string token);
    }
}
