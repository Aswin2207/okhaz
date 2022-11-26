using Microsoft.IdentityModel.Tokens;
using Okhaz.AppInterfaces.Common;
using Okhaz.Models.Common;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Okhaz.Common.TokenManager
{
    public class TokenValidator : ITokenValidator
    {
        private readonly JwtConfiguration jwtConfiguration;

        public TokenValidator(
            JwtConfiguration jwtConfiguration)
        {
            this.jwtConfiguration = jwtConfiguration;
        }

        public bool ValidateToken(string token, string hostname, out ClaimsPrincipal claimsPrincipal)
        {
            claimsPrincipal = null;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfiguration.SecretKey));
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateLifetime = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = hostname,
                ValidAudience = jwtConfiguration.Audience,
                IssuerSigningKey = securityKey,
                ClockSkew = TimeSpan.FromMinutes(jwtConfiguration.ClockSkewInMinutes),
            };

            try
            {
                claimsPrincipal = new JwtSecurityTokenHandler()
                                      .ValidateToken(token, validationParameters, out var rawValidatedToken);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
