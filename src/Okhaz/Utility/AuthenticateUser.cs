using DataAccess.DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;

namespace Okhaz
{
    public class AuthenticateUser : ActionFilterAttribute
    {
        public static void SaveUserInSession(string name,string data)
        {
            var session = AppContext.Current.Session;
            session.SetString(name, data);
        }

        public static user_manager GetUserDetailsFromSession()
        {
            var session = AppContext.Current.Session;
            string userDetails = session.GetString("UserSessionDetails");
            if (!string.IsNullOrWhiteSpace(userDetails))
            {
                return JsonConvert.DeserializeObject<user_manager>(userDetails);
            }
            return null;
        }

        public static string GetDetailsFromSession(string name)
        {
            var session = AppContext.Current.Session;
            string data = session.GetString(name);
            return data;
        }     

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.HttpContext.Request.Method != "Options")
            {
                var session = AppContext.Current.Session;
                if (session == null || string.IsNullOrWhiteSpace(session.GetString("UserSessionDetails")))
                {
                    context.HttpContext.Response.StatusCode = 401;
                    return;
                }
                base.OnActionExecuting(context);
            }
        }

        internal static string DeleteSession()
        {
            AppContext.Current.Session.Clear();
            return "true";

        }
    }
}