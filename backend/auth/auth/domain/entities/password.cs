using System.Text.RegularExpressions;
public class Password {
    public string value {get;}
    public Password(string value){
        if (!this.ValidLength(value))throw new ArgumentException("Invalid length, password must contain at least 6 characters");
        if (!ExistSpecialCharacter(value)) throw new ArgumentException("Password must contain at least one special character");
        if (!ContainACapitalLetter(value)) throw new ArgumentException("Must contain a capital letter");
        if (!ContainALowercaseLetter(value)) throw new ArgumentException("Must contain a lowercase letter");
        if (!ContainANumber(value)) throw new ArgumentException("Must contain numbers");
        this.value = value;
    }


    private bool ValidLength(string value) {
        if (value.Length < 6) return false;
        return true;
    }

    private bool ExistSpecialCharacter(string value) {
        string regexExpression = @".*[@!#$%^&*()/\\]";
        Regex regex = new Regex(regexExpression);
        return regex.IsMatch(value);
    }

    private bool ContainACapitalLetter(string value) {
        string regexexpression = "[A-Z]";
        Regex regex = new Regex(regexexpression);
        return regex.IsMatch(value);

    }

    private bool ContainALowercaseLetter(string value) {
        string regexexpression = "[a-z]";
        Regex regex = new Regex(regexexpression);
        return regex.IsMatch(value);
    }

    private bool ContainANumber(string value) {
        string regexexpression = @"[\d]";
        Regex regex = new Regex(regexexpression);
        return regex.IsMatch(value);
    }
}