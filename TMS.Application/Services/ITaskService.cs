using ErrorOr;
using TMS.Domain.Entities;
using TMS.Domain.Models;

namespace TMS.Application.Services
{
    public interface ITaskService
    {
        Task<TaskItem[]> RetrieveAllTasks();
        Task<ErrorOr<int>> CreateTask(Domain.Models.TaskItemCreateRequest taskItemCreateRequest);
        Task<ErrorOr<bool>> UpdateTask(TaskItemUpdateRequest taskItemUpdateRequest, int id);
        Task<string> DeleteTask();
        Task<ErrorOr<TaskItem>> GetTask(int id);
    }
}