using CC.Context;
using CC.Interface;
using CC.Model;
using CC.Repository;

namespace CC.Logic
{
    public class LSubMenu
    {
        public readonly ISubMenu _interface;
        public MResponse _response;

        public LSubMenu(DbContext dbContext)
        {
            _interface = new RSubMenu(dbContext);
            _response = new MResponse();
        }

        public async Task<List<MSubMenu>> GetAsync(Int32 option, MSubMenu model)
        {
            return await _interface.GetAsync(option, model);
        }

        public async Task<Boolean> PostAsync(MSubMenu model)
        {
            return await _interface.PostAsync(model);
        }

        public async Task<Boolean> PutAsync(Int32 option, MSubMenu model)
        {
            return await _interface.PutAsync(option, model);
        }

        public async Task<Boolean> DeleteAsync(List<MSubMenu> model)
        {
            return await _interface.DeleteAsync(model);
        }

    }
}
