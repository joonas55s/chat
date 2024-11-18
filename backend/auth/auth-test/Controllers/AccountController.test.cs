using System.Net;
using System.Text;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;


public class AccountControllerTest : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;


    private DataContext _dbContext;
    private readonly IServiceScope _serviceScope;
    public AccountControllerTest(WebApplicationFactory<Program> factory)
    {
        Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "test");
        var app = new WebApplicationFactory<Program>();

        _client = app.CreateClient();

        var services = app.Services;

        _serviceScope = services.CreateScope();
        _dbContext = _serviceScope.ServiceProvider.GetRequiredService<DataContext>();

    }

    [Fact(DisplayName = "Should not create Account and return BadRequest")]
    public async Task ShouldNotCreateAccountReturnBadRequest()
    {
        var payload = new
        {
            name = "string",
            username = "string",
            email = "string",
            password = "string"
        };
        var request = new HttpRequestMessage(HttpMethod.Post, "/sign-up");
        request.Content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
        var response = await _client.SendAsync(request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }


    [Fact(DisplayName = "Should Create Account and return Ok")]
    public async Task ShouldCreateAccountReturnOk()
    {
        var payload = new
        {
            name = "fakeName",
            username = "fakeUsernameX",
            email = "fake@email.com",
            password = "Fake@123"
        };
        var request = new HttpRequestMessage(HttpMethod.Post, "/sign-up");
        request.Content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
        var response = await _client.SendAsync(request);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}

