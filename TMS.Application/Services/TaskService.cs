using Microsoft.EntityFrameworkCore;
using TMS.Domain.Entities;
using TMS.Infrastructure.Database;

namespace TMS.Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly SqlContext _sqlContext;

        public TaskService(SqlContext sqlContext) 
        {
            _sqlContext = sqlContext;
        }

        public Task<string> CreateTask()
        {
            throw new NotImplementedException();
        }

        public Task<string> DeleteTask()
        {
            throw new NotImplementedException();
        }

        public Task<string> GetTask()
        {
            throw new NotImplementedException();
        }

        public Task<TaskItem[]> RetrieveAllTasks() => _sqlContext.TaskItems.ToArrayAsync();

        public Task<string> UpdateTask()
        {
            throw new NotImplementedException();
        }
    }
}
