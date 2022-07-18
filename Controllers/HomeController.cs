using SISTEMA.Models.Roles;
using SISTEMA.Models.Usuarios;
using System;
using System.Dynamic;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Mvc;
using MiPrimeraAplicacionWeb.Filters;
using SISTEMA.Models;
using System.Data;
using SISTEMA.Controllers.Login;
using Newtonsoft.Json.Linq;

namespace SISTEMA.Controllers 
{ 
    [Seguridad]
    public class HomeController : Controller
    {
       
        /**
         * Trae informacion del empleado*
         */
        public ActionResult Index()
        {
            dynamic mymodel = new ExpandoObject();
            //mymodel.Paginas = GetPages();

            mymodel.Personas = GetPersonas();
            mymodel.Grupos = GetGrupos();
            /***Mis primeros Clientes**/
            ViewBag.Usuario = ((string)Session["UserName"]);
            ViewBag.Estado= ((string)Session["Estado"]);


            return View(mymodel);
        }

        private dynamic GetPersonas()
        {
            List<Persona> Personas= new List<Persona>();

            try
            {
                DataSet ds = CargarPersonas((string)Session["UserName"]);
                DataTable dt = ds.Tables[0];
                Persona aux = null;
                foreach (DataRow dr in dt.Rows)
                {
                    aux = new Persona();
                    aux._User = dr["PersonUser"].ToString();
                    aux._Pass = dr["PersonPass"].ToString();
                    aux._Avatar = dr["PersonAvatar"].ToString();
                    aux._Estado = Int32.Parse(dr["PersonEstado"].ToString());
                    Personas.Add(aux);  
                }

            }
            catch (Exception e)
            {

            }
            return Personas;
        }


        private dynamic GetGrupos()
        {
            List<Grupo> Grupos= new List<Grupo>();

            try
            {
                DataSet ds = CargarGrupos((string)Session["UserName"]);
                DataTable dt = ds.Tables[0];
                Grupo aux = null;
                foreach (DataRow dr in dt.Rows)
                {
                    aux = new Grupo();
                    aux.HGID = dr["HGID"].ToString();
                    aux.HGNAME = dr["HGNAME"].ToString();
                    Grupos.Add(aux);
                }

            }
            catch (Exception e)
            {

            }
            return Grupos;
        }

        public ActionResult PaintGrupos()
        {
            List<Grupo> Grupos = new List<Grupo>();

            try
            {
                DataSet ds = CargarGrupos((string)Session["UserName"]);
                DataTable dt = ds.Tables[0];
                Grupo aux = null;
                foreach (DataRow dr in dt.Rows)
                {
                    aux = new Grupo();
                    aux.HGID = dr["HGID"].ToString();
                    aux.HGNAME = dr["HGNAME"].ToString();
                    Grupos.Add(aux);
                }

            }
            catch (Exception e)
            {

            }
            return Json(Grupos, JsonRequestBehavior.AllowGet);
        }


        private DataSet CargarGrupos(string PersonCreator)
        {
            string selPersonas = $"SELECT * FROM HG WHERE HGPU='{PersonCreator}'";

            return DBHelper.ExecuteDataSet(selPersonas);
        }

        public string CrearGrupo(string HGID, string HGPUS, string HGPU, string HGNAME)
        {
            string Resultado="";

            string valHistoricoGrupal = $"SELECT HGID FROM HG WHERE HGPUS='{HGPUS}' AND HGPU='{HGPU}'  AND HGNAME='{HGNAME}'";

            DataSet ds = DBHelper.ExecuteDataSet(valHistoricoGrupal);
            DataTable dt = ds.Tables[0];

            try
            {
                if (dt.Rows.Count == 0)
                {
                    string UpdateMensajeNodo =
                        $"INSERT INTO HG(HGID, HGPUS, HGPU, HGNAME ) VALUES ('{HGID}'" +
                        $",'{HGPUS}', '{HGPU}', '{HGNAME}')";

                    DBHelper.ExecuteQuery(UpdateMensajeNodo);
                    Resultado = $"{HGPU}";
                }
                else
                {
                    Resultado = "Existe Grupo";
                }
            }
            catch (Exception ex)
            {
                Resultado = "";
            }

            return Resultado;
        }

