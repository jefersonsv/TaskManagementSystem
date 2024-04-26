using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TMS.Infrastructure.Database;

namespace TMS.Infrastructure
{
    public static class DependencyInjections
    {
        public static void ConfigureInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SqlContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString(nameof(SqlContext))));

        }
    }
}
