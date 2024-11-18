public interface TokenManager{
    string Sign(Account payload);
    bool verify(string token);
}