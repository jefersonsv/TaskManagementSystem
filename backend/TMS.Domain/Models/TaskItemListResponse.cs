using TMS.Domain.Entities;

namespace TMS.Domain.Models
{
    public class TaskItemListResponse
    {
        public TaskItem[]? Items { get; set; }
        public int? Total { get; set; }
        public int? Page {  get; set; }
        public int? TotalPages {  get; set; }
    }
}
