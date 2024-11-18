using Microsoft.EntityFrameworkCore;

public class Program
{

    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        bool testMode = args.Contains("--ENVIRONMENT=test");
        if(!testMode){
            var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddEnvironmentVariables()
            .AddJsonFile("appsettings.json")
            .Build();

            string _connectionString = configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<DataContext>(options =>
                options.UseNpgsql(_connectionString)
            );
        }else{
            builder.Services.AddDbContext<DataContext>(options =>
                options.UseInMemoryDatabase("YourDatabaseName")
            );
        }
        
        builder.Services.AddScoped<DataContext, DataContext>();

        builder.Services.AddControllers();


        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Your API", Version = "v1" });
        });

        var app = builder.Build();
        using (var scope = app.Services.CreateScope())
        {
            var dbContext = scope.ServiceProvider
                .GetRequiredService<DataContext>();
            dbContext.Database.Migrate();
        }
        // if (app.Environment.IsDevelopment())
        // {
            //app.UseDeveloperExceptionPage();

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API V1");
                c.RoutePrefix = string.Empty;
            });
        // }
        app.UseMiddleware<ErrorHandlingMiddleware>();
        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.UseRouting();
        app.UseCors(builder =>
        {
            builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
        });
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
        app.Run();
    }
}
