using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.Models.Common;

namespace Okhaz.Controllers.Product
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private SupplierRepository repo;

        public SupplierController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new SupplierRepository();
        }

        [HttpGet("GetSuppliers/{id}")]
        public object GetSuppliers(string id)
        {
            object suppliers = repo.GetSupplierInfo(userIdentity.BranchId, id);
            return suppliers;
        }
    }
}
