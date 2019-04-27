namespace Projekcik.Api.Models
{
    // troche abstrakcji,
    // troche bez sensu,
    // ale niech będzie jak jest

    public interface IPagerParams
    {
        int Size { get; }
        int Page { get; }
    }

    public interface IPagerResult
    {
        int Count { get; }
        int Pages { get; }
    }

    public class PagerParams : IPagerParams
    {
        public int Size { get; set; } = 10;
        public int Page { get; set; } = 1;
    }

    class PagerResult : IPagerResult, IPagerParams
    {
        public int Size { get; set;  }
        public int Page { get; set; }
        public int Count { get; set; }
        public int Pages { get; set; }
    }
}