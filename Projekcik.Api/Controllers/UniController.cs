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
        /// Returns all universities
        /// </summary>
        [HttpGet("")]
        public IActionResult GetAllUniversities()
        {
            var data = _context.Universities
                .Select(x => new
                {
                    x.Id,
                    x.Name
                });
            return Ok(data);
        }

        /// <summary>
        /// Returns all faculties for selected university
        /// </summary>
        [HttpGet("{universityId}")]
        public IActionResult GetAllFaculties(int universityId)
        {
            var data = _context.Faculties
                .Where(x => x.UniversityId == universityId)
                .Select(x => new
                {
                    x.Id,
                    x.Name
                });
            return Ok(data);
        }

        /// <summary>
        /// Returns all courses for selected faculty
        /// </summary>
        [HttpGet("faculty/{facultyId}")]
        public IActionResult GetAllCourses(int facultyId)
        {
            var data = _context.Courses
                .Where(x => x.FacultyId == facultyId)
                .Select(x => new
                {
                    x.Id,
                    x.Name
                });
            return Ok(data);
        }

        /// <summary>
        /// Returns all subjects for selected course
        /// </summary>
        [HttpGet("course/{courseId}")]
        public IActionResult GetAllSubjects(int courseId)
        {
            var data = _context.Subjects
                .Where(x => x.CourseId == courseId)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Semester
                });
            return Ok(data);
        }

        /// <summary>
        /// Returns whole tree of universities / faculties / courses / subjects
        /// </summary>
        /// <returns>IActionResult containing anonymous type</returns>
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var data = _context.Universities
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    //x.ImageUrl,
                    Faculties = x.Faculties.Select(y => new
                    {
                        y.Id,
                        y.Name,
                        //y.ImageUrl,
                        Courses = y.Courses.Select(z => new
                        {
                            z.Id,
                            z.Name,
                            //z.ImageUrl,
                            Subjects = z.Subjects.Select(w => new
                            {
                                w.Id,
                                w.Name,
                                w.Semester
                                //w.ImageUrl,
                            })
                        })
                    })
                });

            return Ok(data);
        }
    }
}