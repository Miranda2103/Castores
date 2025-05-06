namespace CC.Model
{
    public class MViewProductoHistorial
    {
        public String Producto { get; set; }
        public Int32 Cantidad { get; set; }
        public String Usuario { get; set; }
        public String Fecha { get; set; }
        public String Hora { get; set; }
        public String Tipo { get; set; }
        public Boolean Activo { get; set; }

        public MViewProductoHistorial()
        {
            Producto = String.Empty;
            Usuario = String.Empty;
            Fecha = String.Empty;
            Hora = String.Empty;
            Tipo = String.Empty;
        }

    }
}
