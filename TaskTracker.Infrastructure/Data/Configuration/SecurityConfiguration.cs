using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskTracker.Core.Entities;

namespace TaskTracker.Infrastructure.Data.Configuration
{
    public class SecurityConfiguration : IEntityTypeConfiguration<Security>
    {

        public void Configure(EntityTypeBuilder<Security> entity)
        {
            entity.ToTable("security");

            entity.Property(e => e.Code)
                .IsRequired()
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.Property(e => e.Created).HasColumnType("datetime");

            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.Property(e => e.Modified).HasColumnType("datetime");

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(200)
                .IsUnicode(false);

            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);
        }
    }
}
