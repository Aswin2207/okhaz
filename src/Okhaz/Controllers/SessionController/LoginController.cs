using DataAccess.DataModel;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.AppInterfaces.Common;
using Okhaz.Common.Global;
using Okhaz.Models;
using Okhaz.Models.Constants;
using Okhaz.Models.Response.Account;
using Okhaz.Models.Response.Branch;

namespace Okhaz.Controllers.SessionController
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ITokenService tokenService;
        private BranchRepository branchInfo;
        private UserRepository repo;

        public LoginController(ITokenService tokenService)
        {
            this.tokenService = tokenService;
            repo = new UserRepository();
            branchInfo = new BranchRepository();
        }

        [HttpGet("Get/{id}")]
        public object Get(string id)
        {
            user_manager users = repo.GetById(id);
            return (users);
        }

        [HttpDelete("LogOut")]
        public bool LogOut()
        {
            AuthenticateUser.DeleteSession();
            return true;
        }

        /// <summary>
        /// takes login model, which should contain user name and password with base 64 encrypted
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("ValidateLogin")]
        public object ValidateLogin(LoginModel id)
        {
            string userName = Utility.ConvertBase64ToString(id.UserName);
            string password = Utility.ConvertBase64ToString(id.Password);
            user_manager user = repo.ValidateLogin(userName, password);
            if (user != null)
            {
                if (user.loginstatus == GlobalConstant.ActiveStatus)
                {
                    //AuthenticateUser.SaveUserInSession("UserSessionDetails", JsonConvert.SerializeObject(user));
                    var branchdata = branchInfo.GetBranchInfo(user.branchid);
                    // AuthenticateUser.SaveUserInSession("BranchInfo", JsonConvert.SerializeObject(branchdata));
                    return new LoginResponse
                    {
                        IsAccountActive = true,
                        UserDetails = GetUserDetails(user),
                        BranchInfo = GetBranchDetails(branchdata)
                    };
                }
            }
            return NotFound();
        }

        private BranchDetails GetBranchDetails(branch_master branch)
        {
            return new BranchDetails
            {
                Address = branch.Address,
                BranchAvatar = branch.BranchAvatar,
                branchid = branch.branchid,
                branchname = branch.branchname,
                BranchStatus = branch.BranchStatus,
                BranchWebSliderPath = branch.BranchWebSliderPath,
                contactperson = branch.contactperson,
                createdate = branch.createdate,
                Currency = branch.Currency,
                FTPPassword = branch.FTPPassword,
                FTPUserID = branch.FTPUserID,
                GetReelLocationPath = branch.GetReelLocationPath,
                LastUpdateDate = branch.LastUpdateDate,
                location = branch.location,
                OnlineBannerHttpPath = branch.OnlineBannerHttpPath,
                OnlineBannerPath = branch.OnlineBannerPath,
                OnlineBillPath = branch.OnlineBillPath,
                shopnameL1 = branch.shopnameL1,
                shopnameL2 = branch.shopnameL2,
                SubscriptionValidityFrom = branch.SubscriptionValidityFrom,
                SubscriptionValidityUpTo = branch.SubscriptionValidityUpTo,
                trnNo = branch.trnNo,
                UserID = branch.UserID
            };
        }

        private UserDetails GetUserDetails(user_manager user)
        {
            var accessToken = tokenService.CreateToken(user.userName, user.branchid);
            return new UserDetails
            {
                AccessToken = accessToken,
                branchid = user.branchid,
                emailId = user.emailId,
                CostView = user.CostView,
                EmpCode = user.EmpCode,
                GraphView = user.GraphView,
                id = user.id,
                loginstatus = user.loginstatus,
                passWord = user.passWord,
                stockSales = user.stockSales,
                stockView = user.stockView,
                undercostsale = user.undercostsale,
                userName = user.userName,
                userType = user.userType
            };
        }
    }
}
