using TaskTracker.Core.Enums;

namespace TaskTracker.Core.QueryFilters
{
    public class ProjectQueryFilter
    {
        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
        public string Name { get; set; }
        public Priority Priority { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public ProjectStatus Status { get; set; }
    }
}
