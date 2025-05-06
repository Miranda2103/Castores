using CC.Context;
using CC.Interface;
using CC.Model;
using CC.Repository;

namespace CC.Logic
{
    public class LView
    {
        public readonly IView _interface;

        public LView(DbContext dbContext)
        {
            _interface = new RView(dbContext);
        }

        public async Task<List<MViewUsuario>> GetViewUsuarioAsync(Int32 option, MViewUsuario model)
        {
            return await _interface.GetViewUsuarioAsync(option, model);
        }

        public async Task<List<MViewRol>> GetViewRolAsync(Int32 option, MViewRol model)
        {
            return await _interface.GetViewRolAsync(option, model);
        }

        public async Task<List<MViewMenu>> GetViewMenuAsync(Int32 option, MViewMenu model)
        {
            return await _interface.GetViewMenuAsync(option, model);
        }

        public async Task<List<MViewRolMenu>> GetViewRolMenuAsync(Int32 option, MViewRolMenu model)
        {
            return await _interface.GetViewRolMenuAsync(option, model);
        }

        public async Task<List<MViewSubMenu>> GetViewSubMenuAsync(Int32 option, MViewSubMenu model)
        {
            return await _interface.GetViewSubMenuAsync(option, model);
        }

        public async Task<List<MViewRolSubMenu>> GetViewRolSubMenuAsync(Int32 option, MViewRolSubMenu model)
        {
            return await _interface.GetViewRolSubMenuAsync(option, model);
        }

        public async Task<List<MViewProductoEntrada>> GetViewProductoEntradaAsync(Int32 option, MViewProductoEntrada model)
        {
            return await _interface.GetViewProductoEntradaAsync(option, model);
        }

        public async Task<List<MViewProductoSalida>> GetViewProductoSalidaAsync(Int32 option, MViewProductoSalida model)
        {
            return await _interface.GetViewProductoSalidaAsync(option, model);
        }

        public async Task<List<MViewProductoHistorial>> GetViewProductoHistorialAsync(Int32 option, MViewProductoHistorial model)
        {
            return await _interface.GetViewProductoHistorialAsync(option, model);
        }
    }
}
