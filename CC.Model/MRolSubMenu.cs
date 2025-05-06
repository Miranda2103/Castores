using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace CC.Model
{
    [DisplayName("RolSubMenu")]
    [Table("RolSubMenu", Schema = "dbo")]
    public class MRolSubMenu
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 Id { get; set; }

        public Int64 IdRol { get; set; }

        public Int64 IdMenu { get; set; }

        public Int64 IdSubMenu { get; set; }

        public Int64 IdUsuarioInserta { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime FechaInserta { get; set; }
        
        public Int64 IdUsuarioActualiza { get; set; }

        public DateTime FechaActualiza { get; set; }

        public Boolean Activo { get; set; }

        public MRolSubMenu()
        {

        }

    }
}
