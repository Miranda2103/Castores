using CC.Model;

namespace CC.Interface
{
    public interface IView
    {
        Task<List<MViewUsuario>> GetViewUsuarioAsync(Int32 option, MViewUsuario model);
        Task<List<MViewRol>> GetViewRolAsync(Int32 option, MViewRol model);
        Task<List<MViewMenu>> GetViewMenuAsync(Int32 option, MViewMenu model);
        Task<List<MViewRolMenu>> GetViewRolMenuAsync(Int32 option, MViewRolMenu model);
        Task<List<MViewSubMenu>> GetViewSubMenuAsync(Int32 option, MViewSubMenu model);
        Task<List<MViewRolSubMenu>> GetViewRolSubMenuAsync(Int32 option, MViewRolSubMenu model);
        Task<List<MViewProductoEntrada>> GetViewProductoEntradaAsync(Int32 option, MViewProductoEntrada model);
        Task<List<MViewProductoSalida>> GetViewProductoSalidaAsync(Int32 option, MViewProductoSalida model);
        Task<List<MViewProductoHistorial>> GetViewProductoHistorialAsync(Int32 option, MViewProductoHistorial model);
    }
}