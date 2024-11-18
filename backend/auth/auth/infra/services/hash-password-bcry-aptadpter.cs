

public class HashPasswordBcryptAdpter : HashPassword
{
    public string GenerateSalt()
    {
        return BCrypt.Net.BCrypt.GenerateSalt();
    }

    public string Hash(string value,string salt)
    {
       return BCrypt.Net.BCrypt.HashPassword(value, salt);
    }

    public bool Verify(string passwordHash, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(passwordHash, hash);
    }
}