using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class AccountsConfiguration : IEntityTypeConfiguration<Accounts>
{
    public void Configure(EntityTypeBuilder<Accounts> builder)
    {
        builder.Property(x => x.created_at)
            .HasDefaultValueSql("NOW()")
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(x => x.updated_at)
            .HasDefaultValueSql("NOW()")
            .ValueGeneratedOnUpdate();
    }
}