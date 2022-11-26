using DataAccess.DataModel;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.Models;
using Okhaz.Models.Common;

namespace Okhaz.Controllers.Marketting
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private CouponReporsitory repo;

        public CouponController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new CouponReporsitory();
        }

        /// <summary>
        /// takes login model, which should contain user name and password with base 64 encrypted
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("addCoupon")]
        public object AddCoupon(CouponDetails detail)
        {
            user_manager userDetails = AuthenticateUser.GetUserDetailsFromSession();
            if (userDetails != null)
            {
                repo.AddCoupon(detail.coupon, detail.couponType, userDetails.branchid);
                return ("success");
            }
            return null;
        }

        [HttpPost("getList")]
        public object GetList(GridModel gridData)
        {
            object products = repo.GetCouponList(userIdentity.BranchId);
            return (products);
        }
    }
}
