using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Projekcik.Api.Models
{
    public class User : Entity<Guid>, ITimeStampedEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string PictureUrl { get; set; }
        public long? FacebookId { get; set; }
        public decimal Balance { get; set; }

        public IList<Note> CreatedNotes { get; set; }
        public IList<UserNote> BoughtNotes { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<User> entity)
        {
            entity.Property(x => x.FirstName)
                .HasMaxLength(50);

            entity.Property(x => x.LastName)
                .HasMaxLength(50);

            entity.Property(x => x.UserName)
                .HasMaxLength(50);

            entity.Property(x => x.EmailAddress)
                .HasMaxLength(150);

            entity.Property(x => x.Password)
                .HasMaxLength(256);

            entity.Property(x => x.Balance)
                 .HasColumnType("decimal(5,2)")
                 .IsRequired();

            entity.Property(x => x.CreatedAt)
                .HasDefaultValueSql("getdate()")
                .ValueGeneratedOnAdd();

            entity.Property(x => x.ModifiedAt)
                .HasDefaultValueSql("getdate()")
                .ValueGeneratedOnAddOrUpdate();

            entity.HasIndex(x => x.EmailAddress)
                .IsUnique();
        }
    }
}