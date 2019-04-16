namespace Projekcik.Api.Models
{
    public interface IPagerParams
    {
        int PageSize { get; set; }
        int Page { get; set; }
    }

    public class PagerParams : IPagerParams
    {
        public int PageSize { get; set; }
        public int Page { get; set; }
    }
}