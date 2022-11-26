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
    public class ReportsRepository : BaseRepository<OnlineOrder>
    {
        BaseRepository<OnlineOrder> repo;
        public ReportsRepository()
        {
            repo = new BaseRepository<OnlineOrder>();
        }

        public dynamic OnlineSalesReportByBranch(string FromDate, string ToDate, string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                List<Dictionary<string, string>> outputData = new List<Dictionary<string, string>>();
                Dictionary<string, string> inputt = new Dictionary<string, string>();
                inputt.Add("FromDate", FromDate.Replace('-', '/'));

                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[3];
                parameters[0] = new SqlParameter("@FromDate", FromDate.Replace('-', '/'));
                parameters[1] = new SqlParameter("@ToDate", ToDate.Replace('-', '/'));
                parameters[2] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_OnlineSalesReportbyBranch]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic OnlineSalesReportBySuppID(string FromDate, string ToDate, string BranchCode, string SupplierID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[4];
                parameters[0] = new SqlParameter("@FromDate", FromDate);
                parameters[1] = new SqlParameter("@ToDate", ToDate);
                parameters[2] = new SqlParameter("@BranchCode", BranchCode);
                parameters[3] = new SqlParameter("@SupplierID", SupplierID);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_OnlineSalesReportbySuppID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic OnlineSalesReportByDeliverManID(string FromDate, string ToDate, string BranchCode, string DeliverManID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[4];
                parameters[0] = new SqlParameter("@FromDate", FromDate);
                parameters[1] = new SqlParameter("@ToDate", ToDate);
                parameters[2] = new SqlParameter("@BranchCode", BranchCode);
                parameters[3] = new SqlParameter("@DeliverManID", DeliverManID);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_OnlineSalesReportbyDeliverManID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic OnlineSalesReportByCustomerSale(string FromDate, string ToDate, string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[3];
                parameters[0] = new SqlParameter("@FromDate", FromDate);
                parameters[1] = new SqlParameter("@ToDate", ToDate);
                parameters[2] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_OnlineSalesReportbyCustomerSale]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic OnlineSalesReportByProductCount(string FromDate, string ToDate, string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[3];
                parameters[0] = new SqlParameter("@FromDate", FromDate);
                parameters[1] = new SqlParameter("@ToDate", ToDate);
                parameters[2] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_OnlineSalesReportAllProduct]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetTopSoldItembyBranch(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_OnlineSalesTopSoldItem]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetTopRevItembyBranch(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_OnlineSalesTopRevItem]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetLowRevItembyBranch(string BranchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", BranchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_OnlineSalesLowRevItem]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }
    }
}
