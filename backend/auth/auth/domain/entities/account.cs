public class Account {
    public Name name {get;}
    public Username username {get;}
    public Email email {get;}
    public Password password {get;}

    public string? salt {get;}
    public Account(Name name,Username username,Email email,Password password,string salt){
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.salt = salt;
    }
}