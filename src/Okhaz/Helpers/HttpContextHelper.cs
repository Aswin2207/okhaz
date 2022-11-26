using Microsoft.AspNetCore.Http;
using Okhaz.Models.Common;

namespace Okhaz.Helpers
{
    public class HttpContextHelper
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public HttpContextHelper(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public UserIdentity GetUserIdentity()
        {
            const string AUTHORIZATION_HEADER_NAME = "Authorization";
            var userIdentity = new UserIdentity();
            var httpHeaders = httpContextAccessor?.HttpContext?.Request.Headers;

            if (httpHeaders != null && httpHeaders.ContainsKey(AUTHORIZATION_HEADER_NAME))
            {
                userIdentity.AccessToken = httpHeaders[AUTHORIZATION_HEADER_NAME];
            }

            userIdentity.HostName = httpContextAccessor?.HttpContext?.Request.Host.ToString();

            return userIdentity;
        }
    }
}
