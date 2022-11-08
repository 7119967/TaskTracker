using TaskStatus = TaskTracker.Core.Enums.TaskStatus;

namespace TaskTracker.Core.Entities
{
    public class MyTask : BaseEntity
    {
        public TaskStatus Status { get; set; }
        public string Description { get; set; }
        public Guid ProjectId { get; set; }
        public virtual Project? Project { get; set; }
    }
}
