using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

public class TokenManagerAdpter : TokenManager
{
    public string Sign(Account payload)
    {
        string chaveSecreta = "ocP3QVJgP7aAK5/WTfE4aCsrVO4BfitrvzWhP16Zvg4=";
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, payload.name.value),
            new Claim(ClaimTypes.Email, payload.email.value),
            new Claim("username", payload.username.value)
        };
        var chave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chaveSecreta));
        var credenciais = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);
        var parametrosToken = new JwtSecurityToken(
            issuer: "auth-api",
            audience: "front",
            claims: claims,
            expires: DateTime.UtcNow.AddHours(6),
            signingCredentials: credenciais
        );
        var tokenString = new JwtSecurityTokenHandler().WriteToken(parametrosToken);
        return tokenString;
    }

    public bool verify(string token)
    {
        throw new NotImplementedException();
    }
}