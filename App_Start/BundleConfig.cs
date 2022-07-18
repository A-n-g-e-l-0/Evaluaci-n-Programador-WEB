using System.Web.Optimization;

namespace SISTEMA
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/css").Include(
                        "~/Content/vendor/fontawesome-free/css/all.min.css"
                        , "~/Content/css/sb-admin-2.min.css"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/css/paguinado").Include(
                       "~/Content/paguinado/datatables.css"
                       ));

            bundles.Add(new ScriptBundle("~/bundles/css/requerido").Include(
                       "~/Content/css/Obligatorio/Requerido.css"
                       ));

            //Calendarios DatePicker CSS
            bundles.Add(new ScriptBundle("~/bundles/css/Almanaque").Include(
                 "~/Content/vendor/jquery-ui/jquery-ui.css"
                ));

            //Pagina Inicial e-comm CSS
            bundles.Add(new ScriptBundle("~/bundles/css/Business").Include(
                 "~/Content/css/business-frontpage.css"
                ));



            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                      "~/Content/vendor/jquery/jquery.min.js"
                      , "~/Content/vendor/bootstrap/js/bootstrap.bundle.min.js"
                      , "~/Content/vendor/jquery-easing/jquery.easing.min.js"
                      , "~/Content/js/sb-admin-2.min.js"

                      // , "~/Content/js/Chat.js"
                      //, "~/Content/js/demo/chart-pie-demo.js"
                      // , "~/Content/vendor/chart.js/Chart.min.js"

                      ));

            bundles.Add(new ScriptBundle("~/bundles/js/RolPaginas").Include(
                       "~/Content/js/Empleado/RolPagina.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/js/simpleAutoComplete").Include(
                            "~/Content/js/ClientesCredito/simpleAutoComplete.js"
                     ));

            bundles.Add(new ScriptBundle("~/bundles/js/Login").Include(
                       "~/Content/js/Login/LoginEnter.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/js/Usuario").Include(
                       "~/Content/js/Login/Usuario.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/js/Chat").Include(
                "~/Content/js/Login/Chat.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/js/LoadUser").Include(
                       "~/Content/js/Login/LoadUser.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/js/paguinado").Include(
                       "~/Content/paguinado/datatables.min.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/js/Almanaque").Include(
                       "~/Content/vendor/jquery-ui/jquery-ui.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/js/Perfiles").Include(
                      "~/Content/js/Login/Perfiles.js"
               ));

            bundles.Add(new ScriptBundle("~/bundles/js/MyChart").Include(
                      "~/Content/js/demo/chart-area-demo.js"
               ));

            bundles.Add(new ScriptBundle("~/bundles/js/Chart").Include(
                      "~/Content/vendor/chart.js/Chart.min.js"
               ));


        }
    }
}
