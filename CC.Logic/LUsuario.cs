using CC.Context;
using CC.Interface;
using CC.Model;
using CC.Repository;

namespace CC.Logic
{
    public class LUsuario
    {
        public readonly IUsuario _interface;
        public MResponse _response;

        public LUsuario(DbContext dbContext)
        {
            _interface = new RUsuario(dbContext);
            _response = new MResponse();
        }

        public async Task<List<MUsuario>> GetAsync(Int32 option, MUsuario model)
        {
            return await _interface.GetAsync(option, model);
        }

        public async Task<Int64> PostAsync(MUsuario model)
        {
            return await _interface.PostAsync(model);
        }

        public async Task<Boolean> PutAsync(Int32 option, MUsuario model)
        {
            return await _interface.PutAsync(option, model);
        }

        public async Task<Boolean> DeleteAsync(Int32 option, List<MUsuario> model)
        {
            return await _interface.DeleteAsync(option,model);
        }

    }
}
