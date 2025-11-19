using System.Web.Mvc;

namespace Immigration_Website.Controllers
{
    public class EducationController : BaseController
    {
        // GET: Education
        public ActionResult Index()
        {
            ViewBag.TitleBackground = "Content/images/landing-page-education.jpg";
            return View();

        }
    }
}

