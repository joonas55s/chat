public class AccountRepositoryAdpterEntityFramework:UsersRepository
{   
    private DataContext dbcontext;
    public AccountRepositoryAdpterEntityFramework (DataContext dbcontext){
        this.dbcontext = dbcontext;
    }

    public async Task<bool> Create(Account account)
    {
        Accounts model = new Accounts(){
            username = account.username.value,
            name = account.name.value,
            email = account.email.value,
            password = account.password.value,
            salt = account.salt,
        };
       this.dbcontext.Accounts.Add(model);
       int affectedRows = await this.dbcontext.SaveChangesAsync();
       return affectedRows > 0;
    }

    public async Task<Account?> FindOne(string email)
    {
        var accountModel = this.dbcontext.Accounts.Where(e=> e.email == email).FirstOrDefault();
        if(accountModel == null) return null;
        Name name = new Name(accountModel.name);
        Username username = new Username(accountModel.username);
        Email accountEmail = new Email(accountModel.email);
        Password password = new Password(accountModel.password);
        Account account = new Account(name,username,accountEmail,password,accountModel.salt);
        return account;
    }

    public async Task<Account?> FindOneByUsername(string username)
    {
        var accountModel = this.dbcontext.Accounts.Where(e=> e.username == username).FirstOrDefault();
        if(accountModel == null) return null;
        Name name = new Name(accountModel.name);
        Username _username = new Username(accountModel.username);
        Email accountEmail = new Email(accountModel.email);
        Password password = new Password(accountModel.password);
        Account account = new Account(name,_username,accountEmail,password,accountModel.salt);
        return account;
    }
}