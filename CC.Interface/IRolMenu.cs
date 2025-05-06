using CC.Model;

namespace CC.Interface
{
    public interface IRolMenu
    {
        Task<List<MRolMenu>> GetAsync(Int32 option, MRolMenu model);
        Task<Boolean> PostAsync(List<MRolMenu> model);
        Task<Boolean> PutAsync(Int32 option, MRolMenu model);
        Task<Boolean> DeleteAsync(MRolMenu model);
    }
}
