using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace CC.Model
{
    [DisplayName("ProductoSalida")]
    [Table("ProductoSalida", Schema = "dbo")]
    public class MProductoSalida
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 Id { get; set; }

        public Int64 IdProducto { get; set; }

        public Int32 Cantidad { get; set; }

        public Int64 IdUsuarioInserta { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime FechaInserta { get; set; }
        
        public Int64 IdUsuarioActualiza { get; set; }

        public DateTime FechaActualiza { get; set; }

        public Boolean Activo { get; set; }

        public MProductoSalida()
        {
        }

    }
}
