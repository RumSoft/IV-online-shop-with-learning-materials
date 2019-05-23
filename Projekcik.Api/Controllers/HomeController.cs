using Microsoft.AspNetCore.Mvc;

namespace Projekcik.Api.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
