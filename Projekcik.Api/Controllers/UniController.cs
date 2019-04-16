using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Projekcik.Api.Models;

namespace Projekcik.Api.Controllers
{
    [Route("api/[controller]")]
    public class UniController : ControllerBase
    {
        public UniController(DataContext context)
        {
            _context = context;
        }

        private DataContext _context { get; }

        /// <summary>
        /// Returns all voivodeships
        /// </summary>
        [HttpGet("")]
        public IActionResult GetAllVoivodeships()
        {
            var data = _context.Voivodeships
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.ImageUrl
                });
            return Ok(data);
        }

        /// <summary>
        /// Returns all universities for given voivodeship
        /// </summary>
        [HttpGet("{voivodeshipId}")]
        public IActionResult GetAllUniversities(int voivodeshipId)
        {
            var data = _context.Universities
                .Where(x => x.VoivodeshipId == voivodeshipId)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.ImageUrl
                });
            return Ok(data);
        }

        /// <summary>
        /// Returns all courses for given university
        /// </summary>
        [HttpGet("university/{universityId}")]
        public IActionResult GetAllCourses(int universityId)
        {
            var data = _context.Courses
                .Where(x => x.UniversityId == universityId)
                .Select(x => new
                {
                    x.Id,
                    x.Name
                });
            return Ok(data);
        }
    }
}