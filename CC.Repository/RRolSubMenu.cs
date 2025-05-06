using CC.Context;
using CC.Function;
using CC.Interface;
using CC.Model;
using Microsoft.EntityFrameworkCore;

namespace CC.Repository
{
    public class RRolSubMenu : IRolSubMenu
    {
        private readonly Context.DbContext _dbContext;

        public RRolSubMenu(Context.DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MRolSubMenu>> GetAsync(Int32 option, MRolSubMenu model)
        {
            return option switch
            {
                1 => await _dbContext.RolSubMenu.Where(r => r.Activo == true && r.IdRol == model.IdRol).ToListAsync(),
                2 => await _dbContext.RolSubMenu.Where(r => r.Activo == true && r.IdRol == model.IdRol && r.IdMenu == model.IdMenu).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<Boolean> PostAsync(List<MRolSubMenu> model)
        {
            foreach (MRolSubMenu m in model)
            {
                m.IdUsuarioInserta = m.IdUsuarioInserta;
                m.FechaInserta = DateTime.Now;
                m.IdUsuarioActualiza = 0;
                m.FechaActualiza = new DateTime(1900, 1, 1);
                m.Activo = true;

                await _dbContext.RolSubMenu.AddAsync(m);
                await _dbContext.SaveChangesAsync();
            }

            return true;
        }

        public async Task<Boolean> PutAsync(Int32 option, MRolSubMenu model)
        {
            List<MRolSubMenu> lm = await GetAsync(option: 2, model);

            if (lm.Count >= 1)
            {
                MRolSubMenu _model = lm.First();

                switch (option)
                {
                    case 1:
                        _model.IdRol = model.IdRol;
                        _model.IdSubMenu = model.IdSubMenu;
                        break;
                }

                _model.IdUsuarioActualiza = model.IdUsuarioActualiza;
                _model.FechaActualiza = DateTime.Now;

                await _dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<Boolean> DeleteAsync(MRolSubMenu model)
        {
            Int32 count = 0;

            List<MRolSubMenu> lm = await GetAsync(option: 2, model);

            foreach (MRolSubMenu _model in lm)
            {
                _model.Activo = false;
                _model.IdUsuarioActualiza = model.IdUsuarioActualiza;
                _model.FechaActualiza = DateTime.Now;

                await _dbContext.SaveChangesAsync();
                count += 1;
            }

            if (count == lm.Count)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
