using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TaskStatus = TaskTracker.Core.Enums.TaskStatus;

namespace TaskTracker.Core.Entities
{
    public class MyTask : BaseEntity
    {
        public TaskStatus Status { get; set; }
        public string Description { get; set; }
        public Guid ProjectId { get; set; }

        [JsonIgnore]
        [NotMapped]
        public virtual Project? Project { get; set; }
    }
}
