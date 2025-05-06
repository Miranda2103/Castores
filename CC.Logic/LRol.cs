using CC.Context;
using CC.Interface;
using CC.Model;
using CC.Repository;

namespace CC.Logic
{
    public class LRol
    {
        public readonly IRol _interface;
        public MResponse _response;

        public LRol(DbContext dbContext)
        {
            _interface = new RRol(dbContext);
            _response = new MResponse();
        }

        public async Task<List<MRol>> GetAsync(Int32 option, MRol model)
        {
            return await _interface.GetAsync(option, model);
        }

        public async Task<Boolean> PostAsync(MRol model)
        {
            return await _interface.PostAsync(model);
        }

        public async Task<Boolean> PutAsync(Int32 option, MRol model)
        {
            return await _interface.PutAsync(option,model);
        }

        public async Task<Boolean> DeleteAsync(List<MRol> model)
        {
            return await _interface.DeleteAsync(model);
        }

    }
}
