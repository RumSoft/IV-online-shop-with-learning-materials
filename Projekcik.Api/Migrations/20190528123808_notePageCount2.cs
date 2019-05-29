using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekcik.Api.Migrations
{
    public partial class notePageCount2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PageCount",
                table: "Notes",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PageCount",
                table: "Notes",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
