using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TMS.Infrastructure.Database;
using TMS.Infrastructure.Repository;

namespace TMS.Infrastructure
{
    public static class DependencyInjections
    {
        public static void ConfigureInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SqlContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString(nameof(SqlContext))));

            services.AddScoped<ITaskItemRepository, TaskItemRepository>();
        }
    }
}
