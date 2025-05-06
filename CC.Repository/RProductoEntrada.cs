using CC.Function;
using CC.Interface;
using CC.Model;
using Microsoft.EntityFrameworkCore;

namespace CC.Repository
{
    public class RProductoEntrada : IProductoEntrada
    {
        private readonly Context.DbContext _dbContext;

        public RProductoEntrada(Context.DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MProductoEntrada>> GetAsync(Int32 option, MProductoEntrada model)
        {
            return option switch
            {
                1 => await _dbContext.ProductoEntrada.OrderBy(r => r.Producto).ToListAsync(),
                2 => await _dbContext.ProductoEntrada.Where(r => r.Id == model.Id).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<Int64> PostAsync(MProductoEntrada model)
        {
            model.IdUsuarioInserta = model.IdUsuarioInserta;
            model.FechaInserta = DateTime.Now;
            model.IdUsuarioActualiza = 0;
            model.FechaActualiza = new DateTime(1900, 1, 1);
            model.Activo = true;

            await _dbContext.ProductoEntrada.AddAsync(model);
            await _dbContext.SaveChangesAsync();

            return model.Id;
        }

        public async Task<Boolean> PutAsync(Int32 option, MProductoEntrada model)
        {
            List<MProductoEntrada> lm;

            switch (option)
            {
                case 1:
                    lm = await GetAsync(option: 2, model);

                    foreach (MProductoEntrada _model in lm)
                    {
                        _model.Producto = model.Producto;
                        _model.Cantidad = model.Cantidad;

                        _model.IdUsuarioActualiza = model.IdUsuarioActualiza;
                        _model.FechaActualiza = DateTime.Now;

                        await _dbContext.SaveChangesAsync();
                    }
                    break;
            }

            return true;
        }

        public async Task<Boolean> DeleteAsync(Int32 option, List<MProductoEntrada> model)
        {
            List<MProductoEntrada> lm;

            foreach (MProductoEntrada m in model)
            {
                switch (option)
                {
                    case 1:
                        lm = await GetAsync(option: 2, m);

                        foreach (MProductoEntrada _model in lm)
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
