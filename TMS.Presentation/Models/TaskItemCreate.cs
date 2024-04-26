using TMS.Domain.Entities;

namespace TMS.Presentation.Models
{
    public class TaskItemCreate
    {
        public string? Description { get; set; }
        public DateTime? Date { get; set; }
        public Priority? Priority { get; set; }
        public Status? Status { get; set; }
    }
}