        private DataSet CargarPersonas(string v)
        {
            string selPersonas = $"SELECT * FROM Persona WHERE PersonUser <> '{v}' AND PersonUser <> ''";

            return DBHelper.ExecuteDataSet(selPersonas);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }



        public List<Paginas> GetPages()
        {
            ViewBag.Usuario = ((string)Session["UserName"]);
            int ID_U = Convert.ToInt32(Session["UserID"]);
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
        


        public JsonResult LoadMensajes(string PersonUserTo)
        {
            List<Mensaje> Mensajes = new List<Mensaje>();
            string valHistorico = $"SELECT HistoricoId FROM Historico WHERE PersonUserOrigen='{((string)Session["UserName"])}' AND PersonUserDestino='{PersonUserTo}'";

            DataSet ds = DBHelper.ExecuteDataSet(valHistorico);
            DataTable dt = ds.Tables[0];


            try
            {
                if (dt.Rows.Count > 0)
                {
                    string SelectMensajes =
                        $"SELECT * FROM HistoricoDetalle WHERE HistoricoId='{dt.Rows[0]["HistoricoId"].ToString()}'";


                    ds = DBHelper.ExecuteDataSet(SelectMensajes);
                    dt = ds.Tables[0];

                   

                    Mensaje aux;
                    foreach (DataRow dr in dt.Rows)
                    {
                        aux = new Mensaje();
                        aux._DateTime = dr["DateTime"].ToString();
                        aux.Tipo = dr["Tipo"].ToString();
                        aux.Msg = dr["Msg"].ToString();
                        Mensajes.Add(aux);
                    }
                }
            }
            catch (Exception ex)
            {
            }

            return Json(Mensajes, JsonRequestBehavior.AllowGet);

        }

        public string SendMesage(string _datetime,  string msg, string Tipo, string PersonUserTo)
        {
            string Resultado;
            
            //Valida si exisye historico

            string valHistorico = $"SELECT HistoricoId FROM Historico WHERE PersonUserOrigen='{((string)Session["UserName"])}' AND PersonUserDestino='{PersonUserTo}'";

            DataSet ds = DBHelper.ExecuteDataSet(valHistorico);
            DataTable dt = ds.Tables[0];


            try
            {
                if (dt.Rows.Count > 0)
                {
                    string UpdateMensajeNodo =
                        $"INSERT INTO HistoricoDetalle(HistoricoId, DateTime, Tipo, Msg) VALUES ('{dt.Rows[0]["HistoricoId"].ToString()}'" +
                        $",'{_datetime}', '{Tipo}', '{msg}')";

                    DBHelper.ExecuteQuery(UpdateMensajeNodo);
                    Resultado = $"{PersonUserTo}";
                }
                else
                {

                    Guid g = Guid.NewGuid();
                    string InsertaMensajeenNodo =
                        $" INSERT INTO Historico (HistoricoId , PersonUserOrigen, PersonUserDestino) VALUES ('{g}','{((string) Session["UserName"])}'" +
                        $",'{PersonUserTo}') ";

                    string UpdateMensajeNodo =
                        $"INSERT INTO HistoricoDetalle(HistoricoId, DateTime, Tipo, Msg) VALUES ('{g}'" +
                        $",'{_datetime}', '{Tipo}', '{msg}')";

                    DBHelper.ExecuteQuery(InsertaMensajeenNodo);
                    DBHelper.ExecuteQuery(UpdateMensajeNodo);

                    Resultado = $"{PersonUserTo}";

                }
            }catch(Exception ex)
            {
                Resultado = "";
            }

            ///Ahora a la inversa, supongo que debe notificarse al remitente
            try
            {
                valHistorico = $"SELECT HistoricoId FROM Historico WHERE PersonUserOrigen='{PersonUserTo}' AND PersonUserDestino='{((string)Session["UserName"])}'";

                ds = DBHelper.ExecuteDataSet(valHistorico);
                dt = ds.Tables[0];

                if (dt.Rows.Count > 0)
                {
                    string UpdateMensajeNodo =
                        $"INSERT INTO HistoricoDetalle(HistoricoId, DateTime, Tipo, Msg) VALUES ('{dt.Rows[0]["HistoricoId"].ToString()}'" +
                        $",'{_datetime}', 'in', '{msg}')";

                    DBHelper.ExecuteQuery(UpdateMensajeNodo);
                    
                }
                else
                {

                    Guid g = Guid.NewGuid();
                    string InsertaMensajeenNodo =
                        $" INSERT INTO Historico (HistoricoId , PersonUserOrigen, PersonUserDestino) VALUES ('{g}','{PersonUserTo}'" +
                        $",'{((string)Session["UserName"])}') ";

                    string UpdateMensajeNodo =
                        $"INSERT INTO HistoricoDetalle(HistoricoId, DateTime, Tipo, Msg) VALUES ('{g}'" +
                        $",'{_datetime}', 'in', '{msg}')";

                    DBHelper.ExecuteQuery(InsertaMensajeenNodo);
                    DBHelper.ExecuteQuery(UpdateMensajeNodo);
                }
            }
            catch (Exception ex)
            {
                Resultado = "";
            }

            return Resultado;

        }


        public string SendMesageGrupal(string _datetime, string msg, string Tipo, string HGID, string Grupo)
        {
            string Resultado="";

            try
            {
                if (HGID != null)
                {
                    string UpdateMensajeNodo =
                        $"INSERT INTO HGDE(HGID, HGDATETIME, HGDTIPO, HGDMSG, HGDPU) VALUES ('{HGID}','{_datetime}'" +
                        $",'{Tipo}', '{msg}', '{((string)Session["UserName"])}')";

                    DBHelper.ExecuteQuery(UpdateMensajeNodo);
                    Resultado = $"{HGID}";
                }
            }
            catch (Exception ex)
            {
                Resultado = "";
            }

            return Resultado;

        }




        public JsonResult LoadMensajesGrupal(string HGID)
        {
            List<Mensaje> Mensajes = new List<Mensaje>();

            try
            {
                if (HGID!=null)
                {
                    string SelectMensajes =
                        $"SELECT * FROM HGDE WHERE HGID='{HGID}'";

                    DataSet ds = DBHelper.ExecuteDataSet(SelectMensajes);
                    DataTable dt = ds.Tables[0];

                    Mensaje aux;
                    foreach (DataRow dr in dt.Rows)
                    {
                        aux = new Mensaje();
                        aux._DateTime = dr["HGDATETIME"].ToString();
                        aux.Tipo = dr["HGDTIPO"].ToString();
                        aux.Msg = dr["HGDMSG"].ToString();
                        aux.PersonUser = dr["HGDPU"].ToString();
                        Mensajes.Add(aux);
                    }
                }
                else
                {

                }
            }
            catch (Exception ex)
            {
            }

            return Json(Mensajes, JsonRequestBehavior.AllowGet);

        }


        public string LoadPersonasGrupal(string HGID)
        {
            string participantes = "";
            string valPersonas = $"SELECT  HGPUS, HGNAME FROM HG WHERE HGID='{HGID}'";

            DataSet ds = DBHelper.ExecuteDataSet(valPersonas);
            DataTable dt = ds.Tables[0];

            try
            {
                if (dt.Rows.Count > 0)
                {
                        participantes = $"{dt.Rows[0]["HGNAME"].ToString()}, Integrantes: [{dt.Rows[0]["HGPUS"].ToString()}]";
                }
            }
            catch (Exception ex)
            {
            }

            return participantes;

        }

    }


}