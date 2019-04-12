using System;
using System.Linq;
using Projekcik.Api.Models;


namespace Projekcik.Api.Services
{
    public class NoteService : INoteService
    {
        private readonly DataContext _context;

        public NoteService(DataContext context)
        {
            _context = context;
        }

        public Note GetNoteById(Guid id)
        {
            return _context.Notes.Find(id);
        }

        public IQueryable<Note> GetNotesByAuthorId(Guid authorId)
        {
            return _context.Notes.Where(x => x.Author.Id == authorId);
        }

        public Note Create(Note note)
        {
            _context.Notes.Add(note);
            _context.SaveChanges();

            return note;
        }
    }
}
