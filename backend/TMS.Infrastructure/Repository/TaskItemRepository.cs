using Microsoft.EntityFrameworkCore;
using TMS.Domain.Entities;
using TMS.Domain.Models;
using TMS.Infrastructure.Database;

namespace TMS.Infrastructure.Repository
{
    public class TaskItemRepository : ITaskItemRepository
    {
        private readonly SqlContext _sqlContext;

        public TaskItemRepository(SqlContext sqlContext)
        {
            _sqlContext = sqlContext;
        }

        public async Task<TaskProgress[]> GetProgress()
        {
            int total = await _sqlContext.TaskItems.CountAsync();

            var grouped = _sqlContext.TaskItems.GroupBy(item => item.Status)
                        .Select(group => new
                        {
                            Status = group.Key,
                            Count = group.Count()
                        })
                        .ToArray();

            var res = grouped.Select(g => new TaskProgress()
            {
                Status = g.Status,
                Percentage = (double)g.Count / total * 100
            });


            return res.ToArray();
        }

        public async Task<int> CountTasks(TaskItemListRequest taskItemListRequest)
        {
            var query = _sqlContext.TaskItems.AsQueryable();

            if (taskItemListRequest.Status.HasValue)
                query = query.Where(w => w.Status == taskItemListRequest.Status.Value);

            if (taskItemListRequest.Priority.HasValue)
                query = query.Where(w => w.Priority == taskItemListRequest.Priority.Value);

            return await query.CountAsync();
        }

        public async Task<TaskItem[]> RetrieveAllTasks(TaskItemListRequest taskItemListRequest, int skip)
        {
            var query = _sqlContext.TaskItems.AsQueryable();

            if (taskItemListRequest.Status.HasValue)
                query = query.Where(w => w.Status == taskItemListRequest.Status.Value);

            if (taskItemListRequest.Priority.HasValue)
                query = query.Where(w => w.Priority == taskItemListRequest.Priority.Value);

            return await query.Skip(skip).Take(taskItemListRequest.PageSize).ToArrayAsync();
        }

        public async Task<TaskItem?> GetById(int id)
        {
            return await _sqlContext.TaskItems.FindAsync(id);
        }

        public async Task Insert(TaskItem taskItem)
        {
            await _sqlContext.AddAsync(taskItem);
            await _sqlContext.SaveChangesAsync();
        }

        public async Task Delete(TaskItem taskItem)
        {
            _sqlContext.Remove(taskItem);
            await _sqlContext.SaveChangesAsync();
        }

        public async Task SaveChanges()
        {
            await _sqlContext.SaveChangesAsync();
        }
    }
}
