using TaskTracker.API.Abstractions;
using TaskTracker.API.Enums;

namespace TaskTracker.API.Models.Entities
{
    public class Project : BaseEntity
    {
        public DateTime StartDate { get; set; }
        public DateTime CompletionDate { get; set; }
        public ProjectStatus Status { get; set; }
        public Guid TaskId { get; set; }
        public Task Task { get; set; }
    }
}
