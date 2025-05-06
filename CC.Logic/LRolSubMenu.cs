using CC.Context;
using CC.Function;
using CC.Interface;
using CC.Model;
using CC.Repository;

namespace CC.Logic
{
    public class LRolSubMenu
    {
        public readonly IRolSubMenu _interface;
        public MResponse _response;

        public LRolSubMenu(DbContext dbContext)
        {
            _interface = new RRolSubMenu(dbContext);
            _response = new MResponse();
        }

        public async Task<List<MRolSubMenu>> GetAsync(Int32 option, MRolSubMenu model)
        {
            return await _interface.GetAsync(option, model);
        }

        public async Task<Boolean> PostAsync(List<MRolSubMenu> model)
        {
            return await _interface.PostAsync(model);
        }

        public async Task<Boolean> PutAsync(Int32 option, MRolSubMenu model)
        {
            return await _interface.PutAsync(option, model);
        }

        public async Task<Boolean> DeleteAsync(MRolSubMenu model)
        {
            return await _interface.DeleteAsync(model);
        }

    }
}
