using CC.Context;
using CC.Interface;
using CC.Model;
using CC.Repository;

namespace CC.Logic
{
    public class LProductoEntrada
    {
        public readonly IProductoEntrada _interface;
        public MResponse _response;

        public LProductoEntrada(DbContext dbContext)
        {
            _interface = new RProductoEntrada(dbContext);
            _response = new MResponse();
        }

        public async Task<List<MProductoEntrada>> GetAsync(Int32 option, MProductoEntrada model)
        {
            return await _interface.GetAsync(option, model);
        }

        public async Task<Int64> PostAsync(MProductoEntrada model)
        {
            return await _interface.PostAsync(model);
        }

        public async Task<Boolean> PutAsync(Int32 option, MProductoEntrada model)
        {
            return await _interface.PutAsync(option, model);
        }

        public async Task<Boolean> DeleteAsync(Int32 option, List<MProductoEntrada> model)
        {
            return await _interface.DeleteAsync(option,model);
        }

    }
}
