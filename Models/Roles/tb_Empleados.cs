//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SISTEMA.Models.Roles
{
    using System;
    using System.Collections.Generic;
    
    public partial class tb_Empleados
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tb_Empleados()
        {
            this.L_User = new HashSet<L_User>();
        }
    
        public int IdEmpleado { get; set; }
        public string CBEmpleado { get; set; }
        public string NameComplete { get; set; }
        public Nullable<int> IdTienda { get; set; }
        public System.DateTime E_FechaIngreso { get; set; }
        public System.DateTime E_FechaNacimiento { get; set; }
        public string E_LNacimiento { get; set; }
        public string E_Cedula { get; set; }
        public string E_Sexo { get; set; }
        public string E_Sucursal { get; set; }
        public string E_ECivil { get; set; }
        public string E_Email { get; set; }
        public string E_Telefono { get; set; }
        public string E_Direccion { get; set; }
        public Nullable<System.DateTime> FAlta { get; set; }
        public Nullable<System.DateTime> E_FBaja { get; set; }
        public byte[] E_Avatar { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<L_User> L_User { get; set; }
    }
}
