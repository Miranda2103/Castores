using CC.Context;
using CC.Interface;
using CC.Model;
using CC.Repository;

namespace CC.Logic
{
    public class LMenu
    {
        public readonly IMenu _interface;
        public MResponse _response;

        public LMenu(DbContext dbContext)
        {
            _interface = new RMenu(dbContext);
            _response = new MResponse();
        }

        public async Task<List<MMenu>> GetAsync(Int32 option, MMenu model)
        {
            return await _interface.GetAsync(option, model);
        }

        public async Task<Boolean> PostAsync(MMenu model)
        {
            return await _interface.PostAsync(model);
        }

        public async Task<Boolean> PutAsync(Int32 option, MMenu model)
        {
            return await _interface.PutAsync(option, model);
        }

        public async Task<Boolean> DeleteAsync(List<MMenu> model)
        {
            return await _interface.DeleteAsync(model);
        }

    }
}
