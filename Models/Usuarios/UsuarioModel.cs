using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SISTEMA.Models.Usuarios
{
    public class UsuarioModel
    {
        public int idUsuario { get; set; }
        public string nombrePersona { get; set; }
        public string nombreUsuario { get; set; }
        public string nombreRol { get; set; }
        public string nombreTipoEmpleado { get; set; }
        public int IIDROL { get; set; }
        public int ID_E { get; set; }

        /// <summary>
        /// Id Tipo de Usuario
        /// </summary>
        public int ID_T { get; set; }

    }
}