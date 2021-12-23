using Microsoft.EntityFrameworkCore;

namespace TaskTracker.Models
{
    public class TaskTrackerContext : DbContext
    {
        public DbSet<Task> Tasks { get; set; }

        public TaskTrackerContext(DbContextOptions<TaskTrackerContext> options) : base(options)
        {
        }
    }
}
