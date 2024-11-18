using System.Net;
using System.Text;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;


public class SignInControllerTest : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    private DataContext _dbContext;
    private readonly IServiceScope _serviceScope;
    public SignInControllerTest(WebApplicationFactory<Program> factory)
    {
        Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "test");
        var app = new WebApplicationFactory<Program>();

        _client = app.CreateClient();

        var services = app.Services;

        _serviceScope = services.CreateScope();
        _dbContext = _serviceScope.ServiceProvider.GetRequiredService<DataContext>();
        clearDbTable();
    }

    private void clearDbTable(){
        var registros = _serviceScope.ServiceProvider.GetRequiredService<DataContext>().Accounts.ToList();
        _serviceScope.ServiceProvider.GetRequiredService<DataContext>().Accounts.RemoveRange(registros);
        _serviceScope.ServiceProvider.GetRequiredService<DataContext>().SaveChangesAsync();
    }

    public void Dispose()
    {
        _serviceScope.Dispose();
        _client.Dispose();
    }

    [Fact(DisplayName = "Should fail to login if user is not found and return badrequest(Account not found)")]
    public async Task ShouldFailToLoginIfUserIsNotFound()
    {
        var payload = new
        {
            email = "fake@email.com",
            password = "Fake@123"
        };
        var request = new HttpRequestMessage(HttpMethod.Post, "/sign-in");
        request.Content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");

        var response = await _client.SendAsync(request);
        var content = await response.Content.ReadAsStringAsync();
        dynamic responseJson = JsonConvert.DeserializeObject(content);
        string message = responseJson.message;
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("Account not found", message);
    }

    [Fact(DisplayName = "Should login and return Ok(null)")]
    public async Task ShouldLoginAndReturnOK()
    {
        clearDbTable();
        var salt = new HashPasswordBcryptAdpter().GenerateSalt();
        string passwordhashed = new HashPasswordBcryptAdpter().Hash("Fake@123",salt);
        _serviceScope.ServiceProvider.GetRequiredService<DataContext>().Accounts.Add( new Accounts(){
            email = "fake@email.com",
            name = "fakename",
            password = passwordhashed,
            username = "fakeUsername",
            salt = salt
        });
        await _serviceScope.ServiceProvider.GetRequiredService<DataContext>().SaveChangesAsync();

        var payload = new
        {
            email = "fake@email.com",
            password = "Fake@123"
        };
        var request = new HttpRequestMessage(HttpMethod.Post, "/sign-in");
        request.Content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");

        var response = await _client.SendAsync(request);
        var content = await response.Content.ReadAsStringAsync();
        dynamic responseJson = JsonConvert.DeserializeObject(content);
        string message = responseJson.message;
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        clearDbTable();
    }

    [Fact(DisplayName = "Should fail to login if password is invalid and return bad request (Account not found)")]
    public async Task ShouldFailToLoginIfPasswordIsInvalidReturnBadrequest()
    {
        var salt = new HashPasswordBcryptAdpter().GenerateSalt();
        string passwordhashed = new HashPasswordBcryptAdpter().Hash("Fake@123",salt);
        _serviceScope.ServiceProvider.GetRequiredService<DataContext>().Accounts.Add( new Accounts(){
            email = "fake@email.com",
            name = "fakename",
            password = passwordhashed,
            username = "fakeUsername",
            salt = salt
        });
        await _serviceScope.ServiceProvider.GetRequiredService<DataContext>().SaveChangesAsync();
        var payload = new
        {
            email = "fake@email.com",
            password = "Fake@4002"
        };
        var request = new HttpRequestMessage(HttpMethod.Post, "/sign-in");
        request.Content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
        var response = await _client.SendAsync(request);
        var content = await response.Content.ReadAsStringAsync();
        dynamic responseJson = JsonConvert.DeserializeObject(content);
        string message = responseJson.message;
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("Account not found", message);
        clearDbTable();
    }


}

