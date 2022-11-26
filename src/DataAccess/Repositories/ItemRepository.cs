using DataAccess.DAL;
using DataAccess.DataModel;
using DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class ItemRepository:BaseRepository<item_master>, IItemRepository
    {
        BaseRepository<item_master> repo;
        public ItemRepository()
        {
            repo = new BaseRepository<item_master>();
        }

        public void AddProduct(item_master item,string branchCode)
        {
            if (item != null)
            {
                item.CreatedDate = DateTime.UtcNow;
                item.BranchCode = branchCode;
                string itemId = getLatestItemId();
                double itemID = double.Parse(itemId);
                item.itemID = (++itemID).ToString();
                repo.Insert(item);
                repo.Save();
            }
        }

        public void DeleteProduct(string itemId)
        {
            if (!string.IsNullOrWhiteSpace(itemId))
            {
                repo.Delete(itemId);
            }
        }

        public string getLatestItemId()
        {
            IEnumerable<item_master> data = repo.GetWithPagination(0, 1, "itemID", -1, x=>x.itemID != null);
            if(data!=null && data.Count() > 0)
            {
                return data.ToList()[0].itemID;
            }
            return "70000";
        }

        public void AddProductImages(string[] extraImageUrls, string branchid, string itemID)
        {
            
        }

        public object GetItemsUnderCategory(string branchCode, string categoryId)
        {
            Expression<Func<item_master, bool>> filter = x => (x.BranchCode == branchCode && x.itemSubCategory == categoryId);
            IEnumerable<item_master> data = repo.Get(filter);
            return data;
        }

        public object GetItemsWithPageSupport(string branchCode,int viewTabId, int start,int limit,string orderCol, int sortOrder, string searchVal)
        {
            if (!string.IsNullOrWhiteSpace(branchCode))
            {
                Expression<Func<item_master, bool>> filter = x => (x.BranchCode == branchCode);
                Expression<Func<item_master, bool>> filter1 = null;

                switch (viewTabId)
                {
                    //featured
                    case 1:

                        break;
                    //free shipping
                    case 2:
                        filter1 = x => (x.FreeShipping == 1);
                        break;
                    //last import
                    case 3:

                        break;
                    //out of stock
                    case 4:
                        filter1 = x => (x.StockingType == "Out Of Stock");
                        break;
                    //Not visible
                    case 5:
                        filter1 = x => (x.Status != "Active");
                        break;
                    //visible
                    case 6:
                        filter1 = x => (x.Status == "Active");
                        break;
                    //custom view
                    case 7:
                        break;
                }

                var parameter = Expression.Parameter(typeof(item_master));

                if (filter1 != null)
                {
                    var leftVisitor = new ReplaceExpressionVisitor(filter.Parameters[0], parameter);
                    var left = leftVisitor.Visit(filter.Body);
                    var rightVisitor = new ReplaceExpressionVisitor(filter1.Parameters[0], parameter);
                    var right = rightVisitor.Visit(filter1.Body);
                    filter =  Expression.Lambda<Func<item_master, bool>>(Expression.AndAlso(left, right), parameter);
                }

                if (!string.IsNullOrWhiteSpace(searchVal))
                {
                    Expression<Func<item_master, bool>> searchFilter = x => (  x.itemName.Contains(searchVal) 
                                                                            || x.Brand.Contains(searchVal) 
                                                                            || x.ItemDesc1.Contains(searchVal));

                    var leftVisitor = new ReplaceExpressionVisitor(filter.Parameters[0], parameter);
                    var left = leftVisitor.Visit(filter.Body);
                    var rightVisitor = new ReplaceExpressionVisitor(searchFilter.Parameters[0], parameter);
                    var right = rightVisitor.Visit(searchFilter.Body);
                    filter = Expression.Lambda<Func<item_master, bool>>(Expression.AndAlso(left, right), parameter);
                }

                if (string.IsNullOrWhiteSpace(orderCol))
                {
                    orderCol = "CreatedDate";
                }

                long length = repo.getDataCount(filter);
                IEnumerable<item_master> data = repo.GetWithPagination(start, limit, orderCol, sortOrder, filter);
                return new
                {
                    rows = data,
                    totalRows = length
                };
            }
            return null;
        }

    
        public void EditProduct(item_master item)
        {
            if (item != null)
            {
                repo.Update(item);
                repo.Save();
            }
        }
    }
}
