using TMS.Domain.Entities;

namespace TMS.Application.Services
{
    public interface ICriticalUpdateService
    {
        void Register(TaskItem taskItem);
    }
}