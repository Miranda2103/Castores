using CC.Model;

namespace CC.Interface
{
    public interface IProductoEntrada
    {
        Task<List<MProductoEntrada>> GetAsync(Int32 option, MProductoEntrada model);
        Task<Int64> PostAsync(MProductoEntrada model);
        Task<Boolean> PutAsync(Int32 option, MProductoEntrada model);
        Task<Boolean> DeleteAsync(Int32 option, List<MProductoEntrada> model);
    }
}
