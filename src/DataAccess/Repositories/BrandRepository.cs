using DataAccess.DataModel;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;

namespace DataAccess.Repositories
{
    public class BrandRepository : BaseRepository<Brand_master>
    {
        private string query = @"select  count(itemID) as ProductCount,max(brandname) as BrandName,
                        max(branddesc) as BrandDesc,BrandId,max(createdate) as createdate,max(LastUpdateDate) as LastUpdateDate,
                        max(UserID) as UserID,max(LastUpdatedUserID) as LastUpdatedUserID,max(b.branchcode) as branchcode  from Brand_master  b
                        left join item_master on(brand = brandid)
                        where b.branchcode=@branchId  group by brandid";

        private BaseRepository<Brand_master> repo;

        public BrandRepository()
        {
            repo = new BaseRepository<Brand_master>();
        }

        public object GetBrandInfo(string branchId)
        {
            if (!string.IsNullOrWhiteSpace(branchId))
            {
                var sqlParameters = new List<SqlParameter>();
                sqlParameters.Add(new SqlParameter("@branchId", branchId));
                List<Brand_master> list = repo.GetWithRawSql(query, sqlParameters.ToArray());
                return new
                {
                    rows = list,
                    totalRows = list.Count
                };
            }
            return null;
        }

        public object GetDepartmentInfo(string branchId)
        {
            BaseRepository<DepartmentList> repo2 = new BaseRepository<DepartmentList>();
            string query2 = @"select  Dpt_Id AS DepartmentId, Dtp_Name AS Name  from Department_master  b
                        where b.BranchId=@branchId";

            if (!string.IsNullOrWhiteSpace(branchId))
            {
                var sqlParameters = new List<SqlParameter>();
                sqlParameters.Add(new SqlParameter("@branchId", branchId));
                List<DepartmentList> list = repo2.GetWithRawSql(query2, sqlParameters.ToArray());
                return new
                {
                    rows = list,
                    totalRows = list.Count
                };
            }
            return null;
        }

        public bool SaveBrandInfo(string userId, string userBranchId, Brand_master[] brand)
        {
            if (brand != null)
            {
                foreach (Brand_master b in brand)
                {
                    b.branchcode = userBranchId;
                    b.UserID = userId;
                    b.createdate = DateTime.UtcNow;
                    b.LastUpdateDate = DateTime.UtcNow;
                    b.BrandId = userBranchId + "BM" + b.BrandId;
                    repo.dbSet.Add(b);
                }
                repo.Save();
                return true;
            }
            return false;
        }
    }
}
