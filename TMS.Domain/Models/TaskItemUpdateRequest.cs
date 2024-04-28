using TMS.Domain.Entities;

namespace TMS.Domain.Models
{
    public class TaskItemUpdateRequest : TaskItemCreateRequest
    {
        public Status? Status { get; set; }
    }
}
