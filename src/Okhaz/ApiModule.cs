using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Okhaz.AppInterfaces;
using Okhaz.Helpers;
using Okhaz.Models.Common;

namespace Okhaz
{
    public class ApiModule : IModule
    {
        private readonly IConfiguration config;

        public ApiModule(IConfiguration config)
        {
            this.config = config;
        }

        public void Load(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddScoped<HttpContextHelper>(); services.Configure<Smtp>(config.GetSection("Smtp"));
            services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<Smtp>>().Value);
            services.AddScoped(sp =>
            {
                return ((HttpContextHelper)sp.GetService(typeof(HttpContextHelper)))
                     .GetUserIdentity();
            });
        }
    }
}
