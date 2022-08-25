using TaskTracker.API.Enums;
using TaskStatus = TaskTracker.API.Enums.TaskStatus;

namespace TaskTracker.API.Models.Entities
{
    public class Task
    {
        public TaskStatus Status { get; set; }
        public string Description { get; set; }
    }
}
