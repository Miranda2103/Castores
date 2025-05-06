using CC.Model;

namespace CC.Interface
{
    public interface IRol
    {
        Task<List<MRol>> GetAsync(Int32 option, MRol model);
        Task<Boolean> PostAsync(MRol model);
        Task<Boolean> PutAsync(Int32 option, MRol model);
        Task<Boolean> DeleteAsync(List<MRol> model);
    }
}
