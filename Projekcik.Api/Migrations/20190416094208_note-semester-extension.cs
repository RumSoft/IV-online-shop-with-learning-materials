using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekcik.Api.Migrations
{
    public partial class notesemesterextension : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FileExtension",
                table: "Notes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Semester",
                table: "Notes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileExtension",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "Semester",
                table: "Notes");
        }
    }
}
