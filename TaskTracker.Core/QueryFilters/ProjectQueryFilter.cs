using TaskTracker.Core.Enums;

namespace TaskTracker.Core.QueryFilters
{
    public class ProjectQueryFilter
    {
        public DateTime? Create { get; set; }
        public DateTime? Modify { get; set; }
        public Priority Priority { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime CompletionDate { get; set; }
        public ProjectStatus Status { get; set; }
    }
}
