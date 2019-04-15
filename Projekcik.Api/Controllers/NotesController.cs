using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projekcik.Api.Helpers;
using Projekcik.Api.Models;
using Projekcik.Api.Models.DTO;
using Projekcik.Api.Services;

namespace Projekcik.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _noteService;
        private readonly IHttpContextAccessor _user;
        private readonly IUserService _userService;

        public NotesController(INoteService noteService,
            IHttpContextAccessor user,
            IUserService userService)
        {
            _noteService = noteService;
            _user = user;
            _userService = userService;
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

        /// <summary>
        /// Send file to server, currently only pdf supported.
        /// Please send this as form-data
        /// </summary>
        /// <param name="file">The note</param>
        /// <param name="name">Name of note</param>
        /// <param name="description">Description of note</param>
        /// <param name="price">Price of note</param>
        /// <param name="course">Course Id - please </param>
        /// <returns></returns>
        [HttpPost("create")]
        public IActionResult CreateNote(
            [FromForm] IFormFile file,
            [FromForm] string name,
            [FromForm] string description,
            [FromForm] decimal price,
            [FromForm] int course
        )
        {
            if (string.IsNullOrWhiteSpace(name)
                || string.IsNullOrWhiteSpace(description)
                || price <= 0.0m)
                return BadRequest("Input form data error");

            if (file.Length <= 0)
                return BadRequest("File error");

            var allowedExtensions = new[] {"pdf"};
            var extension = file.FileName.Split('.', StringSplitOptions.RemoveEmptyEntries).Last();
            if (!allowedExtensions.Contains(extension.ToLower()))
                return BadRequest("Unsupported file type");

            var userId = _user.GetCurrentUserId();
            var user = _userService.GetById(userId);
            if (user == null)
                return BadRequest("Invalid user");

            var path = Path.Combine(
                Directory.GetParent(Directory.GetCurrentDirectory()).FullName,
                "uploads",
                userId.ToString());
            Directory.CreateDirectory(path);

            var noteId = Guid.NewGuid();
            using (var fileStream = new FileStream(Path.Combine(path, noteId.ToString()), FileMode.Create))
            {
                file.CopyTo(fileStream);
            }

            var note = new Note
            {
                Id = noteId,
                Author = user,
                AuthorId = user.Id,
                Name = name,
                Price = price,
                Description = description,
                SubjectId = subject
            };
            _noteService.Create(note);

            return Ok(new
            {
                note.Id,
                path
            });
        }

        /// <summary>
        /// Try to download the file, if user has bought note then the response is file itself (blob file result).
        /// Every browser should be able to open this blob file and it stays in memory while user session is on.
        /// If user hasn't bought the file, then the response is bad request OR (in future) auto-redirect to homepage.
        /// </summary>
        /// <param name="noteId"></param>
        /// <returns></returns>
        [HttpGet("download-request/{noteId}")]
        public IActionResult DownloadRequest(Guid noteId)
        {
            var userId = _user.GetCurrentUserId();
            var user = _userService.GetById(userId);
            if (user == null)
                return BadRequest();

            //if(!user has bought note)
            //  return 400

            var note = _noteService.GetNoteById(noteId);
            if (note == null)
                return NotFound();

            var filepath = Path.Combine(
                Directory.GetParent(Directory.GetCurrentDirectory()).FullName,
                "uploads",
                note.Author.Id.ToString(),
                note.Id.ToString());

            var result =
                new FileContentResult(System.IO.File.ReadAllBytes(filepath), "application/pdf")
                {
                    FileDownloadName = $"{note.Name}.pdf"
                };

            return result;
        }
    }
}