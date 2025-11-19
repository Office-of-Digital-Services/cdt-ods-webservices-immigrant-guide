using System.Web.Mvc;

namespace Immigration_Website.Controllers
{
    public class PublicChargeController : BaseController
    {
        // GET: Education
        public ActionResult Index()
        {
            ViewBag.TitleBackground = "Content/images/landing-page-public-benefits.jpg";
            return View();

        }
        public ActionResult PublicChargePublicBenefits()
        {
            ViewBag.TitleBackground = "NONE";
            return View();

        }
        public ActionResult BuildingYourSkillsAndEducation()
        {
            ViewBag.TitleBackground = "NONE";
            return View();

        }
    }
}