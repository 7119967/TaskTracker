using TaskTracker.API.Abstractions;
using TaskTracker.API.Enums;

namespace TaskTracker.Core.Entities
{
    public class Project : BaseEntity
    {
        public DateTime StartDate { get; set; }
        public DateTime CompletionDate { get; set; }
        public ProjectStatus Status { get; set; }
        public virtual List<Task> Tasks { get; set; }
    }
}
