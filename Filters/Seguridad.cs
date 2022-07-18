using SISTEMA.Models.Roles;
using SISTEMA.Models.Usuarios;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionWeb.Filters
{
    public class Seguridad : ActionFilterAttribute
    {

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var usuario = HttpContext.Current.Session["UserName"];

            if (usuario != null)
            {
                
                ///Permisos y Roles

            }
            else
            {
                filterContext.Result = new RedirectResult("~/Login/Login");
                base.OnActionExecuting(filterContext);

            }
        }
        public static List<Paginas> GetPages()
        {
            int ID_U = Convert.ToInt32(HttpContext.Current.Session["UserID"]);
            List<Paginas> listPages = new List<Paginas>();
            ///*Se Perfilan Usuarios en DataModel Pagina.cs *///
            try
            {
                using (PruebaDataContext bd = new PruebaDataContext())
                {
                    listPages = bd.Database.SqlQuery<Paginas>(
                    "EXEC PERFIL_PAGINAS_GET @ID_U"
                    , new SqlParameter("ID_U", ID_U)
                    ).ToList();
                }

            }
            catch (Exception e)
            {

            }
            return listPages;
        }
    }
}