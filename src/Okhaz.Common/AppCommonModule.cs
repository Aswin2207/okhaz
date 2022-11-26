using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Okhaz.AppInterfaces;
using Okhaz.AppInterfaces.Common;
using Okhaz.AppInterfaces.IoOperation;
using Okhaz.Common.Global;
using Okhaz.Common.Log;
using Okhaz.Common.TokenManager;
using Okhaz.Models.AuthFilter;
using Okhaz.Models.Common;
using Serilog;

namespace Okhaz.Common
{
    public class AppCommonModule : IModule
    {
        private readonly IConfiguration config;

        public AppCommonModule(IConfiguration config)
        {
            this.config = config;
        }

        public void Load(IServiceCollection services)
        {
            services.Configure<JwtConfiguration>(config.GetSection("Api:Jwt:JwtConfiguration"));
            services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<JwtConfiguration>>().Value);
            services.Configure<AuthorizationFilterConfiguration>(config.GetSection("Api:Filters:AuthorizationFilterConfiguration"));
            services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<AuthorizationFilterConfiguration>>().Value);
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<ITokenValidator, TokenValidator>();
            services.AddScoped<IFTPUtility, FTPUtility>();
            LoadLoggerServices(services);
        }

        private void LoadLoggerServices(IServiceCollection services)
        {
            Serilog.Log.Logger = new LoggerConfiguration()
                             .ReadFrom
                             .Configuration(config.GetSection("Common"))
                             .CreateLogger();

            services.AddSingleton(Serilog.Log.Logger);
            services.AddSingleton<IAppLogger, AppLogger>();
        }
    }
}
