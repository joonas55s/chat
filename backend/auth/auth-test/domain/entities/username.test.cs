public class UsernameTest
{
    public UsernameTest() { }

    [Fact(DisplayName = "Should create valid Username")]
    public void ShouldCreateValidUsername()
    {
        string username = "teste";
        Username usernameObj = new Username(username);
        Assert.Equal(username, usernameObj.value);
    }

    [Fact(DisplayName = "Should not create a password if the number of characters for less than 4")]
    public void ShouldNotCreateAPasswordIfTheNumberOfCharactersForLessThan4()
    {
        string username = "";
        var exception = Assert.Throws<ArgumentException>(() => new Username(username));
        Assert.Equal("Username must contain at least 4 characters", exception.Message);
    }
}