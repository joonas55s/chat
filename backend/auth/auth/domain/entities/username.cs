public class Username
{
    public string value {get;}
    public Username(string value){
        if(!this.isValidLength(value)) throw new ArgumentException("Username must contain at least 4 characters");
        this.value = value;
    }

    private bool isValidLength(string value) {
        if (value.Length < 4) return false;
        return true;
    }
}