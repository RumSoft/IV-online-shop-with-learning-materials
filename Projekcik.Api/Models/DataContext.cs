using Microsoft.EntityFrameworkCore;

namespace Projekcik.Api.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            User.OnModelCreating(modelBuilder.Entity<User>());
            Subject.OnModelCreating(modelBuilder.Entity<Subject>());
            Note.OnModelCreating(modelBuilder.Entity<Note>());
        }
    }
}