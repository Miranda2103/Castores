namespace CC.Model
{
    public class MViewUsuario
    {
        public Int64 IdUsuario { get; set; }
        public String Usuario { get; set; }
        public String Contrasena { get; set; }
        public String Nombre { get; set; }
        public String ApellidoPaterno { get; set; }
        public String ApellidoMaterno { get; set; }
        public String NombreCompleto { get; set; }
        public Boolean CambiaContrasena { get; set; }
        public Int64 IdRol { get; set; }
        public String Rol { get; set; }
        public String Fecha { get; set; }
        public Boolean Activo { get; set; }

        public MViewUsuario()
        {
            Usuario = String.Empty;
            Contrasena = String.Empty;
            Nombre = String.Empty;
            ApellidoPaterno = String.Empty;
            ApellidoMaterno = String.Empty;
            NombreCompleto = String.Empty;
            Rol = String.Empty;
            Fecha = String.Empty;
        }

    }
}
