using System.Security.Cryptography;
using System.Text;

namespace Projekcik.Api.Services
{
    public class PBKDF2HashService : IHashService
    {
        private const int SALT_SIZE = 64; // size in bytes
        private const int HASH_SIZE = 64; // size in bytes
        private const int ITERATIONS = 100; // number of pbkdf2 iterations

        public string HashPassword(string input)
        {
            var provider = new RNGCryptoServiceProvider();
            byte[] salt = new byte[SALT_SIZE];
            provider.GetBytes(salt);

            //todo: this salt does not work

            // Generate the hash
            var pbkdf2 = new Rfc2898DeriveBytes(input, salt, ITERATIONS);
            return GetStringFromHash(pbkdf2.GetBytes(HASH_SIZE));
        }

        public bool VerifyPassword(string input, string hashedPassword)
        {
            return HashPassword(input) == hashedPassword;
        }

        private string GetStringFromHash(byte[] hash)
        {
            var result = new StringBuilder();
            foreach (var t in hash)
                result.Append(t.ToString("X2"));
            return result.ToString();
        }

    }
}
