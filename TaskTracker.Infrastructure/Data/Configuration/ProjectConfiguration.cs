using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskTracker.Core.Entities;

namespace TaskTracker.Infrastructure.Data.Configuration
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> entity)
        {
            entity.ToTable("projects");

            entity.Property(e => e.Name)
                .HasMaxLength(256)
                .IsUnicode(false);

            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.Property(e => e.Priority)
                .HasMaxLength(50)
                .IsUnicode(false);

            //entity.HasOne(d => d.Name)
            //    .WithMany(p => p.)
            //    .HasForeignKey(d => d.BuildId)
            //    .OnDelete(DeleteBehavior.ClientSetNull)
            //    .HasConstraintName("FK_Departament_BuildID");

            entity.Property(e => e.Created).HasColumnType("datetime");
            entity.Property(e => e.Modified).HasColumnType("datetime");
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.FinishDate).HasColumnType("datetime");
        }
    }
}
