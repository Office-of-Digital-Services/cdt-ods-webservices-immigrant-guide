using System.Web.Mvc;

namespace Immigration_Website.Controllers
{
    public class FindJobsAndTrainingController : BaseController
    {
        // GET: FindJobsAndTrainingController
        public ActionResult Index()
        {
            ViewBag.TitleBackground = "Content/images/landing-page-job-training.jpg";
            return View();
        }
    }
}