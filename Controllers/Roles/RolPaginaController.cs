using SISTEMA.Models.Roles;
using System;
using System.Transactions;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Data.SqlClient;
using MiPrimeraAplicacionWeb.Filters;
using System.Dynamic;

namespace SISTEMA.Controllers.Roles
{[Seguridad]
    public class RolPaginaController : Controller
    {
        
        // GET: RolPagina
        public ActionResult RolPagina()
        {
            ViewBag.Usuario = (string)Session["UserName"];
            dynamic mymodel = new ExpandoObject();
            mymodel.Paginas = Seguridad.GetPages();
            ViewBag.Cliente = ((string)Session["UserName"]);
            return View(mymodel);
        }

        public JsonResult ListarRol()
        {
            using (PruebaDataContext bd = new PruebaDataContext())
            {

                List<ROLES> listRoles = new List<ROLES>();
                ROLES r = new ROLES();
                r.R_H = 0;
                listRoles = bd.Database.SqlQuery<ROLES>(
                "EXEC ROLES_GET @R_ID"
                , new SqlParameter("R_ID", r.R_H)
                //, new SqlParameter("IdEmpleado", model.IdEmpleado)
                //, new SqlParameter("FlagIn", model.IdEmpleado)/**0-CB    1-ID**/
                ).ToList();



                return Json(listRoles, JsonRequestBehavior.AllowGet);


            }


        }
        //Lista de las paginas
        public JsonResult listarPaginas()
        {

            using (PruebaDataContext bd = new PruebaDataContext())
            {  
                List<PAGINAS> listPages = new List<PAGINAS>();
                listPages = bd.Database.SqlQuery<PAGINAS>(
                "EXEC PAGINAS_GET"
                ).ToList();

                return Json(listPages, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult obtenerRol(int idRol)
        {
           
            using (PruebaDataContext bd = new PruebaDataContext())
            {
                List<ROLES> listPages = new List<ROLES>();
                listPages = bd.Database.SqlQuery<ROLES>(
                "EXEC ROLES_GET @R_ID"
                , new SqlParameter("R_ID", idRol)

                ).ToList();

                return Json(listPages, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult listarRolPagina(int idRol)
        {

            //using (PruebaDataContext bd = new PruebaDataContext())
            //{

            //    var lista = bd.RolPagina.Where(p => p.RP_ID == idRol && p.RP_H == 1)
            //        .Select(x => new
            //        {
            //            x.RP_ID,
            //            x.RP_P_ID,
            //            x.RP_H
            //        }).ToList();
            //    return Json(lista, JsonRequestBehavior.AllowGet);

            //}
            using (PruebaDataContext bd = new PruebaDataContext())
            {
                List<ROLPAGINAS> listPages = new List<ROLPAGINAS>();
                listPages = bd.Database.SqlQuery<ROLPAGINAS>(
                "EXEC ROLPAGINAS_GET @R_ID"
                , new SqlParameter("R_ID", idRol)
                ).ToList();

                return Json(listPages, JsonRequestBehavior.AllowGet);
            }

        }

        public int guardarDatos(ROLES oRolCLS, string dataAEnviar)
        {
            int nRegistrosAfect = 0;
            Decimal IdrolegetfromSQL;
            try
            {
                using (PruebaDataContext bd = new PruebaDataContext())
                {

                    using (var transaccion = new TransactionScope())
                    {

                            if (oRolCLS.R_ID == 0)
                            {   
                                   IdrolegetfromSQL = bd.Database.SqlQuery<Decimal>(
                                    "EXEC ROLES_ADD_ROL    @NAMEROL" +
                                    "                     , @Descripcion" +
                                    "                     , @ROL_ACTIVE", 
                                    new SqlParameter("NAMEROL", oRolCLS.R_NAME),
                                    new SqlParameter("Descripcion", oRolCLS.R_DESC),
                                    new SqlParameter("ROL_ACTIVE",  oRolCLS.R_H)
                                            
                                    ).First();
                                        

                                    string[] codigos = dataAEnviar.Split('$');
                                    for (int i = 0; i < codigos.Length; i++)
                                {
                                    ROLPAGINAS oRolPagina = new ROLPAGINAS();
                                    oRolPagina.RP_P_ID = int.Parse(codigos[i]);
                                    oRolPagina.RP_H = 1;

                                    nRegistrosAfect = Convert.ToInt32(bd.Database.SqlQuery<Decimal>(
                                    "EXEC ROLES_ADD_ROLPAGINA    @ROL" +
                                    "                     , @PAGE" +
                                    "                     , @ACTIVE" ,
                                    new SqlParameter("ROL",Convert.ToInt32(IdrolegetfromSQL)),
                                    new SqlParameter("PAGE", oRolPagina.RP_P_ID),
                                    new SqlParameter("ACTIVE", oRolPagina.RP_H)

                                    ).First());



                                }    
                                    transaccion.Complete();

                            }
                            else
                            {
                            //Modificamos ROL, NO ES UN GET ES UN UPDT, LISTO IGUAL MANERA EL GIT
                            ROLES oRol = bd.Database.SqlQuery<ROLES>(
                            "EXEC ROLES_UPD_ROL    @ROL" +
                                       "                     , @NAME" +
                                       "                     , @DESC"+
                                       "                     , @ACT",
                                   new SqlParameter("ROL", oRolCLS.R_ID),
                                   new SqlParameter("NAME", oRolCLS.R_NAME),
                                   new SqlParameter("DESC", oRolCLS.R_DESC),
                                   new SqlParameter("ACT", oRolCLS.R_H)
                            ).First();

                                //Deshabilitar todas las paginitas de dicho Rol

                                var lista = bd.Database.SqlQuery<ROLPAGINAS>(
                                    "EXEC ROLPAGINAS_GET @R_ID"
                                    , new SqlParameter("R_ID", oRolCLS.R_ID)
                                    ).ToList();

                                foreach (ROLPAGINAS oRolPagina in lista)
                                {
                                    oRolPagina.RP_H = 0;
                                    /**Deshabilitar Paginas del Rol**/
                                    IdrolegetfromSQL =Convert.ToDecimal(bd.Database.SqlQuery<int>(
                                       "EXEC ROLES_UPD_ROLPAGINA    @ROL" +
                                           "                     , @PAGE"+
                                           "                     , @ACT",
                                       new SqlParameter("ROL", oRolCLS.R_ID),
                                       new SqlParameter("PAGE", oRolPagina.RP_P_ID),
                                       new SqlParameter("ACT", oRolPagina.RP_H)

                                       ).First());

                                }

                                //Habilitar
                                string[] codigos = dataAEnviar.Split('$');
                                for (int i = 0; i < codigos.Length; i++)
                                {
                                        ROLPAGINAS oRolPagina = new ROLPAGINAS();
                                        int cantidad = bd.Database.SqlQuery<int>(
                                       "EXEC ROLES_COUNT_ROLPAGINA    @ROL" +
                                             "                     , @PAGE",
                                       new SqlParameter("ROL", oRol.R_ID),
                                       new SqlParameter("PAGE", int.Parse(codigos[i]))

                                       ).First();

                                    if (cantidad == 0)
                                    {
                                       
                                        oRolPagina.RP_P_ID = int.Parse(codigos[i]);
                                        oRolPagina.RP_H = 1;

                                        nRegistrosAfect = Convert.ToInt32(bd.Database.SqlQuery<Decimal>(
                                        "EXEC ROLES_ADD_ROLPAGINA    @ROL" +
                                        "                     , @PAGE" +
                                        "                     , @ACTIVE",
                                        new SqlParameter("ROL", Convert.ToInt32(oRol.R_ID)),
                                        new SqlParameter("PAGE", oRolPagina.RP_P_ID),
                                        new SqlParameter("ACTIVE", oRolPagina.RP_H)

                                        ).First());
                                    }
                                    else
                                    {
                                    /**Habilitar Paginas del Rol**/
                                    oRolPagina.RP_H = 1;
                                    IdrolegetfromSQL = Convert.ToDecimal(bd.Database.SqlQuery<int>(
                                       "EXEC ROLES_UPD_ROLPAGINA    @ROL" +
                                           "                     , @PAGE"+
                                           "                     , @ACT",
                                       new SqlParameter("ROL", oRol.R_ID),
                                       new SqlParameter("PAGE", int.Parse(codigos[i])),
                                       new SqlParameter("ACT", oRolPagina.RP_H)

                                       ).First());
                                }



                                }
                                nRegistrosAfect = 1;
                                transaccion.Complete();
                            }

                    }

                }
                
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex);
                nRegistrosAfect = 0;
            }

            return nRegistrosAfect;
        }
        

    }
}