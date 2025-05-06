namespace CC.Model
{
    public class MViewRol
    {
        public Int64 IdRol { get; set; }
        public String? Rol { get; set; }
        public String? Fecha { get; set; }
        public Boolean Activo { get; set; }

        public MViewRol()
        {
            Rol = "";
            Fecha = "";
        }

    }
}
