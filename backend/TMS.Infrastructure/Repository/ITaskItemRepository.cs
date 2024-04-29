using TMS.Domain.Entities;
using TMS.Domain.Models;

namespace TMS.Infrastructure.Repository
{
    public interface ITaskItemRepository
    {
        Task<TaskProgress[]> GetProgress();
        Task<TaskItem[]> RetrieveAllTasks(TaskItemListRequest taskItemListRequest, int skip);
        Task Delete(TaskItem taskItem);
        Task Insert(TaskItem taskItem);
        Task<TaskItem?> GetById(int id);
        Task SaveChanges();
        Task<int> CountTasks(TaskItemListRequest taskItemListRequest);
    }
}
