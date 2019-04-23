using System.Collections.Generic;
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
        ///     Returns all voivodeships
        /// </summary>
        [HttpGet("")]
        public IEnumerable<VoivodeshipNoteCount> GetAllVoivodeships()
        {
            return _context.VoivodeshipNoteCounts;
        }

        /// <summary>
        ///     Returns all universities for given voivodeship
        /// </summary>
        [HttpGet("{voivodeshipId}")]
        public IEnumerable<UniversityNoteCount> GetAllUniversities(int voivodeshipId)
        {
            return _context.UniversityNoteCounts
                .Where(x => x.VoivodeshipId == voivodeshipId);
        }

        /// <summary>
        ///     Returns all courses for given university
        /// </summary>
        [HttpGet("university/{universityId}")]
        public IEnumerable<CourseNoteCount> GetAllCourses(int universityId)
        {
            return _context.CourseNoteCounts
                .Where(x => x.UniversityId == universityId);
        }
    }
}