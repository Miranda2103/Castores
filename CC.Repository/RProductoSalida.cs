using CC.Function;
using CC.Interface;
using CC.Model;
using Microsoft.EntityFrameworkCore;

namespace CC.Repository
{
    public class RProductoSalida : IProductoSalida
    {
        private readonly Context.DbContext _dbContext;

        public RProductoSalida(Context.DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MProductoSalida>> GetAsync(Int32 option, MProductoSalida model)
        {
            return option switch
            {
                1 => await _dbContext.ProductoSalida.ToListAsync(),
                2 => await _dbContext.ProductoSalida.Where(r => r.Id == model.Id).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<Int64> PostAsync(MProductoSalida model)
        {
            model.IdUsuarioInserta = model.IdUsuarioInserta;
            model.FechaInserta = DateTime.Now;
            model.IdUsuarioActualiza = 0;
            model.FechaActualiza = new DateTime(1900, 1, 1);
            model.Activo = true;

            await _dbContext.ProductoSalida.AddAsync(model);
            await _dbContext.SaveChangesAsync();

            return model.Id;
        }

        public async Task<Boolean> PutAsync(Int32 option, MProductoSalida model)
        {
            List<MProductoSalida> lm;

            switch (option)
            {
                case 1:
                    lm = await GetAsync(option: 2, model);

                    foreach (MProductoSalida _model in lm)
                    {
                        _model.IdProducto = model.IdProducto;
                        _model.Cantidad = model.Cantidad;

                        _model.IdUsuarioActualiza = model.IdUsuarioActualiza;
                        _model.FechaActualiza = DateTime.Now;

                        await _dbContext.SaveChangesAsync();
                    }
                    break;
            }

            return true;
        }

        public async Task<Boolean> DeleteAsync(Int32 option, List<MProductoSalida> model)
        {
            List<MProductoSalida> lm;

            foreach (MProductoSalida m in model)
            {
                switch (option)
                {
                    case 1:
                        lm = await GetAsync(option: 2, m);

                        foreach (MProductoSalida _model in lm)
                        {
                            _model.Activo = m.Activo;
                            _model.IdUsuarioActualiza = m.IdUsuarioActualiza;
                            _model.FechaActualiza = DateTime.Now;

                            await _dbContext.SaveChangesAsync();
                        }
                        break;
                }
            }

            return true;
        }

    }
}
