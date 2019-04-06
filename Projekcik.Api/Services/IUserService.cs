using System;
using System.Linq;
using Projekcik.Api.Models;

namespace Projekcik.Api.Services
{
    public interface IUserService
    {
        User Authenticate(string emailAddress, string password);
        IQueryable<User> GetAll();
        User GetById(Guid id);
        User GetByEmailAddress(string emailAddress);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(Guid id);
    }
}