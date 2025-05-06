using CC.Context;
using CC.Function;
using CC.Interface;
using CC.Model;
using Microsoft.EntityFrameworkCore;

namespace CC.Repository
{
    public class RRolMenu : IRolMenu
    {
        private readonly Context.DbContext _dbContext;

        public RRolMenu(Context.DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MRolMenu>> GetAsync(Int32 option, MRolMenu model)
        {
            return option switch
            {
                1 => await _dbContext.RolMenu.Where(r => r.Activo == true && r.IdRol == model.IdRol).ToListAsync(),
                2 => await _dbContext.RolMenu.Where(r => r.Activo == true && r.IdRol == model.IdRol).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<Boolean> PostAsync(List<MRolMenu> model)
        {
            foreach (MRolMenu m in model)
            {
                m.IdUsuarioInserta = m.IdUsuarioInserta;
                m.FechaInserta = DateTime.Now;
                m.IdUsuarioActualiza = 0;
                m.FechaActualiza = new DateTime(1900, 1, 1);
                m.Activo = true;

                await _dbContext.RolMenu.AddAsync(m);
                await _dbContext.SaveChangesAsync();
            }

            return true;
        }

        public async Task<Boolean> PutAsync(Int32 option, MRolMenu model)
        {
            List<MRolMenu> lm = await GetAsync(option: 2, model);

            if (lm.Count >= 1)
            {
                MRolMenu _model = lm.First();

                switch (option)
                {
                    case 1:
                        _model.IdRol = model.IdRol;
                        _model.IdMenu = model.IdMenu;
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

        public async Task<Boolean> DeleteAsync(MRolMenu model)
        {
            Int32 count = 0;

            List<MRolMenu> lm = await GetAsync(option: 2, model);

            foreach (MRolMenu _model in lm)
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
