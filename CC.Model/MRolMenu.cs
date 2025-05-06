using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace CC.Model
{
    [DisplayName("RolMenu")]
    [Table("RolMenu", Schema = "dbo")]
    public class MRolMenu
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 Id { get; set; }

        public Int64 IdRol { get; set; }

        public Int64 IdMenu { get; set; }

        public Int64 IdUsuarioInserta { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime FechaInserta { get; set; }
        
        public Int64 IdUsuarioActualiza { get; set; }

        public DateTime FechaActualiza { get; set; }

        public Boolean Activo { get; set; }

        public MRolMenu()
        {

        }

    }
}
