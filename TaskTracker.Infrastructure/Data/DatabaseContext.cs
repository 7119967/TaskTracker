using Microsoft.EntityFrameworkCore;
using TaskTracker.Core.Entities;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using Task = TaskTracker.Core.Entities.Task;

namespace TaskTracker.Infrastructure.Data
{
    public partial class DatabaseContext : DbContext
    { 
        public DbSet<Security> Securities { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(b => b.MigrationsAssembly("TaskTracker.API"));

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
