using TMS.Domain.Entities;

namespace TMS.Domain.Models
{
    public class TaskItemListRequest
    {
        public Priority? Priority { get; set; }
        public Status? Status { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
