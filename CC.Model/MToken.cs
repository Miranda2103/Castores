using System.ComponentModel;

namespace CC.Model
{
    [DisplayName("Token")]
    public class MToken
    {
        public Int64 Id { get; set; }
        public String Usuario { get; set; }
        public String NombreUsuario { get; set; }
        public Int64 IdRol { get; set; }
        public Boolean CambiaContrasena { get; set; }
        public String Token { get; set; }

        public MToken()
        {
            Usuario = string.Empty;
            NombreUsuario = string.Empty;
            Token = string.Empty;
        }
    }
}
