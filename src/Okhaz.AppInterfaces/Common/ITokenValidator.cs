using System.Security.Claims;

namespace Okhaz.AppInterfaces.Common
{
    public interface ITokenValidator
    {
        bool ValidateToken(string token, string hostName, out ClaimsPrincipal claimsPrincipal);
    }
}
