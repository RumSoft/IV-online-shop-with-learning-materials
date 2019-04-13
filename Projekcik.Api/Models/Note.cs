using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Projekcik.Api.Models
{
    public class Note : Entity<Guid>, ITimeStampedEntity
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        public Subject Subject { get; set; }
        public Guid SubjectId { get; set; }
        public User Author { get; set; }
        public Guid AuthorId { get; set; }
        public IList<UserNote> Buyers { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<Note> entity)
        {
            entity.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasOne(x => x.Author)
                .WithMany(x => x.CreatedNotes)
                .HasForeignKey(x => x.AuthorId)
                .IsRequired();

            entity.HasOne(x => x.Subject)
                .WithMany(x => x.Notes)
                .HasForeignKey(x => x.SubjectId)
                .IsRequired();

            entity.Property(x => x.Price)
                .HasColumnType("decimal(5,2)")
                .IsRequired();

            entity.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(1000);

            entity.Property(x => x.CreatedAt)
                .HasDefaultValueSql("getdate()")
                .ValueGeneratedOnAdd();

            entity.Property(x => x.ModifiedAt)
                .HasDefaultValueSql("getdate()")
                .ValueGeneratedOnAddOrUpdate();
        }
    }
}