using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CC.Model
{
    [DisplayName("Rol")]
    [Table("Rol", Schema = "dbo")]
    public class MRol
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 Id { get; set; }

        [StringLength(50)]
        public String Rol { get; set; }

        public Int64 IdUsuarioInserta { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime FechaInserta { get; set; }

        public Int64 IdUsuarioActualiza { get; set; }

        public DateTime FechaActualiza { get; set; }

        public Boolean Activo { get; set; }

        public MRol()
        {
            Rol = "";
        }

    }
}
