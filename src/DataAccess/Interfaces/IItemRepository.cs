using DataAccess.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    interface IItemRepository : IRepository<item_master>
    {
         void AddProduct(item_master item, string branchCode);

         void DeleteProduct(string itemId);

         object GetItemsWithPageSupport(string branchCode, int viewTabId, int start, int limit, string orderCol, int sortOrder, string searchVal);

         void EditProduct(item_master item);
       
    }
}
