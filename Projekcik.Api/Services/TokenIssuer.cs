using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Projekcik.Api.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Projekcik.Api.Services
{
    public class TokenIssuer : ITokenIssuer
    {

        private readonly JwtSecurityTokenHandler _tokenHandler;
        public Func<DateTime?, DateTime?> ExpireDate { get; set; } = issuedAt => issuedAt?.AddDays(1);
        protected SecurityKey SigningKey => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecurityKey));

        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string SecurityKey { get; set; }

        private readonly IConfiguration _configuration;

        public TokenIssuer()
        {
            IdentityModelEventSource.ShowPII = true;
            _tokenHandler = new JwtSecurityTokenHandler();
            _tokenHandler.OutboundClaimTypeMap.Clear();
            _tokenHandler.InboundClaimTypeMap.Clear();
        }

        public JwtSecurityToken Issue(IEnumerable<Claim> claims)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecurityKey)),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = _tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            return token;
        }

        public string Issue(User user)
        {
            var claims = new[]
                     {
                new Claim(ClaimTypes.Sid, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.EmailAddress),
                new Claim(ClaimTypes.Name, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim(ClaimTypes.GivenName, user.UserName)
            };
            var securityToken = Issue(claims);
            return _tokenHandler.WriteToken(securityToken);
        }

        public bool Validate(string token, bool ignoreLifetimeValidation = false)
        {
            var validationParameters = new TokenValidationParameters
            {
                ValidAudience = Audience,
                ValidIssuer = Issuer,
                IssuerSigningKey = SigningKey,
                ClockSkew = TimeSpan.Zero,
                ValidateLifetime = !ignoreLifetimeValidation
            };

            try
            {
                _tokenHandler.ValidateToken(token ?? string.Empty, validationParameters, out var validatedToken);
                return true;
            }
            catch (Exception)
            {
                // when token is null
                return false;
            }

        }

        public string SerializeToken(JwtSecurityToken token)
        {
            return _tokenHandler.WriteToken(token);
        }

        public JwtSecurityToken DeserializeToken(string token)
        {
            return _tokenHandler.ReadJwtToken(token);
        }
    }
}
