using CC.Context;
using CC.Interface;
using CC.Model;
using CC.Repository;

namespace CC.Logic
{
    public class LProductoSalida
    {
        public readonly IProductoSalida _interface;
        public MResponse _response;

        public LProductoSalida(DbContext dbContext)
        {
            _interface = new RProductoSalida(dbContext);
            _response = new MResponse();
        }

        public async Task<List<MProductoSalida>> GetAsync(Int32 option, MProductoSalida model)
        {
            return await _interface.GetAsync(option, model);
        }

        public async Task<Int64> PostAsync(MProductoSalida model)
        {
            return await _interface.PostAsync(model);
        }

        public async Task<Boolean> PutAsync(Int32 option, MProductoSalida model)
        {
            return await _interface.PutAsync(option, model);
        }

        public async Task<Boolean> DeleteAsync(Int32 option, List<MProductoSalida> model)
        {
            return await _interface.DeleteAsync(option,model);
        }

    }
}
