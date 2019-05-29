namespace Projekcik.Api.Services.Impl
{
    public class PlaintextHashService : IHashService
    {
        public string HashPassword(string input)
        {
            return input;
        }

        public bool VerifyPassword(string input, string hashedPassword)
        {
            return HashPassword(input) == hashedPassword;
        }

        public string HashPassword(string input, string salt)
        {
            return input + ':' + salt;
        }
    }
}