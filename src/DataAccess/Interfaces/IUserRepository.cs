using DataAccess.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    interface IUserRepository : IRepository<user_manager>
    {
        void AddUser(user_manager user);
        bool IsUsernameUnique(string userName);
        IEnumerable<user_manager> GetUsersOfBranch(string branchCode);
        user_manager ValidateLogin(string userName,string password);
    }
}
