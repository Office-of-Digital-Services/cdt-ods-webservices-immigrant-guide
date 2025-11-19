using System.Web.Mvc;

namespace Immigration_Website.Controllers
{
    public class DisasterReliefController : BaseController
    {
        // GET: Education
        public ActionResult Index()
        {
            ViewBag.TitleBackground = "NONE";
            return View();

        }
    }
}