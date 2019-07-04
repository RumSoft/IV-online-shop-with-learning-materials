namespace Projekcik.Api.Models
{
    public interface ISortParams
    {
        string SortBy { get; set; }
        string SortOrder { get; set; }
    }

    public class SortParams : ISortParams
    {
        public string SortBy { get; set; }
        public string SortOrder { get; set; }
    }
}