using System;
using System.Security.Cryptography;

namespace Projekcik.Api.Services
{
    public class PBKDF2HashSerivce : IHashService
    {
        private const int _SaltSize = 16;
        private const int _HashSize = 20;
        private const int _Iterations = 1000;

        public string HashPassword(string input)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[_SaltSize]);

            return HashPassword(input, Convert.ToBase64String(salt));
        }

        public string HashPassword(string input, string salt)
        {

            var pbkdf2 = new Rfc2898DeriveBytes(Convert.FromBase64String(input), Convert.FromBase64String(salt), _Iterations);
            var hash = pbkdf2.GetBytes(_HashSize);

            var hashBytes = salt + ":" + Convert.ToBase64String(hash);

            return hashBytes;
        }

        public bool VerifyPassword(string input, string hashedPassword)
        {
            var salt = hashedPassword.Split(':')[0];
            return HashPassword(input, salt) == hashedPassword;
        }
    }
}
