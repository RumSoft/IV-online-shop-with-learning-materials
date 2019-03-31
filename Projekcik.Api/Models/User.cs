using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekcik.Api.Models
{
    public class User: Entity<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
