using System.Text.RegularExpressions;

public class Name
{
    public string value {get;}

    public Name(string value){
        if (!this.isValidLength(value)) throw new ArgumentException("Name must contain at least 1 character and a maximum of 60");
        if (!this.isValidCharacters(value)) throw new ArgumentException("Name must not contain numbers and special characters");
        this.value = value;
    }
    private bool isValidLength(string value) {
        if (string.IsNullOrEmpty(value) ||value.Length < 2 || value.Length >= 60) return false;
        return true;
    }

    private bool isValidCharacters(string value){
        string regexExpression = @"^[A-Za-zÀ-ÿ\s'-]+$";
        Regex regex = new Regex(regexExpression);
        return regex.IsMatch(value);
    }
}