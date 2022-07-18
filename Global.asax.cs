using System.Configuration;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SISTEMA
{
    public class MvcApplication : System.Web.HttpApplication
    {

        public static SqlDependency dependecy = null;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

          //SqlDependency.Start(ConfigurationManager.AppSettings.Get("connectionString"));
        }


        protected void Aplication_End()
        {
            //SqlDependency.Stop(ConfigurationManager.AppSettings.Get("connectionString"));
        }
    }
}
