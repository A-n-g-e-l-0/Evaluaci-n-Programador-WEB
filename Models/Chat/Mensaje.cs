using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SISTEMA.Models
{
    public class Mensaje
    {
        public string _DateTime { get; set; }
        public string Tipo { get; set; }
        public string Msg { get; set; }

        public string PersonUser { get; set; }
    }
}