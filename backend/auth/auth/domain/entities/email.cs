using System.Text.RegularExpressions;
public class Email {
    public string value {get;}
    public Email(string value){
        if(!this.validade(value)) throw new ArgumentException("Invalid email");
        this.value = value;
    }

    private bool validade(string value){
        string regexexpression = "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$";
        Regex regex = new Regex(regexexpression);
        return regex.IsMatch(value);
    }
}