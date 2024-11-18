using Microsoft.EntityFrameworkCore;

public class CreateUserTest
{
    private DataContext dbcontext;
    public CreateUserTest()
    {
        var options = new DbContextOptionsBuilder<DataContext>()
                    .UseInMemoryDatabase(databaseName: "fakeDatabaseContext")
                    .Options;
        dbcontext = new DataContext(options);
    }

    private void clearAccounts(){
        var registros = dbcontext.Accounts.ToList();
        dbcontext.RemoveRange(registros);
        dbcontext.SaveChangesAsync();
    }

    private void AddAccounts(Accounts account){
        dbcontext.Add(account);
        dbcontext.SaveChangesAsync();
    }

    [Fact(DisplayName = "Should Create Account")]
    public async void ShouldCreateAccount()
    {
        HashPassword hashPassword = new HashPasswordBcryptAdpter();
        var options = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "YourDatabaseName")
            .Options;
        DataContext dbcontext = new DataContext(options);
        AccountRepositoryAdpterEntityFramework repository = new AccountRepositoryAdpterEntityFramework(dbcontext);
        CreateAccount crateuser = new CreateAccount(repository,hashPassword);
        InputCreateAccount input = new InputCreateAccount("fakeName","faleUsername","Fake@email.com","fakePass@123");
        var result = await crateuser.Handle(input);
        Assert.Null(result);
        clearAccounts();
    }

    [Fact(DisplayName = "Should Fail To Create An Account If The Email Is Already In Use")]
    public async void ShouldFailToCreateAnAccountIfTheEmailIsAlreadyInUse()
    {
        HashPassword hashPassword = new HashPasswordBcryptAdpter();
        var salt = new HashPasswordBcryptAdpter().GenerateSalt();
        AccountRepositoryAdpterEntityFramework repository = new AccountRepositoryAdpterEntityFramework(dbcontext);
        var account = new Accounts(){
            email = "fake@email.com",
            name = "fakename",
            password = "Fake@123",
            username = "fakeUsername",
            salt = salt
        };
        AddAccounts(account);
        CreateAccount crateuser = new CreateAccount(repository,hashPassword);
        InputCreateAccount input = new InputCreateAccount("fakeName","faleUsername","fake@email.com","fakePass@123");
        var exception = await Assert.ThrowsAsync<ArgumentException>(async () => await crateuser.Handle(input));
        Assert.Equal("Email is already registered, please try another one", exception.Message);
        clearAccounts();
    }


    [Fact(DisplayName = "Should Fail To Create An Account If The Username Is Already In Use")]
    public async void ShouldFailToCreateAnAccountIfTheUsernameIsAlreadyInUse()
    {
        HashPassword hashPassword = new HashPasswordBcryptAdpter();
        var salt = new HashPasswordBcryptAdpter().GenerateSalt();
        AccountRepositoryAdpterEntityFramework repository = new AccountRepositoryAdpterEntityFramework(dbcontext);
        var account = new Accounts(){
            email = "fxake@email.com",
            name = "fakename",
            password = "Fake@123",
            username = "fakeUsernameAx",
            salt = salt
        };
        AddAccounts(account);
        CreateAccount crateuser = new CreateAccount(repository,hashPassword);
        InputCreateAccount input = new InputCreateAccount("fakeNamex","fakeUsernameAx","fake123@email.com","fakePass@123");
        var exception = await Assert.ThrowsAsync<ArgumentException>(async () => await crateuser.Handle(input));
        Assert.Equal("Username is already registered, please try another one", exception.Message);
        clearAccounts();
    }

}