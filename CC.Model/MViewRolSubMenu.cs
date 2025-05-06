namespace CC.Model
{
    public class MViewRolSubMenu
    {
        public Int64 IdRol { get; set; }
        public String? Rol { get; set; }
        public Int64 IdMenu { get; set; }
        public String? Menu { get; set; }
        public Int64 IdSubMenu { get; set; }
        public String? SubMenu { get; set; }
        public String? SubMenuR { get; set; }
        public String? Ruta { get; set; }
        public String? Icono { get; set; }
        public Int32 Orden { get; set; }
        public String Fecha { get; set; }
        public Boolean Activo { get; set; }

        public MViewRolSubMenu()
        {
            Rol = "";
            SubMenu = "";
            Fecha = "";
        }

    }
}
