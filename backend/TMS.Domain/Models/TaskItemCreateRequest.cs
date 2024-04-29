using System;
using TMS.Domain.Entities;

namespace TMS.Domain.Models
{
    public class TaskItemCreateRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? Date { get; set; }
        public Priority? Priority { get; set; }
    }
}
