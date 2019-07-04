using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekcik.Api.Migrations
{
    public partial class changecourses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Faculties_FacultyId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Subjects_SubjectId",
                table: "Notes");

            migrationBuilder.DropTable(
                name: "Faculties");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.RenameColumn(
                name: "FacultyId",
                table: "Courses",
                newName: "UniversityId");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_FacultyId",
                table: "Courses",
                newName: "IX_Courses_UniversityId");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Universities",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VoivodeshipId",
                table: "Universities",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Voivodeships",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    ImageUrl = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voivodeships", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Universities_VoivodeshipId",
                table: "Universities",
                column: "VoivodeshipId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Universities_UniversityId",
                table: "Courses",
                column: "UniversityId",
                principalTable: "Universities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Courses_SubjectId",
                table: "Notes",
                column: "SubjectId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Universities_Voivodeships_VoivodeshipId",
                table: "Universities",
                column: "VoivodeshipId",
                principalTable: "Voivodeships",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Universities_UniversityId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Courses_SubjectId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Universities_Voivodeships_VoivodeshipId",
                table: "Universities");

            migrationBuilder.DropTable(
                name: "Voivodeships");

            migrationBuilder.DropIndex(
                name: "IX_Universities_VoivodeshipId",
                table: "Universities");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Universities");

            migrationBuilder.DropColumn(
                name: "VoivodeshipId",
                table: "Universities");

            migrationBuilder.RenameColumn(
                name: "UniversityId",
                table: "Courses",
                newName: "FacultyId");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_UniversityId",
                table: "Courses",
                newName: "IX_Courses_FacultyId");

            migrationBuilder.CreateTable(
                name: "Faculties",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 250, nullable: false),
                    UniversityId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faculties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Faculties_Universities_UniversityId",
                        column: x => x.UniversityId,
                        principalTable: "Universities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CourseId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 250, nullable: false),
                    Semester = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subjects_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Faculties_UniversityId",
                table: "Faculties",
                column: "UniversityId");

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_CourseId",
                table: "Subjects",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Faculties_FacultyId",
                table: "Courses",
                column: "FacultyId",
                principalTable: "Faculties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Subjects_SubjectId",
                table: "Notes",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
