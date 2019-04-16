using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Projekcik.Api.Models
{
    public class Voivodeship
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }

        public IEnumerable<University> Universities { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<Voivodeship> entity)
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(x => x.ImageUrl)
                .HasMaxLength(256);

            entity.HasMany(x => x.Universities)
                .WithOne(x => x.Voivodeship)
                .HasForeignKey(x => x.VoivodeshipId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }

    }
    public class University
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }


        public int VoivodeshipId { get; set; }
        public Voivodeship Voivodeship { get; set; }
        public IEnumerable<Course> Courses { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<University> entity)
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(250)
                .IsRequired();

            entity.Property(x => x.ImageUrl)
                .HasMaxLength(256);

            entity.HasMany(x => x.Courses)
                .WithOne(x => x.University)
                .HasForeignKey(x => x.UniversityId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }

    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public int UniversityId { get; set; }
        public University University { get; set; }
        public IEnumerable<Note> Notes { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<Course> entity)
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(250)
                .IsRequired();

            entity.HasMany(x => x.Notes)
                .WithOne(x => x.Course)
                .HasForeignKey(x => x.CourseId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
