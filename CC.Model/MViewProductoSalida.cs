namespace CC.Model
{
    public class MViewProductoSalida
    {
        public Int64 IdProducto { get; set; }
        public String Producto { get; set; }
        public Int32 CantidadEntrada { get; set; }
        public Int32 CantidadSalida { get; set; }
        public Int32 Cantidad { get; set; }
        public String Fecha { get; set; }
        public Boolean Activo { get; set; }

        public MViewProductoSalida()
        {
            Producto = String.Empty;
            Fecha = String.Empty;
        }

    }
}
