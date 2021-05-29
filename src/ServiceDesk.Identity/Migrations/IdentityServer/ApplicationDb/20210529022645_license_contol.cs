using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceDesk.Identity.Migrations.IdentityServer.ApplicationDb
{
    public partial class license_contol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LicenseId",
                table: "ClientUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ClientLicenses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<int>(nullable: false),
                    LicenseId = table.Column<int>(nullable: false),
                    CountOfUsers = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientLicenses", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientLicenses");

            migrationBuilder.DropColumn(
                name: "LicenseId",
                table: "ClientUsers");
        }
    }
}
