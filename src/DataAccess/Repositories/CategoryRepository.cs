using Newtonsoft.Json;
using DataAccess.DAL;
using DataAccess.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace DataAccess.Repositories
{
    public class CategoryRepository : BaseRepository<category_master>
    {
        BaseRepository<category_master> repo;
        BaseRepository<subcategory_master> subCategory;
        BaseRepository<item_master> itemRepo;
        public CategoryRepository()
        {
            repo = new BaseRepository<category_master>();
            subCategory = new BaseRepository<subcategory_master>();
            itemRepo = new BaseRepository<item_master>();
        }

        public object DeleteSubCategory(string[] ids)
        {
            if (ids!=null && ids.Length > 0)
            {
                foreach(string id in ids)
                {
                    subCategory.Delete(id);
                }
                subCategory.Save();
            }
            return JsonConvert.SerializeObject("success");
        }

        public IEnumerable<subcategory_master> GetSubCategory(string pCatId)
        {
            if (!string.IsNullOrWhiteSpace(pCatId))
            {
                return subCategory.Get(x=>x.CategoryId == pCatId);
            }
            return null;
        }

        public void EditSubCategory(subcategory_master item)
        {
            if (item != null)
            {
                subCategory.Update(item);
                subCategory.Save();
            }
        }

        public string GetLatestSubCategoryId()
        {
            IEnumerable<subcategory_master> data = subCategory.GetWithPagination(0, 1, "item_subCatID", -1, x => x.item_subCatID != null);
            if (data != null && data.Count() > 0)
            {
                return data.ToList()[0].item_subCatID;
            }
            return "001000";
        }

        public void Save()
        {
            repo.Save();
            subCategory.Save();
            itemRepo.Save();
        }
        
        public void AddSubCategory(subcategory_master subSategory)
        {
            if (subSategory != null)
            {
                subCategory.Insert(subSategory);
            }
        }

        public void AddCategory(category_master category, string branchCode)
        {
            if (category != null)
            {
                category.BrachCode = branchCode;
                repo.Insert(category);
                repo.Save();
            }
        }

        public void DeleteCategory(string itemId)
        {
            if (!string.IsNullOrWhiteSpace(itemId))
            {
                repo.Delete(itemId);
            }
        }

        public void EditCategory(category_master item)
        {
            if (item != null)
            {
                repo.Update(item);
                repo.Save();
            }
        }

        public object GetCategory(string branchId)
        {
            List<Dictionary<string, string>> maxIds = DBConnection.ExecuteProcedureReturnDataSet("[dbo].[GetMaxCategoryID]");
            string query = @"select c.*,
				(SELECT COUNT(DISTINCT MainSupplier) FROM item_master i WHERE itemSubCategory IN (SELECT item_subCatID FROM subcategory_master s WHERE s.CategoryId= c.CategoryId)) AS SupplierCount
				from category_master c
				where BrachCode = @bid";

            query = @"select c.*,
                (SELECT COUNT(itemID) FROM item_master i WHERE i.CategoryId= c.CategoryId) AS ProductsCount,
                (SELECT COUNT(DISTINCT MainSupplier) FROM item_master i WHERE i.CategoryId= c.CategoryId) AS SupplierCount
				from category_master c
				where BrachCode = @bid";
             
            if (!string.IsNullOrWhiteSpace(branchId))
            {
                var sqlParameters = new List<SqlParameter>();
                sqlParameters.Add(new SqlParameter("@bid", branchId));

                IEnumerable<category_master> list = repo.GetWithRawSql(query, sqlParameters.ToArray());
                //IEnumerable<category_master> list = repo.Get(x=>x.BrachCode == branchId);
                var catIds = list.Select(y => y.CategoryId).ToList();
                IEnumerable<subcategory_master> subCatList = subCategory.Get(x=>x.BranchCode == branchId);
                IEnumerable<dynamic> items = itemRepo.GetWithGroupBy(x => x.itemSubCategory, a => new { Count = a.Count(), itemSubCategory = a.Key});
                return new
                {
                    categories = list,
                    subCatList = subCatList,
                    itemsCount = items,
                    maxIds = maxIds
                };
            }
            return null;
        }

        public string UpdateCategoryInfo(category_master item)
        {
            if (item != null)
            {
                //repo.Update(item);
                try
                {
                    DBConnection dbcon = new DBConnection();
                    System.Data.SqlClient.SqlConnection con = dbcon.connection();
                    System.Data.SqlClient.SqlParameter[] parameters = new System.Data.SqlClient.SqlParameter[5];
                    parameters[0] = new System.Data.SqlClient.SqlParameter("@CategoryDesc", item.CategoryDesc);
                    parameters[1] = new System.Data.SqlClient.SqlParameter("@CategoryName", item.CategoryName);
                    parameters[2] = new System.Data.SqlClient.SqlParameter("@CategoryId", item.CategoryId);
                    parameters[3] = new System.Data.SqlClient.SqlParameter("@CMstatus", item.CMstatus);
                    parameters[4] = new System.Data.SqlClient.SqlParameter("@Dept_Id", item.Dept_Id);

                    DBConnection.ExecuteProcedure("[dbo].[SP_Category_Update]", parameters);
                }
                catch (Exception ex)
                {
                    return ex.ToString();
                }
            }

            return item.CategoryId;
        }

        public string UpdateCategoryStatus(string CategoryID)
        {
            string CMStatus = "1";
            if (CategoryID != null)
            {
                string query = @"select c.*,
				(SELECT COUNT(DISTINCT MainSupplier) FROM item_master i WHERE itemSubCategory IN (SELECT item_subCatID FROM subcategory_master s WHERE s.CategoryId= c.CategoryId)) AS SupplierCount
				from category_master c
				where CategoryId = @bid";
                var sqlParameters = new System.Data.SqlClient.SqlParameter[1];
                sqlParameters[0] = new System.Data.SqlClient.SqlParameter("@bid", CategoryID);

                IEnumerable<category_master> list = repo.GetWithRawSql(query, sqlParameters.ToArray());
               
                if (list.First().CMstatus.ToString() == "1")
                    CMStatus = "0";

                try
                {
                    DBConnection dbcon = new DBConnection();
                    System.Data.SqlClient.SqlConnection con = dbcon.connection();
                    System.Data.SqlClient.SqlParameter[] parameters = new System.Data.SqlClient.SqlParameter[2];
                    parameters[0] = new System.Data.SqlClient.SqlParameter("@CMstatus", CMStatus);
                    parameters[1] = new System.Data.SqlClient.SqlParameter("@CategoryId", CategoryID);

                    DBConnection.ExecuteProcedure("[dbo].[SP_Category_StatusUpdate]", parameters);
                }
                catch (Exception ex)
                {
                    return ex.ToString();    
                }
            }

            return CMStatus;
        }
    }
}
