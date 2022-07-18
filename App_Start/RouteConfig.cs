using System.Web.Mvc;
using System.Web.Routing;

namespace SISTEMA
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{exampleRadios}/{password}",
            //    defaults: new { controller = "Entradas", action = "ListarEntradas", exampleRadios = 0, password="" }
            //);

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/",
                defaults: new { controller = "Login", action = "Login"}
            );


        }

    }
}
