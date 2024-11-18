public class NameTest
{
    public NameTest() { }

    [Fact(DisplayName = "Should create valid Name")]
    public void ShouldCreateValidPassword()
    {
        string name = "Nome fake de tal";
        Name nameObj = new Name(name);
        Assert.Equal(name, nameObj.value);
    }

    [Fact(DisplayName = "Should not create a name with less than 2 characters")]
    public void ShouldNotCreateAnameWithLessThan2Characters()
    {
        string name = "j";
        var exception = Assert.Throws<ArgumentException>(() => new Name(name));
        Assert.Equal("Name must contain at least 1 character and a maximum of 60", exception.Message);
    }

    [Fact(DisplayName = "Should not create a name longer than 60 characters")]
    public void ShouldNotCreateANameLongerThan60Characters()
    {
        string name = "Seraphina Maximiliana Leopoldina Winthrop Beauregard Ophelia Kensington Montgomery Fitzwilliam jr";
        var exception = Assert.Throws<ArgumentException>(() => new Name(name));
        Assert.Equal("Name must contain at least 1 character and a maximum of 60", exception.Message);
    }

}