using System.Security.Cryptography;
using System.Text;

namespace Projekcik.Api.Services
{
    public interface IHashService
    {
        string HashPassword(string input);
    }

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

            // Generate the hash
            var pbkdf2 = new Rfc2898DeriveBytes(input, salt, ITERATIONS);
            return GetStringFromHash(pbkdf2.GetBytes(HASH_SIZE));
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
