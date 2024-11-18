public class InputCreateAccount
{
    public string name {get;}
    public string username {get;}
    public string email {get;}
    public string password {get;}
    public InputCreateAccount(string name,string username,string email,string password){
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}