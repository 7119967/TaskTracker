using Microsoft.EntityFrameworkCore;
using TaskTracker.Core.Entities;
using MyTask = TaskTracker.Core.Entities.MyTask;

namespace TaskTracker.Infrastructure.Data
{
    public partial class DatabaseContext : DbContext
    {
        public DbSet<Security> Securities { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<MyTask> Tasks { get; set; }
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
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
