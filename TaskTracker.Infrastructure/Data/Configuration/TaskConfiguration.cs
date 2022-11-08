using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskTracker.Core.Entities;
using MyTask = TaskTracker.Core.Entities.MyTask;

namespace TaskTracker.Infrastructure.Data.Configuration
{
    public class TaskConfiguration : IEntityTypeConfiguration<MyTask>
    {
        public void Configure(EntityTypeBuilder<MyTask> entity)
        {
            entity.ToTable("projects");

            entity.Property(e => e.Name)
                .HasMaxLength(256)
                .IsUnicode(false);            
            
            entity.Property(e => e.Description)
                .HasMaxLength(256)
                .IsUnicode(false);

            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.Property(e => e.Priority)
                .HasMaxLength(50)
                .IsUnicode(false);

            //entity.HasOne(d => d.Name)
            //    .WithMany(p => p.P)
            //    .HasForeignKey(d => d.BuildId)
            //    .OnDelete(DeleteBehavior.ClientSetNull)
            //    .HasConstraintName("FK_Departament_BuildID");

            //entity.HasOne(d => d.Ower)
            //    .WithMany(p => p.Departaments)
            //    .HasForeignKey(d => d.OwerId)
            //    .HasConstraintName("FK_Departament_Owner");

            entity.Property(e => e.Create).HasColumnType("datetime");
            entity.Property(e => e.Modify).HasColumnType("datetime");
        }
    }
}
