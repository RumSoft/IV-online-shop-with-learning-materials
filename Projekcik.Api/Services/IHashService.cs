namespace Projekcik.Api.Services
{
    public interface IHashService
    {
        string HashPassword(string input);
        string HashPassword(string input, string salt);
        bool VerifyPassword(string input, string hashedPassword);
    }
}