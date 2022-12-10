using TaskTracker.Core.Enums;
using TaskStatus = TaskTracker.Core.Enums.TaskStatus;

namespace TaskTracker.Core.QueryFilters
{
    public class TaskQueryFilter
    {
        public TaskStatus Status { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Priority Priority { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
    }
}
