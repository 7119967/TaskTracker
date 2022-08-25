namespace TaskTracker.API.Models.Entities
{
    public class Operation
    {
        public Guid Id { get; set; }
        public DateTime Operated { get; set; }
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }
        public Guid TaskId { get; set; }
        public Task Task { get; set; }
    }
}
