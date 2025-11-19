
using System.Web.Mvc;

namespace Immigration_Website.Controllers
{
    public class LegalHelpAndCitizenshipController : BaseController
    {
        // GET: Citizenship
        public ActionResult Index()
        {

            ViewBag.TitleBackground = "Content/images/landing-page-citizenship.jpg";
            return View();
        }
    }
}