using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceDesk.Infrastructure.Migrations
{
    public partial class ClientRequestLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_ClientRepresentatives_AuthorId",
                table: "Requests");

            migrationBuilder.DropTable(
                name: "ClientRepresentatives");

            migrationBuilder.DropIndex(
                name: "IX_Requests_AuthorId",
                table: "Requests");

            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Requests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_ClientId",
                table: "Requests",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Clients_ClientId",
                table: "Requests",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Clients_ClientId",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_ClientId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Requests");

            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "Requests",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ClientRepresentatives",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientRepresentatives", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_ClientRepresentatives_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Requests_AuthorId",
                table: "Requests",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientRepresentatives_ClientId",
                table: "ClientRepresentatives",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_ClientRepresentatives_AuthorId",
                table: "Requests",
                column: "AuthorId",
                principalTable: "ClientRepresentatives",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
