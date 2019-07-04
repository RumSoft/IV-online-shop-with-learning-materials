using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Projekcik.Api.Models
{
    public enum TransactionStatus
    {
        New,
        Pending,
        Rejected,
        Cancelled,
        Completed
    }

    public class Transaction : Entity<Guid>, ITimeStampedEntity
    {
        public Guid BuyerId { get; set; }
        public TransactionStatus Status { get; set; }
        public string Order { get; set; }

        [NotMapped]
        public IEnumerable<Guid> OrderedNotesIds
        {
            get => Order.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(Guid.Parse);
            set => Order = string.Join(',', value);
        }

        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }

        public static void OnModelCreating(EntityTypeBuilder<Transaction> entity)
        {
            entity.Property(x => x.BuyerId)
                .IsRequired();

            entity.Property(x => x.CreatedAt)
                .HasDefaultValueSql("getdate()")
                .ValueGeneratedOnAdd();

            entity.Property(x => x.ModifiedAt)
                .HasDefaultValueSql("getdate()")
                .ValueGeneratedOnAddOrUpdate();

            entity.Ignore(x => x.OrderedNotesIds);

            entity.Property(x => x.Order)
                .IsRequired();
        }
    }
}