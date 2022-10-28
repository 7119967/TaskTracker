using System.ComponentModel.DataAnnotations;
using TaskTracker.API.Enums;

namespace TaskTracker.Core.Entities
{
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime? Create { get; set; }
        public DateTime? Modify { get; set; }

        [Required(ErrorMessage = "The field can't be empty")]
        public string Name { get; set; }
        public Priority Priority { get; set; }
    }
}
