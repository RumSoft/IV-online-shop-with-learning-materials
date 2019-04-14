using Microsoft.EntityFrameworkCore;

namespace Projekcik.Api.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Voivodeship> Voivodeships { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            User.OnModelCreating(modelBuilder.Entity<User>());
            Note.OnModelCreating(modelBuilder.Entity<Note>());
            UserNote.OnModelCreating(modelBuilder.Entity<UserNote>());

            Voivodeship.OnModelCreating(modelBuilder.Entity<Voivodeship>());
            University.OnModelCreating(modelBuilder.Entity<University>());
            Course.OnModelCreating(modelBuilder.Entity<Course>());

        }
    }
}