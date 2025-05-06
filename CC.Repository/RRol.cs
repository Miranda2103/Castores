using CC.Context;
using CC.Interface;
using CC.Model;
using Microsoft.EntityFrameworkCore;

namespace CC.Repository
{
    public class RRol : IRol
    {
        private readonly Context.DbContext _dbContext;

        public RRol(Context.DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MRol>> GetAsync(Int32 option, MRol model)
        {
            return option switch
            {
                1 => await _dbContext.Rol.Where(r => r.Activo == true).OrderBy(r => r.Rol).ToListAsync(),
                2 => await _dbContext.Rol.Where(r => r.Activo == true && r.Id == model.Id).ToListAsync(),
                3 => await _dbContext.Rol.Where(r => r.Rol == model.Rol).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<Boolean> PostAsync(MRol model)
        {
            model.IdUsuarioInserta = model.IdUsuarioInserta;
            model.FechaInserta = DateTime.Now;
            model.IdUsuarioActualiza = 0;
            model.FechaActualiza = new DateTime(1900, 1, 1);
            model.Activo = true;

            await _dbContext.Rol.AddAsync(model);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<Boolean> PutAsync(Int32 option, MRol model)
        {
            List<MRol> lm = await GetAsync(option: 2, model);

            if (lm.Count >= 1)
            {
                MRol _model = lm.First();

                switch (option)
                {
                    case 1:
                        _model.Rol = model.Rol;
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

        public async Task<Boolean> DeleteAsync(List<MRol> model)
        {
            Int32 count = 0;

            foreach (MRol m in model)
            {
                List<MRol> lm = await GetAsync(option: 2, m);

                if (lm.Count >= 1)
                {
                    MRol _model = lm.First();
                    
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
