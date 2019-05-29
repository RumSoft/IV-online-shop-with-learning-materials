using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projekcik.Api.Models
{
    public class Entity<T>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public T Id { get; set; }
    }

    public interface ITimeStampedEntity
    {
        DateTime CreatedAt { get; set; }
        DateTime ModifiedAt { get; set; }
    }
}