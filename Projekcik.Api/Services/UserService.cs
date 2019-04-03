using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projekcik.Api.Models;

namespace Projekcik.Api.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IHashService _hashService;

        public UserService(DataContext context, IHashService hashService)
        {
            _context = context;
            _hashService = hashService;
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username)
                || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.EmailAddress == username);
            if (user == null)
                return null;

            if (!_hashService.VerifyPassword(password, user.Password))
                return null;

            return user;
        }

        public IEnumerable<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public User GetById(Guid id)
        {
            return _context.Users.Find(id);
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            if (_context.Users.Any(x => x.UserName == user.UserName))
                throw new Exception("Username \"" + user.UserName + "\" is already taken");

            if (_context.Users.Any(x => x.EmailAddress == user.EmailAddress))
                throw new Exception("EmailAddress \"" + user.EmailAddress + "\" is already taken");

            user.Password = HashPassword(password);
            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        public void Update(User user, string password = null)
        {
            throw new NotImplementedException();
        }

        public void Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        private string HashPassword(string password)
        {
            if (password == null)
                throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));

            return _hashService.HashPassword(password);
        }
    }
}
