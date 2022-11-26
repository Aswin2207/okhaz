using Microsoft.Extensions.Configuration;
using DataAccess.DAL;
using DataAccess.DataModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;

namespace DataAccess.Repositories
{
    public class DashboardRepository : BaseRepository<OnlineOrder>
    {
        BaseRepository<OnlineOrder> repo;
        public DashboardRepository()
        {
            repo = new BaseRepository<OnlineOrder>();
        }

        public dynamic GetOrderCountsbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrder_Count]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderPlacedCountsbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderPlaced_Count]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderPlacedFetchbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderPlaced_Fetch]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderPendingCountsbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderPending_Count]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderPendingFetchbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderPending_Fetch]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderDeliveredFetchbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderDelivered_Fetch]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderCancelledFetchbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderCancelled_Fetch]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderProgressCountsbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderProgress_Count]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderTotalbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrder_Total]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetCategoryCountbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetCategoryIDCount]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetSubCategoryCountbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetSubCategoryIDCount]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetCustNameCountbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetCustNameCount]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetSuppNameCountbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetSuppNameCount]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetItemNameCountbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetItemNameCount]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetCustomerFeedBackFetchbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[Ok].[SP_GetCustomerFeedBack_Fetch]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetSupplierReviewFetchbyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[Ok].[SP_GetSupplierReview_Fetch]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderStatusbyOrderID(int OrderID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@Orderid", OrderID);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderStatusbyID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderCountswithDatebyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderCountwithDate]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderRevenueswithDatebyBranchCode(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderTotalwithDate]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }
    }
}