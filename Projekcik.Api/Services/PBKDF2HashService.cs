using System;
using System.Security.Cryptography;
using System.Text;

namespace Projekcik.Api.Services
{
    public class PBKDF2HashSerivce : IHashService
    {
        private const int saltSize = 64;
        private const int hashSize = 128;
        private const int iterations = 10;

        // IHashService::HashPassword(string input)
        public string HashPassword(string input)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[saltSize]);
            return HashPassword(input, salt);
        }

        // IHashService::VerifyPassword(string input, string hashedPassword)
        public bool VerifyPassword(string input, string hashedPassword)
        {
            var salt = hashedPassword.Split(':')[0];
            var saltBytes = Convert.FromBase64String(salt);
            return HashPassword(input, saltBytes) == hashedPassword;
        }

        private string HashPassword(string input, byte[] salt)
        {
            using (var pbkdf2 = new Rfc2898DeriveBytes(input, salt, iterations))
            {
                var hash = pbkdf2.GetBytes(hashSize);
                return $"{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
            }
        }
    }
}
