using SISTEMA.Models;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Data.SQLite;
using System.Web;

namespace SISTEMA.Controllers.Login
{
    internal class DBHelper
    {
        private static SQLiteConnection cn { get; set; }

        public DBHelper()
        {   
        }

        public void CreateDataBase()
        {
            SetConnection();
            SQLiteCommand cmd= new SQLiteCommand("CREATE TABLE Persona(PersonUser TEXT, PersonPass TEXT, PersonAvatar TEXT, PersonEstado INTEGER)",cn);
            cmd.ExecuteNonQuery();
        }

        public static DataSet ExecuteDataSet(string sqlQuery)
        {
            DataSet ds;
            ds = new DataSet();
            SetConnection();
            cn.Open();
            SQLiteCommand cmd = new SQLiteCommand(sqlQuery, cn);
            
            cmd.CommandTimeout = 600;

            cmd.CommandType = CommandType.Text;
            SQLiteDataAdapter ObjDataAdapter = new SQLiteDataAdapter(cmd);
            
            ObjDataAdapter.Fill(ds, "Usuario");
            cn.Close();
            return ds;
        }

        public static bool ExecuteXml(string sqlSpName, SqlParameter[] dbParams, System.Xml.XmlDocument dXml)
        {
            SqlConnection cn = new SqlConnection(ConfigurationManager.AppSettings.Get("connectionString"));
            SqlCommand cmd = new SqlCommand(sqlSpName, cn);
            cmd.CommandTimeout = Convert.ToInt16(ConfigurationManager.AppSettings.Get("connectionCommandTimeout"));
            cmd.CommandType = CommandType.StoredProcedure;

            if (dbParams != null)
            {
                foreach (SqlParameter dbParam in dbParams)
                {
                    cmd.Parameters.Add(dbParam);
                }
            }
            cn.Open();
            bool bReturn;
            try
            {
                //dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                using (SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    if (dr.Read())
                    {
                        System.Data.SqlTypes.SqlXml oXml = dr.GetSqlXml(dr.GetOrdinal("Xml"));
                        dXml.LoadXml(oXml.Value);
                        bReturn = true;
                    }
                    else
                    {
                        bReturn = false;
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return bReturn;
        }
        public static SqlDataReader ExecuteDataReader(string sqlSpName, SqlParameter[] dbParams)
        {
            SqlDataReader dr;

            SqlConnection cn = new SqlConnection(ConfigurationManager.AppSettings.Get("connectionString"));
            SqlCommand cmd = new SqlCommand(sqlSpName, cn);
            cmd.CommandTimeout = Convert.ToInt16(ConfigurationManager.AppSettings.Get("connectionCommandTimeout"));
            cmd.CommandType = CommandType.StoredProcedure;

            if (dbParams != null)
            {
                foreach (SqlParameter dbParam in dbParams)
                {
                    cmd.Parameters.Add(dbParam);
                }
            }
            cn.Open();

            try
            {
                dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            }
            catch (Exception)
            {
                throw;
            }
            return dr;
        }

        public static void ExecuteQuery(string sqlSpName)
        {
            SetConnection();
            cn.Open();
            SQLiteCommand cmd = cn.CreateCommand();
            cmd.CommandText = sqlSpName;
            cmd.ExecuteNonQuery();
            cn.Close();
        }

        private static  void SetConnection()
        {

             cn = new SQLiteConnection($"Data Source={HttpContext.Current.Server.MapPath("~/App_Data/Chat")} ;Version=3;UseUTF16Encoding=True;");
        }

        public static object ExecuteScalar(string sqlSpName, SqlParameter[] dbParams)
        {
            object retVal = null;
            SqlConnection cn = new SqlConnection(ConfigurationManager.AppSettings.Get("connectionString"));
            SqlCommand cmd = new SqlCommand(sqlSpName, cn);
            cmd.CommandTimeout = Convert.ToInt16(ConfigurationManager.AppSettings.Get("connectionCommandTimeout"));
            cmd.CommandType = CommandType.StoredProcedure;

            if (dbParams != null)
            {
                foreach (SqlParameter dbParam in dbParams)
                {
                    cmd.Parameters.Add(dbParam);
                }
            }

            cn.Open();

            try
            {
                retVal = cmd.ExecuteScalar();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (null != cn)
                    cn.Close();
            }

            return retVal;
        }

        public static object ExecuteScalar(string sqlSpName, SqlParameter[] dbParams, SqlTransaction trx, SqlConnection cn)
        {
            object retVal;
            //SqlConnection cn = new SqlConnection(ConfigurationManager.AppSettings.Get("connectionString"));
            SqlCommand cmd = new SqlCommand(sqlSpName, cn, trx);
            cmd.CommandTimeout = Convert.ToInt16(ConfigurationManager.AppSettings.Get("connectionCommandTimeout"));
            cmd.CommandType = CommandType.StoredProcedure;

            if (dbParams != null)
            {
                foreach (SqlParameter dbParam in dbParams)
                {
                    cmd.Parameters.Add(dbParam);
                }
            }

            // cn.Open();

            try
            {
                retVal = cmd.ExecuteScalar();
            }
            catch (Exception)
            {
                throw;
            }
            //finally
            //{
            //    if (null != cn)
            //        cn.Close();
            //}

            return retVal;
        }

        public static SqlParameter MakeParam(string paramName, SqlDbType dbType, int size, object objValue)
        {
            SqlParameter param;

            if (size > 0)
                param = new SqlParameter(paramName, dbType, size);
            else
                param = new SqlParameter(paramName, dbType);

            param.Value = objValue;

            return param;
        }

        public static SQLiteParameter MakeParamLite(string value)
        {
            SQLiteParameter param;
            param = new SQLiteParameter(value);
            return param;
        }

        public static SqlParameter MakeParamOutput(string paramName, SqlDbType dbType, int size)
        {
            SqlParameter param;

            if (size > 0)
                param = new SqlParameter(paramName, dbType, size);
            else
                param = new SqlParameter(paramName, dbType);

            param.Direction = ParameterDirection.Output;

            return param;
        }

        public static int ExecuteNonQueryOutput(string sqlSpName, SqlParameter[] dbParams, string paramName, SqlDbType dbType, int size)
        {
            SqlConnection cn = new SqlConnection(ConfigurationManager.AppSettings.Get("connectionString"));
            SqlCommand cmd = new SqlCommand(sqlSpName, cn);
            cmd.CommandTimeout = Convert.ToInt16(ConfigurationManager.AppSettings.Get("connectionCommandTimeout"));
            cmd.CommandType = CommandType.StoredProcedure;

            if (dbParams != null)
            {
                foreach (SqlParameter dbParam in dbParams)
                    cmd.Parameters.Add(dbParam);
            }
            SqlParameter OutParam = MakeParamOutput(paramName, dbType, size);
            cmd.Parameters.Add(OutParam);

            cn.Open();

            try
            {
                cmd.ExecuteNonQuery();

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (null != cn)
                    cn.Close();

            }
            if (OutParam.Value == null) return 0;
            else return System.Convert.ToInt16(OutParam.Value);
        }

        internal static DataSet ExecuteDataSet(string v, object p)
        {
            throw new NotImplementedException();
        }
    }
}