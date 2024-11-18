using Microsoft.AspNetCore.Mvc;


namespace auth.Controllers;

[ApiController]
[Route("sign-up")]
public class AccountController : ControllerBase
{

    [HttpPost]
    public async Task<OkResult> CreateAccount(InputCreateAccount input, [FromServices] DataContext dbContext)
    {
        CreateAccountFactory accountFactory = new CreateAccountFactory(dbContext);
        await accountFactory.crateAccount.Handle(input);
        return Ok();
    }
}
