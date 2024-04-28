using TMS.Presentation.Filters;

namespace TMS.Presentation.Extensions
{
    public static class DependencyInjectionExtension
    {
        public static void ConfigurePresentationServices(this IServiceCollection services)
        {
            services.AddControllers(opt => opt.Filters.Add<UnexpectedErrorFilter>());
        }
    }
}
