using System.ComponentModel.DataAnnotations;
using TaskTracker.Core.Enums;

namespace TaskTracker.Core.Entities
{
    public class BaseEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }

        [Required(ErrorMessage = "The field can't be empty")]
        public string Name { get; set; }
        public Priority Priority { get; set; }
    }
}
