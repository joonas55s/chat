using System.Net;
using System.Text.Json;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var statusCode = HttpStatusCode.InternalServerError;
        string errorMessage = "";
        if (exception is ArgumentException)
        {
            errorMessage = exception.Message;
            statusCode = HttpStatusCode.BadRequest;
        }
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;
        var response = new { message = exception.Message };
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        var responseJson = JsonSerializer.Serialize(response, options);
        return context.Response.WriteAsync(responseJson);
    }
}
