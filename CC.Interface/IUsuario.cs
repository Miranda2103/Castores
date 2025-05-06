using CC.Model;

namespace CC.Interface
{
    public interface IUsuario
    {
        Task<List<MUsuario>> GetAsync(Int32 option, MUsuario model);
        Task<Int64> PostAsync(MUsuario model);
        Task<Boolean> PutAsync(Int32 option, MUsuario model);
        Task<Boolean> DeleteAsync(Int32 option, List<MUsuario> model);
    }
}
