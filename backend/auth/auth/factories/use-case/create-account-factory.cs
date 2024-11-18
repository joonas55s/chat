public class CreateAccountFactory
{
    public CreateAccount crateAccount {get;}
    public CreateAccountFactory(DataContext dbcontext){
        AccountRepositoryAdpterEntityFramework repository = new AccountRepositoryAdpterEntityFramework(dbcontext);
        HashPassword hashPassword = new HashPasswordBcryptAdpter();
        this.crateAccount = new CreateAccount(repository, hashPassword);
    }
}