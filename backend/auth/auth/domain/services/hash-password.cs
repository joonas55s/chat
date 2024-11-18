public interface HashPassword {
     string GenerateSalt();
     string Hash(string value,string salt);
     bool Verify(string passwordHash,string hash);
}