using System.Web.Mvc;

namespace Immigration_Website.Controllers
{
    public class SearchController : BaseController
    {
        // GET: Search
        public ActionResult Index()
        {
            ViewBag.TitleBackground = "Content/images/landing-page-agencies.jpg";
            return View();
            
        }
    }
}