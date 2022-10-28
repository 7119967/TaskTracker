using TaskTracker.API.Enums;

namespace TaskTracker.Core.QueryFilters
{
    internal class ProjectQueryFilter
    {
        public string Name { get; set; }
        public Priority Priority { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime CompletionDate { get; set; }
        public ProjectStatus Status { get; set; }
    }
}
