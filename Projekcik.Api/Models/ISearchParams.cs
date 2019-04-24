namespace Projekcik.Api.Models
{
    public interface ISearchParams
    {
        int? VoivodeshipId { get; set; }
        int? UniversityId { get; set; }
        int? CourseId { get; set; }
        string NoteName { get; set; }
        int? Semester { get; set; }
    }

    public class SearchParams : ISearchParams
    {
        public int? VoivodeshipId { get; set; }
        public int? UniversityId { get; set; }
        public int? CourseId { get; set; }
        public string NoteName { get; set; }
        public int? Semester { get; set; }
    }
}