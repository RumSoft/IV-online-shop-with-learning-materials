using System;
using System.Linq;
using Projekcik.Api.Models;

namespace Projekcik.Api.Services
{
    public interface INoteService
    {
        Note GetNoteById(Guid id);
        IQueryable<Note> GetNotesByAuthorId(Guid authorId);
        IQueryable<Note> GetQuery();
        IQueryable<Note> Search(ISearchParams searchParams, ISortParams sortParams);
        Note Create(Note note);
        void Buy(User user, Note note);
    }
}