using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Okhaz.AppInterfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace Okhaz.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static void AddModule(this IServiceCollection services, IModule module)
        {
            module.Load(services);
        }

        public static void AddSwagger(this IServiceCollection services, IConfiguration config)
        {
            string securityType = config["Api:Swagger:Security:Type"];
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = config["Api:Swagger:Version"],
                    Title = config["Api:Swagger:Title"],
                    Description = config["Api:Swagger:Description"]
                });

                options.AddSecurityDefinition(config["Api:Swagger:Security:Type"], new OpenApiSecurityScheme
                {
                    Scheme = securityType,
                    In = ParameterLocation.Header,
                    Description = config["Api:Swagger:Security:Description"],
                    Name = config["Api:Swagger:Security:Name"],
                    Type = SecuritySchemeType.ApiKey
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement()
                    {
                    {
                        new OpenApiSecurityScheme
                        {
                                    Reference = new OpenApiReference
                                    {
                                        Type = ReferenceType.SecurityScheme,
                                        Id =  securityType,
                                    },
                                    Scheme = "oauth2",
                                    Name =  securityType,
                                    In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                    });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(System.AppContext.BaseDirectory, xmlFile);
                Console.Write(xmlPath);
                options.IncludeXmlComments(xmlPath);
                options.CustomSchemaIds(x => x.FullName);
            });
        }
    }
}
