using DataAccess.DataModel;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Repositories
{
    public class SupplierRepository:BaseRepository<Supplier_master>
    {
        BaseRepository<Supplier_master> repo;
        public SupplierRepository()
        {
            repo = new BaseRepository<Supplier_master>();
        }

        string query = @"select distinct suppID,suppName,suppAdd1,suppAdd2,suppTele,suppFax,
                        suppMob,suppEmail,suppWeb,accountName,creditLimit,paymentMode,
                        nofOfdays,OpeningBalance,OpeningBalanceDate,s.LedgerCode,
                        suppStatus,emirates,BranchId,SubscriptionValidityFrom,SubscriptionValidityUpTo from supplier_master  s
                        left join item_master on(MainSupplier = suppID)
                        where CategoryId= @catId and BranchId = @bid";

        public object GetSupplierInfo(string branchId,string catId)
        {
            if (!string.IsNullOrWhiteSpace(branchId))
            {
                var sqlParameters = new List<SqlParameter>();
                sqlParameters.Add(new SqlParameter("@catId", catId));
                sqlParameters.Add(new SqlParameter("@bid", branchId));

                List<Supplier_master> list = repo.GetWithRawSql(query, sqlParameters.ToArray());
                return list;
            }
            return null;
        }

        public bool SaveBrandInfo(user_manager user, Brand_master[] brand)
        {
            if (brand != null)
            {
                //foreach (Brand_master b in brand)
                //{
                //    b.branchcode = user.branchid;
                //    b.UserID = user.id;
                //    b.createdate = DateTime.UtcNow;
                //    b.LastUpdateDate = DateTime.UtcNow;
                //    b.BrandId = user.branchid + "BM" + b.BrandId;
                //    repo.dbSet.Add(b);
                //}
                repo.Save();
                return true;
            }
            return false;
        }

    }
}
