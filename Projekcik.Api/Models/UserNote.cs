using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Projekcik.Api.Models
{
    public class UserNote
    {
        public virtual User User { get; set; }
        public Guid UserId { get; set; }

        public virtual Note Note { get; set; }
        public Guid NoteId { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<UserNote> entity)
        {
            entity
                .HasKey(x => new {x.UserId, x.NoteId});
            entity
                .HasOne(x => x.Note)
                .WithMany(x => x.Buyers)
                .HasForeignKey(x => x.NoteId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            entity
                .HasOne(x => x.User)
                .WithMany(x => x.BoughtNotes)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}