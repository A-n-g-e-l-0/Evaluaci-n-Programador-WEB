using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Web.UI;
using System.Web.Mvc;
using System.Data.SQLite;
using SISTEMA.Models;

namespace SISTEMA.Controllers.Login
{
    public class LoginController : Controller
    {
        public bool Aceptado { get; set; }
        // GET: Login
        public ActionResult Login()
        {
                this.Session.Clear();
                Session.Abandon();

                
                                 
            return View();
        }

        public ActionResult login_Click(Persona e)
        {
            try
            {



                DataSet ds = ValidarLogin(e._User, e._Pass);
                DataTable dt = ds.Tables[0];

                if (dt.Rows.Count == 0)
                {
                    this.Session.Clear();
                    Session.Abandon();
                    return Redirect("/Home/About");
                }
                else
                {
                    #region Encriptacion
                    #endregion

                        Session["UserName"] = dt.Rows[0]["PersonUser"].ToString();
                        e._Estado = (int) Estado.DISPONIBLE;
                        Session["Estado"] = Estado.DISPONIBLE.ToString();

                    actualizaEstadoPersona(e);
                        return Redirect("/Home/Index");
                }
            }
            catch (Exception m)
            {
                return View();
                return Redirect("/Home/About");
            }
        }

        private void actualizaEstadoPersona(Persona e)
        {
            string updPersona = $"UPDATE Persona set PersonEstado={e._Estado} WHERE PersonUser='{e._User}' AND PersonPass='{e._Pass}'";

            DBHelper.ExecuteQuery(updPersona);
        }

        public static DataSet ValidarLogin(string PersonUser, string PersonPass)
        {

            string BuscaPersona = $"SELECT * FROM Persona WHERE PersonUser ='{PersonUser}' AND PersonPass='{PersonPass}'";



            return DBHelper.ExecuteDataSet(BuscaPersona);
        }

        public ActionResult RegistrarPersona(Persona X)
        {

            if (X._User.Contains("@"))
            {

                string insPersona =
                    $"INSERT INTO Persona(PersonUser, PersonPass, PersonAvatar, PersonEstado) VALUES('{X._User}', '{X._Pass}', '', 0)";

                DataSet ds = ValidarLogin(X._User, X._Pass);
                DataTable dt = ds.Tables[0];

                if (dt.Rows.Count > 0)
                {
                    ViewBag.Message = "Usuario Ya existe";

                }
                else
                {
                    DBHelper.ExecuteQuery(insPersona);
                    ViewBag.Message = "Usuario Registrado Correctamente";
                }
            }
            else ViewBag.Message = "Usuario no valido, registre correo";

            return View();
        }


    }
}