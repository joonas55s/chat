public class OutputSingIn{
    public string username {get;}
    public string name {get;}
    public string email {get;}
    public string token {get;}

    public OutputSingIn(string username,string name,string email,string token){
        this.username=username;
        this.name=name;
        this.email=email;
        this.token=token;
    }
}