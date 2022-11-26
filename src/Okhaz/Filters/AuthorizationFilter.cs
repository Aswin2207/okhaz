using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Okhaz.AppInterfaces.Common;
using Okhaz.Models.AuthFilter;
using Okhaz.Models.Common;
using Okhaz.Models.Constants;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Okhaz.Filters
{
    public class AuthorizationFilter : IAsyncAuthorizationFilter
    {
        private readonly AuthorizationFilterConfiguration authorizationFilterMessages;
        private readonly ITokenValidator tokenValidator;
        private readonly UserIdentity userIdentity;

        public AuthorizationFilter(UserIdentity userIdentity, ITokenValidator tokenValidator, AuthorizationFilterConfiguration authorizationFilterMessages)
        {
            this.userIdentity = userIdentity;
            this.tokenValidator = tokenValidator;
            this.authorizationFilterMessages = authorizationFilterMessages;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            if (IsAnonymousMethod(context))
                return;

            if (!userIdentity.IsBearerToken)
            {
                context.Result = GetUnauthorizedObjectResult("Invalid Bearer Token");
                return;
            }

            bool isValidToken = tokenValidator.ValidateToken(userIdentity.AccessToken, context.HttpContext.Request.Host.ToString(), out ClaimsPrincipal claimsPrincipal);
            if (!isValidToken)
            {
                context.Result = GetUnauthorizedObjectResult("Invalid Access Token");
                return;
            }

            MapClaimsPrincipalToUserIdentity(claimsPrincipal, userIdentity);
        }

        private IActionResult GetUnauthorizedObjectResult(string message)
        {
            var errorDetails = new ErrorDetails() { Code = StatusCodes.Status200OK, Message = message };

            return new UnauthorizedObjectResult(errorDetails);
        }

        private bool IsAnonymousMethod(AuthorizationFilterContext context)
        {
            const string ACTION_NAME = "action";
            var incomingActionName = context.ActionDescriptor.RouteValues[ACTION_NAME];
            return authorizationFilterMessages.AnonymousMethods.Contains(incomingActionName);
        }

        private void MapClaimsPrincipalToUserIdentity(ClaimsPrincipal claimsPrincipal, UserIdentity userIdentity)
        {
            userIdentity.IsAuthenticated = true;
            userIdentity.Username = claimsPrincipal.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
            userIdentity.BranchId = claimsPrincipal.Claims.First(claim => claim.Type == GlobalConstant.BranchId).Value;
            userIdentity.UserId = claimsPrincipal.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
        }
    }
}
