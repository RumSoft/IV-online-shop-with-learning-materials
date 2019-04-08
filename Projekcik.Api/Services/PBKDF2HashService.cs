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

            var pbkdf2 = new Rfc2898DeriveBytes(input, salt, _Iterations);
            var hash = pbkdf2.GetBytes(_HashSize);

            var hashBytes = Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(hash);

            return hashBytes;
        }

        public bool VerifyPassword(string input, string hashedPassword)
        {
            return HashPassword(input) == hashedPassword;
        }
    }
}
    /*public class PBKDF2HashService
    {
        private const int _SaltSize = 16;
        private const int _HashSize = 20;

        public static string Hash(string password, int iterations)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[_SaltSize]);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations);
            var hash = pbkdf2.GetBytes(_HashSize);

            var hashBytes = new byte[_SaltSize + _HashSize];
            Array.Copy(salt, 0, hashBytes, 0, _SaltSize);
            Array.Copy(hash, 0, hashBytes, _SaltSize, _HashSize);

            var base64Hash = Convert.ToBase64String(hashBytes);
            return string.Format(base64Hash);
        }

        public static string Hash(string password)
        {
            return Hash(password, 10000);
        }

    }*/
