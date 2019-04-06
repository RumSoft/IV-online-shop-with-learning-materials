using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Projekcik.Api.Services
{
    public class PBKDF2HashService
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

            //return string.Format()
            //return string.Format("$MYHASH$V1${0}${1}", iterations, base64Hash);
        }

        public static string Hash(string password)
        {
            return Hash(password, 10000);
        }

        public static bool IsHashSupported(string hashString)
        {
            return hashString.Contains("$MYHASH$V1$");
        }

        public static string Verify(string password, string hashedPassword)
        {
            if (!IsHashSupported(hashedPassword))
            {
                throw new NotSupportedException("The hashtype is not supported");
            }

            var splittedHashString = hashedPassword.Replace("$MYHASH$V1$", "").Split('$');
            var iterations = int.Parse(splittedHashString[0]);
            var base64Hash = splittedHashString[1];

            var hashBytes = Convert.FromBase64String(base64Hash);

            var salt = new byte[_SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, _SaltSize);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations);
            byte[] hash = pbkdf2.GetBytes(_HashSize);

            for (var i=0; i<_HashSize; i++)
            {
                if(hashBytes[i + _SaltSize] != hash[i])
                {
                    return "wrong";
                }
            }
            return "true";
        }
    }
}

