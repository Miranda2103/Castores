using CC.Function;
using CC.Interface;
using CC.Model;
using Microsoft.EntityFrameworkCore;

namespace CC.Repository
{
    public class RUsuario : IUsuario
    {
        private readonly Context.DbContext _dbContext;

        public RUsuario(Context.DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MUsuario>> GetAsync(Int32 option, MUsuario model)
        {
            return option switch
            {
                1 => await _dbContext.Usuario.Where(r => r.Activo == true).OrderBy(r => r.Usuario).ToListAsync(),
                2 => await _dbContext.Usuario.Where(r => r.Id == model.Id).ToListAsync(),
                3 => await _dbContext.Usuario.Where(r => r.Usuario == model.Usuario).ToListAsync(),
                4 => await _dbContext.Usuario.Where(r => r.Activo == true && r.Usuario == model.Usuario && r.Contrasena == model.Contrasena).ToListAsync(),
                _ => throw new NotImplementedException()
            };
        }

        public async Task<Int64> PostAsync(MUsuario model)
        {
            model.Contrasena = Encryption.EncryptSHA1(model.Contrasena);
            model.IdUsuarioInserta = model.IdUsuarioInserta;
            model.FechaInserta = DateTime.Now;
            model.IdUsuarioActualiza = 0;
            model.FechaActualiza = new DateTime(1900, 1, 1);
            model.Activo = true;

            await _dbContext.Usuario.AddAsync(model);
            await _dbContext.SaveChangesAsync();

            return model.Id;
        }

        public async Task<Boolean> PutAsync(Int32 option, MUsuario model)
        {
            List<MUsuario> lm;

            switch (option)
            {
                case 1:
                    lm = await GetAsync(option: 2, model);

                    foreach (MUsuario _model in lm)
                    {
                        if (model.Contrasena.Length <= 10)
                        {
                            _model.Contrasena = Encryption.EncryptSHA1(model.Contrasena);
                            _model.CambiaContrasena = false;
                        }

                        _model.Nombre = model.Nombre;
                        _model.ApellidoPaterno = model.ApellidoPaterno;
                        _model.ApellidoMaterno = model.ApellidoMaterno;
                        _model.IdRol = model.IdRol;

                        _model.IdUsuarioActualiza = model.IdUsuarioActualiza;
                        _model.FechaActualiza = DateTime.Now;

                        await _dbContext.SaveChangesAsync();
                    }
                    break;
                case 2:
                    lm = await GetAsync(option: 2, model);

                    foreach (MUsuario _model in lm)
                    {
                        _model.Contrasena = Encryption.EncryptSHA1(model.Contrasena);
                        _model.CambiaContrasena = true;

                        _model.IdUsuarioActualiza = model.IdUsuarioActualiza;
                        _model.FechaActualiza = DateTime.Now;

                        await _dbContext.SaveChangesAsync();
                    }
                    break;
            }

            return true;
        }

        public async Task<Boolean> DeleteAsync(Int32 option, List<MUsuario> model)
        {
            List<MUsuario> lm;

            foreach (MUsuario m in model)
            {
                switch (option)
                {
                    case 1:
                        lm = await GetAsync(option: 2, m);

                        foreach (MUsuario _model in lm)
                        {
                            _model.Activo = m.Activo;
                            _model.IdUsuarioActualiza = m.IdUsuarioActualiza;
                            _model.FechaActualiza = DateTime.Now;

                            await _dbContext.SaveChangesAsync();
                        }
                        break;
                }
            }

            return true;
        }

    }
}
