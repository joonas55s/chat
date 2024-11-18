public class CreateAccount : UseCase<InputCreateAccount, object>
{
    private UsersRepository repository;
    private HashPassword hashPassword;
    public CreateAccount(UsersRepository repository, HashPassword hashPassword)
    {
        this.repository = repository;
        this.hashPassword = hashPassword;
    }

    public async Task<object> Handle(InputCreateAccount input)
    {
        Name name = new Name(input.name);
        Username username = new Username(input.username);
        Email email = new Email(input.email);
        Password password = new Password(input.password);
        var existisEmail = await this.repository.FindOne(input.email);
        if(existisEmail != null) throw new ArgumentException("Email is already registered, please try another one");
        var existisUsername = await this.repository.FindOneByUsername(input.username);
        if(existisUsername != null) throw new ArgumentException("Username is already registered, please try another one");
        string salt = this.hashPassword.GenerateSalt(); 
        string hashedPassword = this.hashPassword.Hash(password.value,salt);
        Password encriptyPassword = new Password(hashedPassword);
        Account account = new Account(name, username, email, encriptyPassword, salt);
        await this.repository.Create(account);
        return null;
    }

}