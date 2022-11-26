using Microsoft.Extensions.Configuration;
using System.Linq;

namespace Okhaz.Extensions
{
    public static class CorsExtension
    {
        public static string[] GetAllowedOrigins(this IConfiguration configuration)
        {
            string allowedOrigins = configuration["AllowedOrigins"];
            return allowedOrigins?.Split(',')
                                 .Select(result => result.Trim())
                                 .Where(result => !string.IsNullOrEmpty(result))
                                 .ToArray();
        }
    }
}
