using CC.Interface;
using CC.Model;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CC.Repository
{
    public class RView : IView
    {
        private readonly Context.DbContext _dbContext;

        public RView(Context.DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MViewUsuario>> GetViewUsuarioAsync(Int32 option, MViewUsuario model)
        {
            return option switch
            {
                1 => await _dbContext.ViewUsuario.OrderBy(r => r.Usuario).ToListAsync(),
                2 => await _dbContext.ViewUsuario.Where(r => r.IdUsuario == model.IdUsuario).ToListAsync(),
                3 => await _dbContext.ViewUsuario.Where(r => r.Usuario == model.Usuario && r.Contrasena == model.Contrasena).ToListAsync(),
                4 => await _dbContext.ViewUsuario.Where(r => r.IdRol == model.IdRol).OrderBy(r => r.Usuario).ToListAsync(),
                5 => await _dbContext.ViewUsuario.Where(r => r.IdRol == model.IdRol).OrderBy(r => r.NombreCompleto).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<List<MViewRol>> GetViewRolAsync(Int32 option, MViewRol model)
        {
            return option switch
            {
                1 => await _dbContext.ViewRol.Where(r => r.Activo == true).OrderBy(r => r.Rol).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<List<MViewMenu>> GetViewMenuAsync(Int32 option, MViewMenu model)
        {
            return option switch
            {
                1 => await _dbContext.ViewMenu.Where(r => r.Activo == true).OrderBy(r => r.Menu).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<List<MViewRolMenu>> GetViewRolMenuAsync(Int32 option, MViewRolMenu model)
        {
            return option switch
            {
                1 => await _dbContext.ViewRolMenu.Where(r => r.Activo == true && r.IdRol == model.IdRol).OrderBy(r => r.Orden).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<List<MViewSubMenu>> GetViewSubMenuAsync(Int32 option, MViewSubMenu model)
        {
            return option switch
            {
                1 => await _dbContext.ViewSubMenu.Where(r => r.Activo == true && r.IdMenu == model.IdMenu).OrderBy(r => r.SubMenu).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<List<MViewRolSubMenu>> GetViewRolSubMenuAsync(Int32 option, MViewRolSubMenu model)
        {
            return option switch
            {
                1 => await _dbContext.ViewRolSubMenu.Where(r => r.Activo == true && r.IdRol == model.IdRol).OrderBy(r => r.Orden).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<List<MViewProductoEntrada>> GetViewProductoEntradaAsync(Int32 option, MViewProductoEntrada model)
        {
            return option switch
            {
                1 => await _dbContext.ViewProductoEntrada.ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<List<MViewProductoSalida>> GetViewProductoSalidaAsync(Int32 option, MViewProductoSalida model)
        {
            return option switch
            {
                1 => await _dbContext.ViewProductoSalida.Where(r => r.Activo == true).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<List<MViewProductoHistorial>> GetViewProductoHistorialAsync(Int32 option, MViewProductoHistorial model)
        {
            return option switch
            {
                1 => await _dbContext.ViewProductoHistorial.Where(r => r.Activo == true).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

    }
}
