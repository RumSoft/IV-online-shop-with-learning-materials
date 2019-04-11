using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Projekcik.Api.Models
{
    public class Note : Entity<Guid>, ITimeStampedEntity
    {
        public string Name { get; set; }
        public string Author { get; set; }
        public Subject SubjectName { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }


        public static void OnModelCreating(EntityTypeBuilder<Note> entity)
        {
            entity.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(x => x.Author)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(x => x.SubjectName)
                .IsRequired();

            entity.Property(x => x.Price)
                .IsRequired();

            entity.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(x => x.CreatedAt)
                .HasDefaultValueSql("getdate()")
                .ValueGeneratedOnAdd();

            entity.Property(x => x.ModifiedAt)
                .HasDefaultValueSql("getdate()")
                .ValueGeneratedOnAddOrUpdate();
        }
    }
}
