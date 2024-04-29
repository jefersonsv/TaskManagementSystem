using TMS.Domain.Entities;

namespace TMS.Domain.Models
{
    public class TaskProgress
    {
        public Status? Status { get; set; }

        public double? Percentage { get; set; }
    }
}
