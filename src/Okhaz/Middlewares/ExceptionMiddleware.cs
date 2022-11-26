using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Okhaz.AppInterfaces.Common;
using Okhaz.Models.Common;
using System;
using System.Threading.Tasks;

namespace Okhaz.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly IAppLogger appLogger;
        private readonly RequestDelegate next;

        public ExceptionMiddleware(RequestDelegate next, IAppLogger appLogger)
        {
            this.next = next;
            this.appLogger = appLogger;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                if (httpContext?.Response?.Headers != null)
                {
                    httpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    httpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                }

                await next(httpContext);
            }
            catch (OkhazException ex)
            {
                await HandleExceptionAsync(httpContext, ex, ex.ErrorDetails);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception, ErrorDetails errorDetails = null)
        {
            int statusCode = StatusCodes.Status500InternalServerError;
            if (errorDetails == null)
            {
                var fullMessage = exception.ToString();
                errorDetails = new ErrorDetails() { Code = statusCode, Message = fullMessage };
            }
            else
            {
                if (errorDetails.Message == null)
                {
                    errorDetails.Message = exception.ToString();
                }
            }
            var errorResponse = SerilizeError(errorDetails);
            appLogger.Error(errorDetails.ToString());
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;
            return context.Response.WriteAsync(errorResponse);
        }

        private Task HandleExceptionNotFoundAsync(HttpContext context)
        {
            int statusCode = StatusCodes.Status404NotFound;
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;
            var errorDetails = new ErrorDetails() { Code = statusCode, Message = "No Records Found" };
            var errorResponse = SerilizeError(errorDetails);
            return context.Response.WriteAsync(errorResponse);
        }

        private string SerilizeError(ErrorDetails errorDetails)
        {
            return JsonConvert.SerializeObject(errorDetails, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        }
    }
}
