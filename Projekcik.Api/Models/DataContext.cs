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
        public DbSet<Transaction> Transactions { get; set; }

        public DbQuery<VoivodeshipNoteCount> VoivodeshipNoteCounts { get; set; }
        public DbQuery<UniversityNoteCount> UniversityNoteCounts { get; set; }
        public DbQuery<CourseNoteCount> CourseNoteCounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            User.OnModelCreating(modelBuilder.Entity<User>());
            Note.OnModelCreating(modelBuilder.Entity<Note>());
            UserNote.OnModelCreating(modelBuilder.Entity<UserNote>());
            Transaction.OnModelCreating(modelBuilder.Entity<Transaction>());

            Voivodeship.OnModelCreating(modelBuilder.Entity<Voivodeship>());
            University.OnModelCreating(modelBuilder.Entity<University>());
            Course.OnModelCreating(modelBuilder.Entity<Course>());

            modelBuilder.Query<VoivodeshipNoteCount>().ToView("Voivodeship_Note_Count");
            modelBuilder.Query<UniversityNoteCount>().ToView("University_Note_Count");
            modelBuilder.Query<CourseNoteCount>().ToView("Course_Note_Count");

        }
    }
}