public class PasswordTest
{

    public PasswordTest() { }
    [Fact(DisplayName = "Should create valid password")]
    public void ShouldCreateValidPassword()
    {
        string password = "123@Mudar";
        Password passwordObj = new Password(password);
        Assert.Equal(password,passwordObj.value);
    }

    [Fact(DisplayName = "Should not create password with less than 6 characters")]
    public void ShouldNotCreatePasswordWithLessThan6Characters()
    {
        string password = "123@M";
        var exception = Assert.Throws<ArgumentException>(() => new Password(password));
        Assert.Equal("Invalid length, password must contain at least 6 characters", exception.Message);
    }

    [Fact(DisplayName = "Should not create password if no special characters are provided")]
    public void ShouldNotCreatePasswordIfNoSpecialCharactersAreProvided()
    {
        string password = "123Mudar";
        var exception = Assert.Throws<ArgumentException>(() => new Password(password));
        Assert.Equal("Password must contain at least one special character", exception.Message);
    }

    [Fact(DisplayName = "Should not create password if not contain a capital letter")]
    public void ShouldNotCreateInvalidIfNotContainACapitalLetter()
    {
        string password = "123@mudar";
        var exception = Assert.Throws<ArgumentException>(() => new Password(password));
        Assert.Equal("Must contain a capital letter", exception.Message);
    }

    [Fact(DisplayName = "Should not create invalid password if not contain a lowercase letter")]
    public void ShouldNotCreatePasswordIfNotContainALowercaseLetter()
    {
        string password = "123@MUDAR";
        var exception = Assert.Throws<ArgumentException>(() => new Password(password));
        Assert.Equal("Must contain a lowercase letter", exception.Message);
    }


    [Fact(DisplayName = "Should not create password if not contain numbers")]
    public void ShouldNotCreatePasswordIfNotContainNumbers()
    {
        string password = "aaa@MUDAR";
        var exception = Assert.Throws<ArgumentException>(() => new Password(password));
        Assert.Equal("Must contain numbers", exception.Message);
    }

}