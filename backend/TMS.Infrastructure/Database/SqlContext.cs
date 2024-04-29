using Microsoft.EntityFrameworkCore;
using TMS.Domain.Entities;

namespace TMS.Infrastructure.Database
{
    public class SqlContext : DbContext
    {
        public DbSet<TaskItem> TaskItems { get; set; }

        public SqlContext(DbContextOptions<SqlContext> options) : base(options)
        {
            if (GetEnvironment.Guard.IsDevelopment())
            {
                base.Database.Migrate(); // Is is here only for challenge purpose. Run migrations is no recommended without supervision
            }
        }
    }
}