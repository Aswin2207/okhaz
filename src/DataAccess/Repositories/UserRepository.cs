using DataAccess.DataModel;
using DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataAccess.Repositories
{
    public class UserRepository : BaseRepository<user_manager>, IUserRepository
    {
        BaseRepository<user_manager> repo;

        public UserRepository()
        {
            repo = new BaseRepository<user_manager>();
        }

        public void AddUser(user_manager user)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<user_manager> GetUsersOfBranch(string branchCode)
        {
            throw new NotImplementedException();
        }

        public bool IsUsernameUnique(string userName)
        {
            return repo.dbSet.FirstOrDefault(u => u.userName == userName) == null;
        }

        public user_manager ValidateLogin(string userName, string password)
        {
            var userResult = repo.dbSet.FirstOrDefault(u => ( u.userName == userName | u.emailId == userName) & u.passWord == password);
            return userResult;
        }

    }
}
