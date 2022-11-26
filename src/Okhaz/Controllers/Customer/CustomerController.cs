using DataAccess.DataModel;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.Models.Common;

namespace Okhaz.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private CustomerReporsitory repo;

        public CustomerController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new CustomerReporsitory();
        }

        /// <summary>
        /// takes login model, which should contain user name and password with base 64 encrypted
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("AddCustomer")]
        public object AddCustomer(customer_master id)
        {
            repo.AddCustomer(id, userIdentity.BranchId);
            return ("success");
        }

        [HttpGet("GetMatchedCustomers/{searchVal}")]
        public object GetMatchedCustomers(string searchVal)
        {
            object products = repo.GetCustomerList(userIdentity.BranchId, searchVal);
            return (products);
        }
    }
}
