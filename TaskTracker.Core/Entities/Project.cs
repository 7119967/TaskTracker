using TaskTracker.Core.Enums;

namespace TaskTracker.Core.Entities
{
    public class Project : BaseEntity
    {
        public Project()
        {
            Tasks = new HashSet<MyTask>();
        }
        public DateTime StartDate { get; set; }
        public DateTime CompletionDate { get; set; }
        public ProjectStatus Status { get; set; }
        public virtual ICollection<MyTask> Tasks { get; set; }
    }
}
