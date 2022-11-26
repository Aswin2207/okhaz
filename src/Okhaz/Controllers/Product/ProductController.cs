using DataAccess.DataModel;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Okhaz.Models;
using Okhaz.Models.Common;

namespace Okhaz.Controllers.Product
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private ItemRepository repo;

        public ProductController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new ItemRepository();
        }

        /// <summary>
        /// takes login model, which should contain user name and password with base 64 encrypted
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("AddProduct")]
        public bool AddProduct(ProductDetails[] data)
        {
            foreach (ProductDetails prod in data)
            {
                item_master item = JsonConvert.DeserializeObject<item_master>(prod.item);
                repo.AddProduct(item, userIdentity.BranchId);
                if (!string.IsNullOrWhiteSpace(prod.extraImageUrls))
                {
                    string[] images = JsonConvert.DeserializeObject<string[]>(prod.extraImageUrls);
                    repo.AddProductImages(images, userIdentity.BranchId, item.itemID);
                }
            }
            return true;
        }

        [HttpDelete("DeleteProduct")]
        public object DeleteProduct(string id)
        {
            repo.DeleteProduct(id);
            return Ok();
        }

        [HttpPut("EditProduct")]
        public object EditProduct(item_master id)
        {
            repo.EditProduct(id);
            return Ok();
        }

        [HttpPost("GetProducts/{id}")]
        public object GetProducts(int id, GridModel data)
        {
            object products = repo.GetItemsWithPageSupport(userIdentity.BranchId, id, data.start, data.limit, data.sortCol, data.sortOrder, data.searchVal);
            return (products);
        }

        [HttpGet("GetProductsFromCategory/{categoryId}")]
        public object GetProductsFromCategory(string categoryId)
        {
            object products = repo.GetItemsUnderCategory(userIdentity.BranchId, categoryId);
            return (products);
        }
    }
}
