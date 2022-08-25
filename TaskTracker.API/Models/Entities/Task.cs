using TaskTracker.API.Abstractions;
using TaskTracker.API.Enums;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using TaskStatus = TaskTracker.API.Enums.TaskStatus;

namespace TaskTracker.API.Models.Entities
{
    public class Task : BaseEntity
    {
        public TaskStatus Status { get; set; }
        public string Description { get; set; }
        public Guid ProjectId { get; set; }
        public virtual Project Project { get; set; }
    }
}
