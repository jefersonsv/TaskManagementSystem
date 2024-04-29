namespace TMS.Domain.Entities
{
    public class TaskItem
    {
        public int? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? Date { get; set; }
        public Priority? Priority { get; set; }
        public Status? Status { get; set; }
    }
}