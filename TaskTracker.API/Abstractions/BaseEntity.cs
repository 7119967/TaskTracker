using System.ComponentModel.DataAnnotations;
using TaskTracker.API.Enums;

namespace TaskTracker.API.Abstractions
{
    public class BaseEntity
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "The field can't be empty")]
        public string Name { get; set; }
        public Priority Priority { get; set; }
    }
}
