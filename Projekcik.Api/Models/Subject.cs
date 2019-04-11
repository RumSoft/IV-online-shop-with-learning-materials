using System;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Projekcik.Api.Models
{
    public class Subject : Entity<Guid>
    {
        public string University { get; set; }
        public string Course { get; set; }
        public int Semester { get; set; }
        public string Name { get; set; }
        public string Lecturer { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<Subject> entity)
        {
            entity.Property(x => x.University)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(x => x.Course)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(x => x.Lecturer)
                .HasMaxLength(50);

            entity.Property(x => x.Semester)
                .IsRequired();
        }
    }
}
