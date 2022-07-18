using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SISTEMA.Models.Usuarios
{
    public class UserAdding
    {
        public int IIDUSUARIO { get; set; }
        public string nombreUsuario { get; set; }
        public string CONTRA { get; set; }
        /// <summary>
        /// Id Tipo de Usuario
        /// </summary>
        public int TIPOUSUARIO { get; set; }
        public int ID_E { get; set; }
        public int ID_ROL { get; set; }
    }
}