using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projekcik.Api.Helpers;
using Projekcik.Api.Models.DTO;
using Projekcik.Api.Services;

namespace Projekcik.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly NoteService _noteService;
        private readonly IHttpContextAccessor _user;
        public NotesController(NoteService noteService,
            IHttpContextAccessor user)
        {
            _noteService = noteService;
            _user = user;
        }

        [HttpGet("")]
        public IEnumerable<NoteDto> GetMyNotes()
        {
            var userId = _user.GetCurrentUserId();
            return GetUserNotes(userId);
        }

        [HttpGet("{userId}")]
        public IEnumerable<NoteDto> GetUserNotes(Guid userId)
        {
            var notes = _noteService.GetNotesByAuthorId(userId);
            return notes.Select(Mapper.Map<NoteDto>);
        }
    }
}
