using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
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
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _noteService;
        private readonly IHttpContextAccessor _user;
        private readonly IUserService _userService;

        private const  int maxFileSize = 10 * 1024 * 1024;
        public NotesController(INoteService noteService,
            IHttpContextAccessor user,
            IUserService userService)
        {
            _noteService = noteService;
            _user = user;
            _userService = userService;
        }


        /// <summary>
        ///     Get my notes
        /// </summary>
        [Authorize]
        [HttpGet("me")]
        public IEnumerable<NoteDto> GetMyNotes()
        {
            var userId = _user.GetCurrentUserId();
            return GetUserNotes(userId);
        }

        /// <summary>
        ///     Get user's notes
        /// </summary>
        /// <param name="userId"></param>
        [HttpGet("user/{userId}")]
        public IEnumerable<NoteDto> GetUserNotes(Guid userId)
        {
            var notes = _noteService.GetNotesByAuthorId(userId);
            return notes.Select(Mapper.Map<NoteDto>);
        }

        /// <summary>
        ///     Send file to server, currently only pdf supported.
        ///     Please send this as form-data.
        ///     Real parameters are: file, name, description, price, course.
        ///     Please do not get fooled by swagger that spreads file on more properties.
        /// </summary>
        [Authorize]
        [HttpPost("create")]
        public IActionResult CreateNote(
            [FromForm] IFormFile file,
            [FromForm] string name,
            [FromForm] string description,
            [FromForm] decimal price,
            [FromForm] int semester,
            [FromForm] int course
        )
        {
            if (string.IsNullOrWhiteSpace(name)
                || string.IsNullOrWhiteSpace(description)
                || price <= 0.0m)
                return BadRequest("Input form data error");

            if (file.Length <= 0)
                return BadRequest("File error");

            var ext = file.FileName.Split('.', StringSplitOptions.RemoveEmptyEntries).Last();
            var extension = Enum.Parse(typeof(Extension), ext, true) as Extension?;
            if (extension == null)
                throw new UnsupportedMediaTypeException("unsupported", null);

            long fileSize = file.Length;
            if(fileSize > maxFileSize)
            {
                return BadRequest("Maxiumum file size (10Mb) exceeded");
            }

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
                file.CopyTo(fileStream);

            var note = new Note
            {
                Id = noteId,
                Author = user,
                AuthorId = user.Id,
                Name = name,
                Price = price,
                Description = description,
                CourseId = course,
                FileExtension = extension.Value,
                Semester = semester
            };
            _noteService.Create(note);

            return Ok(new
            {
                note.Id
            });
        }

        /// <summary>
        ///     Try to download the file, if user has bought note then the response is file itself (blob file result).
        ///     Every browser should be able to open this blob file and it stays in memory while user session is on.
        ///     If user hasn't bought the file, then the response is bad request OR (in future) auto-redirect to homepage.
        /// </summary>
        [Authorize]
        [HttpGet("download-request/{noteId}")]
        public IActionResult DownloadRequest(Guid noteId)
        {
            var userId = _user.GetCurrentUserId();
            var user = _userService.GetById(userId);
            if (user == null)
                return BadRequest();

            //if(!user has bought note or is owner)
            //  return 400

            var note = _noteService.GetNoteById(noteId);
            if (note == null)
                return NotFound();

            var filepath = Path.Combine(
                Directory.GetParent(Directory.GetCurrentDirectory()).FullName,
                "uploads",
                note.AuthorId.ToString(),
                note.Id.ToString());

            var result =
                new FileContentResult(System.IO.File.ReadAllBytes(filepath), FileType.ToContentType(note.FileExtension))
                {
                    FileDownloadName = $"{note.Name}.{note.FileExtension.ToString()}"
                };

            return result;
        }

        [HttpGet("search")]
        public IActionResult Search(
            [FromQuery] SearchParams searchParams,
            [FromQuery] PagerParams pagerParams,
            [FromQuery] SortParams sortParams
        )
        {
            var result = _noteService.Search(searchParams, sortParams);
            var count = result.Count();
            var notes = result.Select(x => new
            {
                x.Id,
                x.Name,
                x.Description,
                x.Price,
                x.Semester,
                Author = new
                {
                    Id = x.AuthorId,
                    Name = x.Author.UserName,
                },
                Course = new
                {
                    Id = x.CourseId,
                    Name = x.Course.Name,
                },
                University = new
                {
                    Id = x.Course.UniversityId,
                    Name = x.Course.University.Name,
                },
                Voivodeship = new
                {
                    Id = x.Course.University.VoivodeshipId,
                    Name = x.Course.University.Voivodeship.Name,
                }
            });

            return Ok(new
            {
                Pager = new PagerResult
                {
                    Size = pagerParams.Size,
                    Page = pagerParams.Page,
                    Count = count,
                    Pages = (int) Math.Ceiling(count / (float) pagerParams.Size)
                },
                Notes = notes
                    .Skip((pagerParams.Page - 1) * pagerParams.Size)
                    .Take(pagerParams.Size)
            });
        }

        [AllowAnonymous]
        [HttpGet("{noteId}")]
        public IActionResult GetNotesDetails(Guid noteId)
        {
            var result = _noteService.GetNoteById(noteId);
            if (result == null)
                return BadRequest();

            return Ok(new
            {
                result.Id,
                result.Name,
                result.Price,
                result.Description,
                result.Semester,
                result.CreatedAt,
                OrderCount = result.Buyers.Count,
                Type = result.FileExtension.ToString().ToUpper(),
                Author = new
                {
                    Id = result.AuthorId,
                    Name = result.Author.UserName,
                },
                Course = new
                {
                    Id = result.CourseId,
                    Name = result.Course.Name,
                },
                University = new
                {
                    Id = result.Course.UniversityId,
                    Name = result.Course.University.Name,
                },
                Voivodeship = new
                {
                    Id = result.Course.University.VoivodeshipId,
                    Name = result.Course.University.Voivodeship.Name,
                }
            });
        }

        [Authorize]
        [HttpPost("")]
        public IActionResult ListNotes([FromBody] Guid[] input)
        {
            var notes = input?.Select(x => _noteService.GetNoteById(x)).Where(x => x != null).ToArray() ?? new Note[0];
            if (!notes.Any())
                return BadRequest();
        }
    }
}