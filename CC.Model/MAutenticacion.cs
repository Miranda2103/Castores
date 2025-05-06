using System.ComponentModel;

namespace CC.Model
{
    [DisplayName("Autenticacion")]
    public class MAutenticacion
    {
        public String Usuario { get; set; }
        public String Contrasena { get; set; }

        public MAutenticacion()
        {
            Usuario = string.Empty;
            Contrasena = string.Empty;
        }

    }
}
