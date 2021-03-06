﻿using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using ConvertApiDotNet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
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
        private const int maxFileSize = 10 * 1024 * 1024;
        private readonly IConfiguration _configuration;
        private readonly INoteService _noteService;
        private readonly IHttpContextAccessor _user;
        private readonly IUserService _userService;

        public NotesController(INoteService noteService,
            IHttpContextAccessor user,
            IUserService userService, IConfiguration configuration)
        {
            _noteService = noteService;
            _user = user;
            _userService = userService;
            _configuration = configuration;
        }


        [Authorize]
        [HttpGet("bought")]
        public IActionResult GetMyBoughtNotes()
        {
            var userId = _user.GetCurrentUserId();
            var user = _userService.GetById(userId);
            if (user == null)
                return Ok(new NoteDto[0]);

            var result = user.BoughtNotes
                .Select(x => x.Note)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.PreviewUrl,
                    x.PageCount,
                    x.Price,
                    x.Description,
                    x.Semester,
                    FileExtension = x.FileExtension.ToString().ToLower()
                });

            return Ok(result);
        }

        /// <summary>
        ///     Get my notes
        /// </summary>
        [Authorize]
        [HttpGet("me")]
        public IActionResult GetMyNotes()
        {
            var userId = _user.GetCurrentUserId();
            return GetUserNotes(userId);
        }

        /// <summary>
        ///     Get user's notes
        /// </summary>
        /// <param name="userId"></param>
        [HttpGet("user/{userId}")]
        public IActionResult GetUserNotes(Guid userId)
        {
            var currentUser = _user.GetCurrentUserId();

            var notes = _noteService.GetNotesByAuthorId(userId);
            var result = notes.Select(x => new
            {
                x.Id,
                x.Name,
                x.PreviewUrl,
                x.PageCount,
                x.Price,
                x.Description,
                x.Semester,
                owned = x.AuthorId == userId || x.Buyers.Any(xd => xd.UserId == currentUser),
                FileExtension = x.FileExtension.ToString().ToLower()
            });
            return Ok(result);
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

            var fileSize = file.Length;
            if (fileSize > maxFileSize) return BadRequest("Maximum file size (10Mb) exceeded");

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


            var notepath = Path.Combine(path, noteId.ToString());
            using (var fileStream = new FileStream(notepath, FileMode.Create))
            {
                file.CopyTo(fileStream);
                fileStream.Seek(0, SeekOrigin.Begin);


                if (!new[] {Extension.ZIP, Extension.RAR}.Contains(extension.Value))
                {
                    var convertApi = new ConvertApi(_configuration["ConvertApi:Secret"]);

                    var thumbnail = convertApi.ConvertAsync(extension.ToString(), "jpg",
                        new ConvertApiFileParam(fileStream, $"{noteId.ToString()}.{extension.ToString()}"),
                        new ConvertApiParam("ScaleImage", "true"),
                        new ConvertApiParam("ScaleProportions", "true"),
                        new ConvertApiParam("ImageHeight", "250"),
                        new ConvertApiParam("ImageWidth", "250"),
                        new ConvertApiParam("ScaleIfLarger", "true"),
                        new ConvertApiParam("JpgQuality", 10));

                    var previews = thumbnail.Result.FilesStream().ToList();
                    note.PageCount = previews.Count;

                    var container = GetCloudBlobContainer();
                    var blockBlob = container.GetBlockBlobReference($"previews/{noteId.ToString()}");
                    blockBlob.UploadFromStreamAsync(previews.First());
                    note.PreviewUrl = blockBlob.SnapshotQualifiedStorageUri.PrimaryUri.ToString();

                    var i = 1;
                    foreach (var preview in previews.Skip(1))
                    {
                        blockBlob = container.GetBlockBlobReference($"previews/{noteId.ToString()}-{i}");
                        blockBlob.UploadFromStreamAsync(preview);
                        i += 1;
                    }
                }
            }

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

            var note = _noteService.GetNoteById(noteId);
            if (note == null)
                return NotFound();

            if (note.AuthorId != user.Id || user.BoughtNotes.All(x => x.NoteId != noteId))
                Forbid();

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

        private CloudBlobContainer GetCloudBlobContainer()
        {
            var storageAccount = CloudStorageAccount.Parse(
                _configuration.GetConnectionString("AzureStorage"));
            var blobClient = storageAccount.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference("mag1");
            return container;
        }

        [HttpGet("search")]
        public IActionResult Search(
            [FromQuery] SearchParams searchParams,
            [FromQuery] PagerParams pagerParams,
            [FromQuery] SortParams sortParams
        )
        {
            var userId = _user.GetCurrentUserId();

            var result = _noteService.Search(searchParams, sortParams);
            var count = result.Count();
            var notes = result.Select(x => new
            {
                x.Id,
                x.Name,
                x.Description,
                x.Price,
                x.Semester,
                x.PageCount,
                x.PreviewUrl,
                owned = x.AuthorId == userId || x.Buyers.Any(xd => xd.UserId == userId),

                Author = new
                {
                    Id = x.AuthorId,
                    Name = x.Author.UserName
                },
                Course = new
                {
                    Id = x.CourseId, x.Course.Name
                },
                University = new
                {
                    Id = x.Course.UniversityId, x.Course.University.Name
                },
                Voivodeship = new
                {
                    Id = x.Course.University.VoivodeshipId, x.Course.University.Voivodeship.Name
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

            var userId = _user.GetCurrentUserId();

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
                result.PageCount,
                result.PreviewUrl,
                owned = result.AuthorId == userId || result.Buyers.Any(x => x.UserId == userId),
                Author = new
                {
                    Id = result.AuthorId,
                    Name = result.Author.UserName
                },
                Course = new
                {
                    Id = result.CourseId, result.Course.Name
                },
                University = new
                {
                    Id = result.Course.UniversityId, result.Course.University.Name
                },
                Voivodeship = new
                {
                    Id = result.Course.University.VoivodeshipId, result.Course.University.Voivodeship.Name
                }
            });
        }

        [AllowAnonymous]
        [HttpPost("")]
        public IActionResult ListNotesForCart([FromBody] string[] input)
        {
            var ids = input.Select(x =>
            {
                Guid.TryParse(x, out var guid);
                return guid;
            }).Where(x => x != Guid.Empty);

            var userId = _user.GetCurrentUserId();
            if (userId != Guid.Empty)
            {
                var user = _userService.GetById(userId);
                if (user != null)
                    ids = ids.Where(x => user.BoughtNotes.All(y => y.NoteId != x));
            }

            var notes = ids.Select(x => _noteService.GetNoteById(x))
                .Where(x => x != null)
                .Where(x => x.AuthorId != userId)
                .ToArray();
            var result = notes.Select(x => new
            {
                x.Id,
                x.Name,
                x.Price,
                x.Description,
                x.PageCount,
                x.PreviewUrl,
                Author = new
                {
                    Id = x.AuthorId,
                    Name = x.Author.UserName
                },
                Course = new
                {
                    Id = x.CourseId, x.Course.Name
                },
                University = new
                {
                    Id = x.Course.UniversityId, x.Course.University.Name
                },
                Voivodeship = new
                {
                    Id = x.Course.University.VoivodeshipId, x.Course.University.Voivodeship.Name
                }
            });

            return Ok(result);
        }

        [Authorize]
        [HttpGet("earnings")]
        public IActionResult GetEarnings()
        {
            var userId = _user.GetCurrentUserId();
            var user = _userService.GetById(userId);
            if (user == null)
                return BadRequest("Invalid user");

            var notes = _noteService.GetNotesByAuthorId(user.Id);
            var result = notes.Select(x => new
            {
                x.Id,
                x.Name,
                x.Price,
                Purchases = x.Buyers.Count,
                Profit = x.Price * x.Buyers.Count
            });
            result = result.Where(x => x.Purchases > 0);
            return Ok(result);
        }
    }
}