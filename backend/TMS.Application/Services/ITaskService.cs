using ErrorOr;
using TMS.Domain.Entities;
using TMS.Domain.Models;

namespace TMS.Application.Services
{
    public interface ITaskService
    {
        Task<TaskProgress[]> GetProgress();
        Task<ErrorOr<TaskItemListResponse>> RetrieveAllTasks(TaskItemListRequest taskItemListRequest);
        Task<ErrorOr<int>> CreateTask(TaskItemCreateUpdateRequest taskItemCreateUpdateRequest);
        Task<ErrorOr<bool>> UpdateTask(TaskItemCreateUpdateRequest taskItemCreateUpdateRequest, int id);
        Task<ErrorOr<bool>> DeleteTask(int id);
        Task<ErrorOr<TaskItem>> GetTask(int id);
    }
}