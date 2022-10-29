using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TaskTracker.Core.Entities
{
    public class Security : BaseEntity
    {
        public string Name { get; set; }
        public string Username { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
        public string Code { get; set; }
        public string Email { get; set; }

        [NotMapped]
        public string Token { get; set; }
    }
}
