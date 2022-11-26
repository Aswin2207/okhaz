using DataAccess.DataModel;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.Models.Common;

namespace Okhaz.Controllers.Product
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private CategoryRepository repo;

        public CategoryController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new CategoryRepository();
        }

        [HttpPost("AddCategory")]
        public object AddCategory([FromBody] category_master objCategoryUPD)
        {
            repo.AddCategory(objCategoryUPD, userIdentity.BranchId);
            return Ok();
        }

        /// <summary>
        /// takes login model, which should contain user name and password with base 64 encrypted
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("AddSubCategory")]
        public object AddSubCategory(subcategory_master id)
        {
            if (id != null && !string.IsNullOrWhiteSpace(id.CategoryId) && !string.IsNullOrWhiteSpace(id.item_subCatName))
            {
                id.BranchCode = userIdentity.BranchId;
                string latestId = repo.GetLatestSubCategoryId();
                double catId = double.Parse(latestId);
                catId++;
                id.item_subCatID = catId.ToString().PadLeft(6, '0');
                repo.AddSubCategory(id);
                repo.Save();
                var data = new
                {
                    success = true,
                    Data = id
                };
                return (data);
            }
            return (new
            {
                success = false,
                errorMessage = "Data provided is invalid"
            });
        }

        [HttpDelete("DeletCategory")]
        public object DeletCategory(string[] id)
        {
            repo.DeleteSubCategory(id);
            return Ok();
        }

        [HttpPost("DeletSubCategory")]
        public object DeletSubCategory(string[] id)
        {
            repo.DeleteSubCategory(id);
            return Ok();
        }

        [HttpPost("EditCategory")]
        public object EditCategory(category_master id)
        {
            repo.EditCategory(id);
            return Ok();
        }

        [HttpPost("EditSubCategory")]
        public object EditSubCategory(subcategory_master id)
        {
            repo.EditSubCategory(id);
            return Ok();
        }

        [HttpGet("GetCategory")]
        public object GetCategory()
        {
            object products = repo.GetCategory(userIdentity.BranchId);
            return (products);
        }

        [HttpPost("UpdateCategory")]
        public object UpdateCategory([FromBody] category_master objCategoryUPD)
        {
            return repo.UpdateCategoryInfo(objCategoryUPD);
        }

        [HttpPost("UpdateCategoryStatus")]
        public object UpdateCategoryStatus(category_master objCategoryUPD)
        {
            return repo.UpdateCategoryStatus(objCategoryUPD.CategoryId);
        }
    }
}
