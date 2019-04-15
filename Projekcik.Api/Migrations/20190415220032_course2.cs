using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekcik.Api.Migrations
{
    public partial class course2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Courses_SubjectId",
                table: "Notes");

            migrationBuilder.RenameColumn(
                name: "SubjectId",
                table: "Notes",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Notes_SubjectId",
                table: "Notes",
                newName: "IX_Notes_CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Courses_CourseId",
                table: "Notes",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Courses_CourseId",
                table: "Notes");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Notes",
                newName: "SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Notes_CourseId",
                table: "Notes",
                newName: "IX_Notes_SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Courses_SubjectId",
                table: "Notes",
                column: "SubjectId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
