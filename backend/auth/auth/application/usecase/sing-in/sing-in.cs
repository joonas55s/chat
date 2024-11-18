public class SingIn : UseCase<InputSingIn, OutputSingIn>
{
    private UsersRepository repository;
    private HashPassword hashPassword;
    private TokenManager tokenManager;

    public SingIn(UsersRepository repository, HashPassword hashPassword,TokenManager tokenManager){
        this.repository = repository;
        this.hashPassword = hashPassword;
        this.tokenManager = tokenManager;
    }

    public async Task<OutputSingIn> Handle(InputSingIn input)
    {
        Account account = await this.repository.FindOne(input.email);
        if(account == null) throw new ArgumentException("Account not found");
        string hashedPassword = this.hashPassword.Hash(input.password,account.salt);
        bool isValidPassword = this.hashPassword.Verify(input.password,account.password.value);
        if(!isValidPassword) throw new ArgumentException("Account not found");
        string token = this.tokenManager.Sign(account);
        OutputSingIn output = new OutputSingIn(account.username.value,account.name.value,account.email.value,account.salt);
        return output;
    }
}