using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SISTEMA.Models
{
    public class Persona
    {
        public string _User { get; set; } = string.Empty;
        public string _Pass { get; set; } = string.Empty;
        public string _Avatar { get; set; } = string.Empty;

        public int _Estado { get; set; }

    }
}