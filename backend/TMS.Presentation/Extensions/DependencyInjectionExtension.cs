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
                    options.AddPolicy(nameof(CorsSettings),
                        builder =>
                        {
                            builder.WithOrigins(corsSettings.AllowedOrigins.ToArray())
                                   .WithHeaders(corsSettings.AllowedHeaders.ToArray())
                                   .WithMethods(corsSettings.AllowedMethods.ToArray());
                        });
                });
            }
        }
    }
}
