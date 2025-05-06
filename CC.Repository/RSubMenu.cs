using CC.Context;
using CC.Interface;
using CC.Model;
using Microsoft.EntityFrameworkCore;

namespace CC.Repository
{
    public class RSubMenu : ISubMenu
    {

        private readonly Context.DbContext _dbContext;

        public RSubMenu(Context.DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MSubMenu>> GetAsync(Int32 option, MSubMenu model)
        {
            return option switch
            {
                1 => await _dbContext.SubMenu.Where(r => r.Activo == true).OrderBy(r => r.Orden).ToListAsync(),
                2 => await _dbContext.SubMenu.Where(r => r.Activo == true && r.Id == model.Id).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<Boolean> PostAsync(MSubMenu model)
        {
            model.IdUsuarioInserta = model.IdUsuarioInserta;
            model.FechaInserta = DateTime.Now;
            model.IdUsuarioActualiza = 0;
            model.FechaActualiza = new DateTime(1900, 1, 1);
            model.Activo = true;

            await _dbContext.SubMenu.AddAsync(model);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<Boolean> PutAsync(Int32 option, MSubMenu model)
        {
            List<MSubMenu> lm = await GetAsync(option: 2, model);

            if (lm.Count >= 1)
            {
                MSubMenu _model = lm.First();

                switch (option)
                {
                    case 1:
                        _model.SubMenu = model.SubMenu;
                        _model.Orden = model.Orden;
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

        public async Task<Boolean> DeleteAsync(List<MSubMenu> model)
        {
            Int32 count = 0;

            foreach (MSubMenu m in model)
            {
                List<MSubMenu> lm = await GetAsync(option: 2, m);

                if (lm.Count >= 1)
                {
                    MSubMenu _model = lm.First();

                    _model.Activo = false;
                    _model.IdUsuarioActualiza = m.IdUsuarioActualiza;
                    _model.FechaActualiza = DateTime.Now;

                    await _dbContext.SaveChangesAsync();
                    count += 1;
                }
            }

            if (count == model.Count)
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
