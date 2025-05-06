using CC.Model;

namespace CC.Interface
{
    public interface IMenu
    {
        Task<List<MMenu>> GetAsync(Int32 option, MMenu model);
        Task<Boolean> PostAsync(MMenu model);
        Task<Boolean> PutAsync(Int32 option, MMenu model);
        Task<Boolean> DeleteAsync(List<MMenu> model);
    }
}
