using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.Models.Common;

namespace Okhaz.Controllers.Profile
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private ProfileRepository repo;

        public ProfileController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new ProfileRepository();
        }

        /// <summary>
        /// Getting User Details By Branch
        /// </summary>
        /// <param name="branchID"></param>
        /// <returns></returns>
        [HttpGet("GetUserDetailsbyBranchID")]
        public object GetUserDetailsbyBranchID()
        {
            object products = repo.GetUserDetailsbyBranchID(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Getting User Details By Branch and UserID
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="branchID"></param>
        /// <returns></returns>
        [HttpGet("GetUserDetailsByBranchuserID/{UserID}")]
        public object GetUserDetailsByBranchuserID(int UserID)
        {
            object products = repo.GetUserDetailsByBranchuserID(UserID, userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Update User Manager Email
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="branchID"></param>
        /// <param name="emailId"></param>
        /// <returns></returns>
        [HttpPost("UpdateEmail_UserManager/{ID}/{emailId}")]
        public object UpdateEmail_UserManager(string ID, string emailId)
        {
            object products = repo.UpdateEmail_UserManager(ID, userIdentity.BranchId, emailId);
            return (products);
        }

        /// <summary>
        /// Update User Manager Password
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="branchID"></param>
        /// <param name="passWord"></param>
        /// <returns></returns>
        [HttpPost("UpdatePassword_UserManager/{ID}/{passWord}")]
        public object UpdatePassword_UserManager(string ID, string passWord)
        {
            object products = repo.UpdatePassword_UserManager(ID, userIdentity.BranchId, passWord);
            return (products);
        }
    }
}
