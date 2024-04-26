using Microsoft.Extensions.DependencyInjection;
using TMS.Application.Services;

namespace TMS.Application
{
    public static class DependencyInjections
    {
        public static void ConfigureApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ITaskService, TaskService>();
        }
    }
}
