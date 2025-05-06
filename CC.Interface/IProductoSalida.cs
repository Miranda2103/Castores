using CC.Model;

namespace CC.Interface
{
    public interface IProductoSalida
    {
        Task<List<MProductoSalida>> GetAsync(Int32 option, MProductoSalida model);
        Task<Int64> PostAsync(MProductoSalida model);
        Task<Boolean> PutAsync(Int32 option, MProductoSalida model);
        Task<Boolean> DeleteAsync(Int32 option, List<MProductoSalida> model);
    }
}
