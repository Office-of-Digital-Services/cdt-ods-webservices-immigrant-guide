using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Immigration_Website.Content.Texts;

namespace Immigration_Website.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()

        {
            ViewBag.TitleBackground = "NONE";
            return View();
        }

        public ActionResult Translate()

        {
            ViewBag.TitleBackground = "NONE";
            return View();
        }

        public ActionResult PrivacyConditions()
        {
            ViewBag.TitleBackground = "NONE";
            return View();
        }
        
        public ActionResult Accessibility()
        {
            ViewBag.TitleBackground = "NONE";
            return View();
        }

        public ActionResult AccessibilityCertification()
        {
            ViewBag.TitleBackground = "NONE";
            return View();
        }

        public ActionResult Services()
        {
            ViewBag.TitleBackground = "Content/images/landing-page-services.jpg";
            return View();
        }

        public ActionResult Service()
        {
            ViewBag.TitleBackground = "NONE";
            return View();
        }

        public ActionResult Agencies()
        {
            ViewBag.TitleBackground = "Content/images/landing-page-agencies.jpg";
            return View();
        }

        public ActionResult Agency()
        {
            ViewBag.TitleBackground = "NONE";
            return View();
        }

        public ActionResult YourRights()
        {
            ViewBag.TitleBackground = "Content/images/landing-page-citizenship.jpg";
            return View();
        }

        public ActionResult Information()
        {
            ViewBag.TitleBackground = "Content/images/landing-page-deffered.jpg";
            return View();
        }

    }
}