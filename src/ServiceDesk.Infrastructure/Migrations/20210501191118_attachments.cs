using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceDesk.Infrastructure.Migrations
{
    public partial class attachments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RealName",
                table: "RequestAttachments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Reference",
                table: "RequestAttachments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SizeMb",
                table: "RequestAttachments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnicalName",
                table: "RequestAttachments",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RealName",
                table: "RequestAttachments");

            migrationBuilder.DropColumn(
                name: "Reference",
                table: "RequestAttachments");

            migrationBuilder.DropColumn(
                name: "SizeMb",
                table: "RequestAttachments");

            migrationBuilder.DropColumn(
                name: "UnicalName",
                table: "RequestAttachments");
        }
    }
}
