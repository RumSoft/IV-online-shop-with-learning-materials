using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekcik.Api.Services
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
            return input+':'+salt;
        }
    }
}
