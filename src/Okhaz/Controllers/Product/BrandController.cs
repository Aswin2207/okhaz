using DataAccess.DataModel;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.Models;
using Okhaz.Models.Common;

namespace Okhaz.Controllers.Product
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private BrandRepository repo;

        public BrandController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new BrandRepository();
        }

        [HttpPost("getbrands")]
        public object GetBrands(GridModel data)
        {
            object products = repo.GetBrandInfo(userIdentity.BranchId);
            return products;
        }

        [HttpPost("getdepartments")]
        public object GetDepartments(GridModel data)
        {
            object products = repo.GetDepartmentInfo(userIdentity.BranchId);
            return products;
        }

        [HttpPost("savebrands")]
        public object SaveBrands(Brand_master[] brands)
        {
            object products = repo.SaveBrandInfo(userIdentity.UserId, userIdentity.BranchId, brands);
            return products;
        }
    }
}
