using TMS.Domain.Entities;

namespace TMS.Application.Services
{
    public interface ITaskService
    {
        Task<TaskItem[]> RetrieveAllTasks();
        Task<string> CreateTask();
        Task<string> UpdateTask();
        Task<string> DeleteTask();
        Task<string> GetTask();
    }
}