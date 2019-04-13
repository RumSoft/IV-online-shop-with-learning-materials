using Microsoft.EntityFrameworkCore;

namespace Projekcik.Api.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            User.OnModelCreating(modelBuilder.Entity<User>());
            Note.OnModelCreating(modelBuilder.Entity<Note>());
            UserNote.OnModelCreating(modelBuilder.Entity<UserNote>());

            University.OnModelCreating(modelBuilder.Entity<University>());
            Faculty.OnModelCreating(modelBuilder.Entity<Faculty>());
            Course.OnModelCreating(modelBuilder.Entity<Course>());
            Subject.OnModelCreating(modelBuilder.Entity<Subject>());

        }
    }
}