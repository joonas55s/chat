using Microsoft.EntityFrameworkCore;


public class DataContext: DbContext {
    public DbSet<Accounts> Accounts {get;set;}
    public DataContext(DbContextOptions<DataContext> options): base (options){

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new AccountsConfiguration());
    }

}