using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceDesk.Infrastructure.Migrations
{
    public partial class RequestDeveloperNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_SoftwareModules_SoftwareModuleId",
                table: "Requests");

            migrationBuilder.AlterColumn<int>(
                name: "SoftwareModuleId",
                table: "Requests",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_SoftwareModules_SoftwareModuleId",
                table: "Requests",
                column: "SoftwareModuleId",
                principalTable: "SoftwareModules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_SoftwareModules_SoftwareModuleId",
                table: "Requests");

            migrationBuilder.AlterColumn<int>(
                name: "SoftwareModuleId",
                table: "Requests",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_SoftwareModules_SoftwareModuleId",
                table: "Requests",
                column: "SoftwareModuleId",
                principalTable: "SoftwareModules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
