using System.Linq;
using Projekcik.Api.Models;

namespace Projekcik.Api.DB
{
    public static class DbInitializer
    {
        public static void Initialize(ShopContext context)
        {
            context.Database.EnsureCreated();
            if (context.Users.Any())
                return;

            context.Users.Add(new User
            {
                DisplayName = "user_a",
                EmailAddress = "a@a.com",
                FirstName = "AA",
                LastName = "AAA",
                Password = "aaaaaa"
            });

            context.Users.Add(new User
            {
                DisplayName = "user_b",
                EmailAddress = "b@b.com",
                FirstName = "BB",
                LastName = "BBB",
                Password = "bbbbbb"
            });

            context.SaveChanges();
        }
    }
}