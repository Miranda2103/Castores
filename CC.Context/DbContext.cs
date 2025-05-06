using CC.Model;
using Microsoft.EntityFrameworkCore;

namespace CC.Context
{
    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbContext(DbContextOptions<DbContext> dbContextOptions) : base(dbContextOptions) { }


        public DbSet<MUsuario> Usuario { get; set; }
        public DbSet<MRol> Rol { get; set; }
        public DbSet<MMenu> Menu { get; set; }
        public DbSet<MRolMenu> RolMenu { get; set; }
        public DbSet<MSubMenu> SubMenu { get; set; }
        public DbSet<MRolSubMenu> RolSubMenu { get; set; }
        public DbSet<MProductoEntrada> ProductoEntrada { get; set; }
        public DbSet<MProductoSalida> ProductoSalida { get; set; }


        public DbSet<MViewUsuario> ViewUsuario { get; set; }
        public DbSet<MViewRol> ViewRol { get; set; }
        public DbSet<MViewMenu> ViewMenu { get; set; }
        public DbSet<MViewRolMenu> ViewRolMenu { get; set; }
        public DbSet<MViewSubMenu> ViewSubMenu { get; set; }
        public DbSet<MViewRolSubMenu> ViewRolSubMenu { get; set; }
        public DbSet<MViewProductoEntrada> ViewProductoEntrada { get; set; }
        public DbSet<MViewProductoSalida> ViewProductoSalida { get; set; }
        public DbSet<MViewProductoHistorial> ViewProductoHistorial { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MViewUsuario>(r =>
            {
                r.HasNoKey();
                r.ToView("vwUsuario");
            });

            modelBuilder.Entity<MViewRol>(r =>
            {
                r.HasNoKey();
                r.ToView("vwRol");
            });

            modelBuilder.Entity<MViewMenu>(r =>
            {
                r.HasNoKey();
                r.ToView("vwMenu");
            });

            modelBuilder.Entity<MViewRolMenu>(r =>
            {
                r.HasNoKey();
                r.ToView("vwRolMenu");
            });

            modelBuilder.Entity<MViewSubMenu>(r =>
            {
                r.HasNoKey();
                r.ToView("vwSubMenu");
            });

            modelBuilder.Entity<MViewRolSubMenu>(r =>
            {
                r.HasNoKey();
                r.ToView("vwRolSubMenu");
            });

            modelBuilder.Entity<MViewProductoEntrada>(r =>
            {
                r.HasNoKey();
                r.ToView("vwProductoEntrada");
            });

            modelBuilder.Entity<MViewProductoSalida>(r =>
            {
                r.HasNoKey();
                r.ToView("vwProductoSalida");
            });

            modelBuilder.Entity<MViewProductoHistorial>(r =>
            {
                r.HasNoKey();
                r.ToView("vwProductoHistorial");
            });

        }

    }
}
