using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CC.Model
{
    [DisplayName("ProductoEntrada")]
    [Table("ProductoEntrada", Schema = "dbo")]
    public class MProductoEntrada
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 Id { get; set; }

        [StringLength(50)]
        public String Producto { get; set; }

        public Int32 Cantidad { get; set; }

        public Int64 IdUsuarioInserta { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime FechaInserta { get; set; }
        
        public Int64 IdUsuarioActualiza { get; set; }

        public DateTime FechaActualiza { get; set; }

        public Boolean Activo { get; set; }

        public MProductoEntrada()
        {
            Producto = "";
        }

    }
}
