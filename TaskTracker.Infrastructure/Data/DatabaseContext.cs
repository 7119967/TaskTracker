using Microsoft.EntityFrameworkCore;
using System.Reflection;
using TaskTracker.Core.Entities;
using TaskTracker.Infrastructure.Data.Configuration;
using Task = TaskTracker.Core.Entities.Task;

namespace TaskTracker.Infrastructure.Data
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Security> Securities { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfiguration(new SecurityConfiguration());
            //modelBuilder.ApplyConfiguration(new ProjectConfiguration());
            //modelBuilder.ApplyConfiguration(new TaskConfiguration());

            //modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            //OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
