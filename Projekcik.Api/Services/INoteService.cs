using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projekcik.Api.Models;
using Microsoft.EntityFrameworkCore;


namespace Projekcik.Api.Services
{
    public class INoteService
    {
        private readonly DataContext _context;

        public INoteService(DataContext context)
        {
            _context = context;
        }

        public Note GetNoteById(Guid id)
        {
            return _context.Notes.Find(id);
        }

        public Note GetNotesByAuthorId(Guid authorId)
        {
            return _context.Notes
                .AsNoTracking()
                .FirstOrDefault(x =>
                    x.Author.Id == authorId);
        }

        public Note Create(Note note)
        {
            _context.Notes.Add(note);
            _context.SaveChanges();

            return note;
        }
    }
}
