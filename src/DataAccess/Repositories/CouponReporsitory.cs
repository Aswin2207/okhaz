using Microsoft.Data.SqlClient;
using Okhaz.DataAccess.DataModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Repositories
{
    public class CouponReporsitory:BaseRepository<Coupon_Master>
    {
        private static string couponListQuery = @"select cm.[CMID],[CDID],[DiscountType],[DiscountValue],[CTDescription]
                                                ,[CTStatus],[CMCode],[CMName],[CMDescription],[StartDate]
                                                ,[EndDate],[MinimumPurchaseAmount],[LimitNumberOfUses]
                                                ,[LimitExisitingUserUses],cm.[CreateDate],cm.[CreatedBy]
                                                ,[VStatus],cm.[BranchID],[ImagePath]
                                                from [Coupon_Type] ct  inner join [Coupon_Master] cm on (ct.CMID = cm.CMID)
                                                where cm.[BranchID] = @bid";

        BaseRepository<Coupon_Master> repo;
        BaseRepository<Coupon_Master1> repo1;
        BaseRepository<Coupon_Type> couponType;

        public CouponReporsitory()
        {
            repo = new BaseRepository<Coupon_Master>();
            repo1 = new BaseRepository<Coupon_Master1>();
            couponType = new BaseRepository<Coupon_Type>();
        }

        public void AddCoupon(Coupon_Master item, Coupon_Type type, string branchCode)
        {
            if (item != null)
            {
                item.BranchID = branchCode;
                repo.Insert(item);
                couponType.Insert(type);
                repo.Save();
                couponType.Save();
            }
        }

        public object GetCouponList(string branchCode)
        {
            if (!string.IsNullOrWhiteSpace(branchCode))
            {
                var sqlParameters = new List<SqlParameter>();
                sqlParameters.Add(new SqlParameter("@bid", branchCode));
                List<Coupon_Master1> data = repo1.GetWithRawSql(couponListQuery, sqlParameters.ToArray());
                return new
                {
                    rows = data,
                    total = data.Count
                }
                    ;
            }
            return null;
        }
    }
}
