namespace CC.Model
{
    public class MViewProductoEntrada
    {
        public Int64 IdProducto { get; set; }
        public String Producto { get; set; }
        public Int32 Cantidad { get; set; }
        public String Fecha { get; set; }
        public Boolean Activo { get; set; }

        public MViewProductoEntrada()
        {
            Producto = String.Empty;
            Fecha = String.Empty;
        }

    }
}
