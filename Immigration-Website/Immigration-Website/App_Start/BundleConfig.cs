using System.Web;
using System.Web.Optimization;

namespace Immigration_Website
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {


            bundles.Add(new ScriptBundle("~/bundles/stateTemplateLibJs").Include(
            "~/Content/StateTemplate/js/libs/modernizr-2.0.6.min.js",
            "~/Content/StateTemplate/js/libs/modernizr-extra.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/stateTemplateJs").Include(
                     "~/Content/js/cagov.core.js",
                      "~/Content/js/search.js"));

            bundles.Add(new StyleBundle("~/Content/stateTemplateCss").Include(
                      "~/Content/css/cagov.core.css",
                      "~/Content/css/colorscheme-oceanside.css",
                      "~/Content/css/cagov.font-only.css"));


        }
    }
}
