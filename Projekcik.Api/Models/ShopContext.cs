using Microsoft.EntityFrameworkCore;

namespace Projekcik.Api.Models
{
    public class ShopContext : DbContext
    {
        public ShopContext(DbContextOptions<ShopContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            User.OnModelCreating(modelBuilder.Entity<User>());
        }
    }
}