using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CC.Model
{
    [DisplayName("Usuario")]
    [Table("Usuario", Schema = "dbo")]
    public class MUsuario
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 Id { get; set; }

        [StringLength(50)]
        public String Usuario { get; set; }

        [StringLength(Int32.MaxValue)]
        public String Contrasena { get; set; }

        [StringLength(50)]
        public String Nombre { get; set; }

        [StringLength(50)]
        public String ApellidoPaterno { get; set; }

        [StringLength(50)]
        public String ApellidoMaterno { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public String NombreCompleto { get; set; }

        public Boolean CambiaContrasena { get; set; }

        public Int64 IdRol { get; set; }

        public Int64 IdUsuarioInserta { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime FechaInserta { get; set; }
        
        public Int64 IdUsuarioActualiza { get; set; }

        public DateTime FechaActualiza { get; set; }

        public Boolean Activo { get; set; }

        public MUsuario()
        {
            Usuario = "";
            Contrasena = "";
            Nombre = "";
            ApellidoPaterno = "";
            ApellidoMaterno = "";
            NombreCompleto = "";
        }

    }
}
