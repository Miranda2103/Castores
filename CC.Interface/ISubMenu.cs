using CC.Model;

namespace CC.Interface
{
    public interface ISubMenu
    {
        Task<List<MSubMenu>> GetAsync(Int32 option, MSubMenu model);
        Task<Boolean> PostAsync(MSubMenu model);
        Task<Boolean> PutAsync(Int32 option, MSubMenu model);
        Task<Boolean> DeleteAsync(List<MSubMenu> model);
    }
}
