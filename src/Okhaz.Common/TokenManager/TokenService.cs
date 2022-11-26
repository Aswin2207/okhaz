using Microsoft.IdentityModel.Tokens;
using Okhaz.AppInterfaces.Common;
using Okhaz.Models.Common;
using Okhaz.Models.Constants;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Okhaz.Common.TokenManager
{
    public class TokenService : ITokenService
    {
        private readonly JwtConfiguration jwtConfiguration;
        private readonly UserIdentity userIdentity;

        public TokenService(
            UserIdentity userIdentity,
            JwtConfiguration jwtConfiguration)
        {
            this.userIdentity = userIdentity;
            this.jwtConfiguration = jwtConfiguration;
        }

        public string CreateToken(string username, string branchId)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfiguration.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(GlobalConstant.BranchId, branchId)
            });

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateJwtSecurityToken(
                         issuer: userIdentity.HostName,
                         audience: jwtConfiguration.Audience,
                         expires: DateTime.UtcNow.AddMinutes(jwtConfiguration.ExpirationTimeInMinutes),
                         signingCredentials: credentials,
                         subject: claimsIdentity);

            var accessToken = tokenHandler.WriteToken(token);
            return accessToken;
        }
    }
}
