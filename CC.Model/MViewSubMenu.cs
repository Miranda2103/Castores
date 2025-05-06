namespace CC.Model
{
    public class MViewSubMenu
    {
        public Int64 IdMenu { get; set; }
        public String? Menu { get; set; }
        public Int64 IdSubMenu { get; set; }
        public String? SubMenu { get; set; }
        public String? Ruta { get; set; }
        public String? Icono { get; set; }
        public Int32 Orden { get; set; }
        public Boolean Estatus { get; set; }
        public String Fecha { get; set; }
        public Boolean Activo { get; set; }

        public MViewSubMenu()
        {
            SubMenu = "";
            Fecha = "";
        }

    }
}
