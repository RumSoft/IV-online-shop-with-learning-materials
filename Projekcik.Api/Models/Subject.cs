using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Projekcik.Api.Models
{
    public class University
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public IEnumerable<Faculty> Faculties { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<University> entity)
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(250)
                .IsRequired();

            entity.HasMany(x => x.Faculties)
                .WithOne(x => x.University)
                .HasForeignKey(x => x.UniversityId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }

    public class Faculty
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int UniversityId { get; set; }
        public University University { get; set; }
        public IEnumerable<Course> Courses { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<Faculty> entity)
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(250)
                .IsRequired();

            entity.HasMany(x => x.Courses)
                .WithOne(x => x.Faculty)
                .HasForeignKey(x => x.FacultyId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }

    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }
        public IEnumerable<Subject> Subjects { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<Course> entity)
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(250)
                .IsRequired();

            entity.HasMany(x => x.Subjects)
                .WithOne(x => x.Course)
                .HasForeignKey(x => x.CourseId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }

    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Semester { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }
        public IEnumerable<Note> Notes { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<Subject> entity)
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .HasMaxLength(250)
                .IsRequired();

            entity.HasMany(x => x.Notes)
                .WithOne(x => x.Subject)
                .HasForeignKey(x => x.SubjectId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
