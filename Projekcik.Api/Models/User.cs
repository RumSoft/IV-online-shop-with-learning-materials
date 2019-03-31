using System;
namespace Projekcik.Api.Models
{
    public class User : Entity<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
