using TaskStatus = TaskTracker.Core.Enums.TaskStatus;

namespace TaskTracker.Core.Entities
{
    public class Task : BaseEntity
    {
        public TaskStatus Status { get; set; }
        public string Description { get; set; }
        public Guid ProjectId { get; set; }
        public virtual Project Project { get; set; }
    }
}
