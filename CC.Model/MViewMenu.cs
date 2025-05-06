namespace CC.Model
{
    public class MViewMenu
    {
        public Int64 IdMenu { get; set; }
        public String? Menu { get; set; }
        public String? Ruta { get; set; }
        public String? Icono { get; set; }
        public Int32 Orden { get; set; }
        public Boolean Estatus { get; set; }
        public String Fecha { get; set; }
        public Boolean Activo { get; set; }

        public MViewMenu()
        {
            Menu = "";
            Fecha = "";
        }

    }
}
