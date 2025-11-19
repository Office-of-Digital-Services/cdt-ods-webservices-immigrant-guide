using System.Web.Mvc;

namespace Immigration_Website.Controllers
{
    public class LearnEnglishController : BaseController
    {
        // GET: LearnEnglish
        public ActionResult Index()
        {
            ViewBag.TitleBackground = "Content/images/landing-page-learn-english.jpg";
            return View();
        }
    }
}