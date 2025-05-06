using CC.Context;
using CC.Function;
using CC.Interface;
using CC.Model;
using CC.Repository;

namespace CC.Logic
{
    public class LRolMenu
    {
        public readonly IRolMenu _interface;
        public MResponse _response;

        public LRolMenu(DbContext dbContext)
        {
            _interface = new RRolMenu(dbContext);
            _response = new MResponse();
        }

        public async Task<List<MRolMenu>> GetAsync(Int32 option, MRolMenu model)
        {
            return await _interface.GetAsync(option, model);
        }

        public async Task<Boolean> PostAsync(List<MRolMenu> model)
        {
            return await _interface.PostAsync(model);
        }

        public async Task<Boolean> PutAsync(Int32 option, MRolMenu model)
        {
            return await _interface.PutAsync(option, model);
        }

        public async Task<Boolean> DeleteAsync(MRolMenu model)
        {
            return await _interface.DeleteAsync(model);
        }

    }
}
