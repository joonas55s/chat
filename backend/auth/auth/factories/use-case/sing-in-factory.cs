public class SingInFactory
{
    public SingIn singIn {get;}
    public SingInFactory(DataContext dbcontext){
        AccountRepositoryAdpterEntityFramework repository = new AccountRepositoryAdpterEntityFramework(dbcontext);
        HashPassword hashPassword = new HashPasswordBcryptAdpter();
        TokenManager tokenManager = new TokenManagerAdpter();
        this.singIn = new SingIn(repository, hashPassword,tokenManager);
    }
}