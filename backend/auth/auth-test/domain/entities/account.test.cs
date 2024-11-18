public class AccountTest
{
    public AccountTest() { }

    [Fact(DisplayName = "Should create valid Account")]
    public void ShouldCreateValidAccount()
    {
        Name name = new Name("teste");
        Username username = new Username("teste@");
        Email email = new Email("teste@teste.com");
        Password password = new Password("1122@xxX");
        Account accountObj = new Account(name,username,email,password,"fake salt");
        Assert.Equal("teste", accountObj.name.value);
        Assert.Equal("teste@", accountObj.username.value);
        Assert.Equal("teste@teste.com", accountObj.email.value);
        Assert.Equal("1122@xxX",accountObj.password.value);
    }
}