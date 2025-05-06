using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CC.Model
{
    [DisplayName("Menu")]
    [Table("Menu", Schema = "dbo")]
    public class MMenu
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 Id { get; set; }
        
        [StringLength(50)]
        public String? Menu { get; set; }
        
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

        public MMenu()
        {
            Menu = "";
            Ruta = "";
            Icono = "";
        }


    }
}
