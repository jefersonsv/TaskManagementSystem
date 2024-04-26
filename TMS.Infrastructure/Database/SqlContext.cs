using Microsoft.EntityFrameworkCore;
using TMS.Domain.Entities;

namespace TMS.Infrastructure.Database
{
    public class SqlContext : DbContext
    {
        public DbSet<TaskItem> TaskItems { get; set; }

        public SqlContext(DbContextOptions<SqlContext> options) : base(options)
        {
        }
    }
}