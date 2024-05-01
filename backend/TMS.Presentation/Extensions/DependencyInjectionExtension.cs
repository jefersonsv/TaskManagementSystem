using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using TMS.Presentation.Filters;

namespace TMS.Presentation.Extensions
{
    public static class DependencyInjectionExtension
    {
        public static void ConfigurePresentationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers(opt => opt.Filters.Add<UnexpectedErrorFilter>());

            var corsSettings = configuration.GetSection(nameof(CorsSettings)).Get<CorsSettings>();
            if (corsSettings != null)
            {
                services.AddCors(options =>
                {
                    options.AddDefaultPolicy(
                        builder =>
                        {
                            builder.WithOrigins(corsSettings.AllowedOrigins.ToArray())
                                   .WithHeaders(corsSettings.AllowedHeaders.ToArray())
                                   .WithMethods(corsSettings.AllowedMethods.ToArray());
                        });
                });
            }

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    var securitySettings = configuration.GetSection(nameof(SecuritySettings)).Get<SecuritySettings>();
                    if (securitySettings == null)
                        throw new Exception(Constants.Messages.NoSecuritySettingsFound);

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = securitySettings.Issuer,
                        ValidAudience = securitySettings.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(securitySettings.SecretKey))
                    };
                });


            services.AddAuthorization(options =>
            {
                options.AddPolicy(nameof(DenyAnonymousAuthorizationRequirement), policy =>
                {
                    policy.Requirements.Add(new DenyAnonymousAuthorizationRequirement());
                });


                options.FallbackPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
            });
        }
    }
}
