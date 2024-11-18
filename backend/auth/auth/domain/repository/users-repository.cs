public interface UsersRepository {
    Task<bool> Create(Account account);
    Task<Account?> FindOne(string email);
    Task<Account?> FindOneByUsername(string username);
}