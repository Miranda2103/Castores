namespace CC.Model
{
    public class MViewRolMenu
    {
        public Int64 IdRol { get; set; }
        public String? Rol { get; set; }
        public Int64 IdMenu { get; set; }
        public String? Menu { get; set; }
        public String? Ruta { get; set; }
        public String? Icono { get; set; }
        public Int32 Orden { get; set; }
        public String Fecha { get; set; }
        public Boolean Activo { get; set; }

        public MViewRolMenu()
        {
            Rol = "";
            Menu = "";
            Fecha = "";
        }

    }
}
