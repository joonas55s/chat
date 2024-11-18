using System.ComponentModel.DataAnnotations.Schema;

public class Accounts
{
    public Guid id { get; set; }
    public string name { get; set; } = "";
    public string username { get; set; } = "";
    public string email { get; set; } = "";
    public string password { get; set; } = "";
    public string salt { get; set; } = "";
    [Column(TypeName = "timestamp with time zone")]
    public DateTime? created_at { get; set; }
    [Column(TypeName = "timestamp with time zone")]
    public DateTime? updated_at { get; set; }


}