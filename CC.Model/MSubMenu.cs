using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CC.Model
{
    [DisplayName("SubMenu")]
    [Table("SubMenu", Schema = "dbo")]
    public class MSubMenu
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 Id { get; set; }

        public Int64 IdMenu { get; set; }

        [StringLength(50)]
        public String? SubMenu { get; set; }
        
        [StringLength(50)]
        public String? Ruta { get; set; }
        
        [StringLength(50)]
        public String? Icono { get; set; }
        
        public Int32 Orden { get; set; }

        public Int64 IdUsuarioInserta { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime FechaInserta { get; set; }

        public Int64 IdUsuarioActualiza { get; set; }

        public DateTime FechaActualiza { get; set; }

        public Boolean Activo { get; set; }

        public MSubMenu()
        {
            SubMenu = "";
            Ruta = "";
            Icono = "";
        }


    }
}
