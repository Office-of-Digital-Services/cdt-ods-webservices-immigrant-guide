using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Immigration_Website.Controllers
{
    public class COVID19Controller : Controller
    {
        // GET: COVID19
        public ActionResult Index()
        {
            ViewBag.TitleBackground = "NONE";
            return View();

        }
    }
}