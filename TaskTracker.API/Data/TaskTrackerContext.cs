using Microsoft.EntityFrameworkCore;
using TaskTracker.API.Models.Entities;
using Task = TaskTracker.API.Models.Entities.Task;

namespace TaskTracker.API.Data
{
    public class TaskTrackerContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Operation> Operations { get; set; }
        public TaskTrackerContext(DbContextOptions<TaskTrackerContext> options) : base(options)
        {
        }
    }
}
