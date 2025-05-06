using CC.Model;

namespace CC.Interface
{
    public interface IRolSubMenu
    {
        Task<List<MRolSubMenu>> GetAsync(Int32 option, MRolSubMenu model);
        Task<Boolean> PostAsync(List<MRolSubMenu> model);
        Task<Boolean> PutAsync(Int32 option, MRolSubMenu model);
        Task<Boolean> DeleteAsync(MRolSubMenu model);
    }
}
