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
    public class OrderRepository : BaseRepository<OnlineOrder>
    {
        BaseRepository<OnlineOrder> repo;
        public OrderRepository()
        {
            repo = new BaseRepository<OnlineOrder>();
        }

        public void AddOrder(OnlineOrder item, string branchCode)
        {
            if (item != null)
            {
                item.CreateAt = DateTime.UtcNow;
                item.BranchCode = branchCode;
                long latestId = getLatestOrderID();
                item.OrderID = latestId++;
                repo.Insert(item);
                repo.Save();
            }
        }

        public void DeleteOrder(string OrderID)
        {
            if (!string.IsNullOrWhiteSpace(OrderID))
            {
                repo.Delete(OrderID);
            }
        }

        public long getLatestOrderID()
        {
            IEnumerable<OnlineOrder> data = repo.GetWithPagination(0, 1, "OrderID", -1, x => x.OrderID != null);
            if (data != null && data.Count() > 0)
            {
                return data.ToList()[0].OrderID;
            }
            return 0;
        }


        public object GetOrdersWithPageSupport(string branchCode, int viewTabId, int start, int limit, string orderCol, int sortOrder, string searchVal)
        {
            if (!string.IsNullOrWhiteSpace(branchCode))
            {
                Expression<Func<OnlineOrder, bool>> filter = x => (x.BranchCode == branchCode);
                Expression<Func<OnlineOrder, bool>> filter1 = null;
                switch (viewTabId)
                {
                    case 1:
                        filter1 = x => (x.OrderStatus == 12);
                        break;
                    case 2:
                        filter1 = x => (x.OrderStatus == 13);
                        break;
                    case 3:
                        filter1 = x => (x.OrderStatus == 14);
                        break;
                    case 4:
                        filter1 = x => (x.OrderStatus == 15);
                        break;
                    case 5:
                        filter1 = x => (x.OrderStatus == 16);
                        break;
                }

                var parameter = Expression.Parameter(typeof(OnlineOrder));

                if (filter1 != null)
                {
                    var leftVisitor = new ReplaceExpressionVisitor(filter.Parameters[0], parameter);
                    var left = leftVisitor.Visit(filter.Body);
                    var rightVisitor = new ReplaceExpressionVisitor(filter1.Parameters[0], parameter);
                    var right = rightVisitor.Visit(filter1.Body);
                    filter = Expression.Lambda<Func<OnlineOrder, bool>>(Expression.AndAlso(left, right), parameter);
                }
                if (!string.IsNullOrWhiteSpace(searchVal))
                {
                    Expression<Func<OnlineOrder, bool>> searchFilter = x => (x.email.Contains(searchVal));

                    var leftVisitor = new ReplaceExpressionVisitor(filter.Parameters[0], parameter);
                    var left = leftVisitor.Visit(filter.Body);
                    var rightVisitor = new ReplaceExpressionVisitor(searchFilter.Parameters[0], parameter);
                    var right = rightVisitor.Visit(searchFilter.Body);
                    filter = Expression.Lambda<Func<OnlineOrder, bool>>(Expression.AndAlso(left, right), parameter);
                }

                if (string.IsNullOrWhiteSpace(orderCol))
                {
                    orderCol = "CreateAt";
                }

                long length = repo.getDataCount(filter);
                List<OnlineOrder> data = repo.GetWithPagination(start, limit, orderCol, sortOrder, filter).ToList();
                return new
                {
                    rows = data,
                    totalRows = length
                };
            }
            return null;
        }


        public object UpdateOrderStatus(string branchid, int id, int status)
        {
            OnlineOrder item = repo.GetById(id);
            item.OrderStatus = status;
            repo.Update(item);
            repo.Save();
            return 1;
        }



        public void EditOrder(OnlineOrder item)
        {
            if (item != null)
            {
                repo.Update(item);
                repo.Save();
            }
        }

        private SqlConnection con;


        //string branchCode, 
        public List<OnlineOrderDetails> GetOrderDetail(int orderId)
        {
            List<OnlineOrderDetails> retData = new List<OnlineOrderDetails>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                //parameters[0] = new SqlParameter("@branchCode", branchCode);
                parameters[0] = new SqlParameter("@orderId", orderId);

                retData = DBConnection.ExecuteProcedureConvertToList<OnlineOrderDetails>("[dbo].[SP_GetOrderDetails]", parameters);

                return retData;
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderlist(string branchCode, OrderList orderList)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[3];
                parameters[0] = new SqlParameter("@branchCode", branchCode);
                parameters[1] = new SqlParameter("@startDate", orderList.startDate);
                parameters[2] = new SqlParameter("@endDate", orderList.endDate);
                //  return DBConnection.ExecuteProcedureReturnDataSet("OK.OrderList", parameters);
                return DBConnection.ExecuteProcedureReturnDataSet("OK.GetOrderlist", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderlistByBranchCodeAsc(string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@branchCode", branchCode);
                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderList_Asc]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderlistByBranchCodeDesc(string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@branchCode", branchCode);
                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderList_Desc]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderDetailsByBranchCodeDesc(string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@branchCode", branchCode);
                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderList_Desc]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderDetailWithSupplierInfo(string itemId, string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];               
                parameters[0] = new SqlParameter("@ItemID", itemId);
                parameters[1] = new SqlParameter("@BranchCode", branchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderDetails_With_SupplierInfo]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderStatus()
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderStatus]");
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetTransactionList(string orderId)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@OrderId", orderId);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetTransactionList]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GeDeliveryManDetails()
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetDeliveryMan_Details]");
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public bool UpdateOnlineOrderStatus(int orderId, int orderStatusId, string userId)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[4];
                parameters[0] = new SqlParameter("@OrderId", orderId);
                parameters[1] = new SqlParameter("@OrderStatus", orderStatusId);
                parameters[2] = new SqlParameter("@UserId", userId);
                parameters[3] = new SqlParameter("@Flag",SqlDbType.Bit);

                parameters[3].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[dbo].[SP_OnlineOrder_Status_Update]", parameters);

                retVAl = (bool)parameters[3].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool UpdateOnlineOrderDeliveryMan(int orderId, string deliveryManId, string userId)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[4];
                parameters[0] = new SqlParameter("@OrderId", orderId);
                parameters[1] = new SqlParameter("@DeliveryManId", deliveryManId);
                parameters[2] = new SqlParameter("@UserId", userId);
                parameters[3] = new SqlParameter("@Flag", SqlDbType.Bit);

                parameters[3].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[dbo].[SP_OnlineOrder_DeliveryMan_Update]", parameters);

                retVAl = (bool)parameters[3].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public dynamic GetSupplierDetails(string suppID, string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@SuppID", suppID);
                parameters[1] = new SqlParameter("@BranchCode", branchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetSupplierDetails]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetSupplierDetailsbybranchCode(string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchID", branchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetSupplierDetailsByBranch]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public bool DeleteSupplierDetails(string suppID)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@SuppID", suppID);
                parameters[1] = new SqlParameter("@Flag", SqlDbType.Bit);

                parameters[1].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[SP_SupplierDetails_Delete]", parameters);

                retVAl = (bool)parameters[1].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public dynamic GetCustomerDetails(int custID, string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@CustID", custID);
                parameters[1] = new SqlParameter("@BranchCode", branchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetCustomerDetails]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetCustomerDetailsbyBranchID(string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", branchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetCustomerDetailsbyBranchCode]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public bool DeleteCustomerDetails(int custID)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@CustID", custID);
                parameters[1] = new SqlParameter("@Flag", SqlDbType.Bit);

                parameters[1].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[dbo].[SP_CustomerDetails_Delete]", parameters);

                retVAl = (bool)parameters[1].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public dynamic CustomerOrderWidget(string CustID, string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@CustID", CustID);
                parameters[1] = new SqlParameter("@BranchCode", branchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_CustomerOrderWidget]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetEmployeeDetails(string ID, string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@ID", ID);
                parameters[1] = new SqlParameter("@BranchCode", branchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetEmployeeDetails]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetEmployeeDetailsbyBranch(string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@BranchCode", branchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetEmployeeDetailsbyBranch]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public bool CreateEmployeeDetails(EmployeeMaster objEmployeeMaster)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[18];
                parameters[0] = new SqlParameter("@id", objEmployeeMaster.id);
                parameters[1] = new SqlParameter("@userName", objEmployeeMaster.userName);
                parameters[2] = new SqlParameter("@passWord", objEmployeeMaster.passWord);
                parameters[3] = new SqlParameter("@userType", objEmployeeMaster.userType);
                parameters[4] = new SqlParameter("@stockView", objEmployeeMaster.stockView);
                parameters[5] = new SqlParameter("@stockSales", objEmployeeMaster.stockSales);
                parameters[6] = new SqlParameter("@CostView", objEmployeeMaster.CostView);
                parameters[7] = new SqlParameter("@GraphView", objEmployeeMaster.GraphView);
                parameters[8] = new SqlParameter("@undercostsale", objEmployeeMaster.undercostsale);
                parameters[9] = new SqlParameter("@branchid", objEmployeeMaster.branchid);
                parameters[10] = new SqlParameter("@EmpCode", objEmployeeMaster.EmpCode);
                parameters[11] = new SqlParameter("@loginstatus", objEmployeeMaster.loginstatus);
                parameters[12] = new SqlParameter("@emailId", objEmployeeMaster.emailId);
                parameters[13] = new SqlParameter("@AccessToken", objEmployeeMaster.AccessToken);                
                parameters[14] = new SqlParameter("@UMID", objEmployeeMaster.UMID);
                parameters[15] = new SqlParameter("@latitude", objEmployeeMaster.latitude);
                parameters[16] = new SqlParameter("@longitude", objEmployeeMaster.longitude);

                parameters[17] = new SqlParameter("@Flag", SqlDbType.Bit);
                parameters[17].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[Employee_Details_Create]", parameters);

                retVAl = (bool)parameters[17].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool UpdateEmployeeDetails(EmployeeMaster objEmployeeMaster)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[18];
                parameters[0] = new SqlParameter("@userName", objEmployeeMaster.userName);
                parameters[1] = new SqlParameter("@passWord", objEmployeeMaster.passWord);
                parameters[2] = new SqlParameter("@userType", objEmployeeMaster.userType);
                parameters[3] = new SqlParameter("@stockView", objEmployeeMaster.stockView);
                parameters[4] = new SqlParameter("@stockSales", objEmployeeMaster.stockSales);
                parameters[5] = new SqlParameter("@CostView", objEmployeeMaster.CostView);
                parameters[6] = new SqlParameter("@GraphView", objEmployeeMaster.GraphView);
                parameters[7] = new SqlParameter("@undercostsale", objEmployeeMaster.undercostsale);
                parameters[8] = new SqlParameter("@branchid", objEmployeeMaster.branchid);
                parameters[9] = new SqlParameter("@EmpCode", objEmployeeMaster.EmpCode);
                parameters[10] = new SqlParameter("@loginstatus", objEmployeeMaster.loginstatus);
                parameters[11] = new SqlParameter("@emailId", objEmployeeMaster.emailId);
                parameters[12] = new SqlParameter("@AccessToken", objEmployeeMaster.AccessToken);
                parameters[13] = new SqlParameter("@OwnerID", objEmployeeMaster.OwnerID);
                parameters[14] = new SqlParameter("@UMID", objEmployeeMaster.UMID);
                parameters[15] = new SqlParameter("@latitude", objEmployeeMaster.latitude);
                parameters[16] = new SqlParameter("@longitude", objEmployeeMaster.longitude);

                parameters[17] = new SqlParameter("@Flag", SqlDbType.Bit);
                parameters[17].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[ok].[Employee_Details_Update]", parameters);

                retVAl = (bool)parameters[17].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool DeleteEmployeeDetails(int ID)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@ID", ID);
                parameters[1] = new SqlParameter("@Flag", SqlDbType.Bit);

                parameters[1].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[dbo].[SP_EmployeeDetails_Delete]", parameters);

                retVAl = (bool)parameters[1].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public bool SupplierUpdateDetails(SupplierUpdate objSupplierUpdate)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[7];
                parameters[0] = new SqlParameter("@suppID", objSupplierUpdate.suppID);
                parameters[1] = new SqlParameter("@suppName", objSupplierUpdate.suppName);
                parameters[2] = new SqlParameter("@suppAdd1", objSupplierUpdate.suppAdd1);
                parameters[3] = new SqlParameter("@suppAdd2", objSupplierUpdate.suppAdd2);
                parameters[4] = new SqlParameter("@suppTele", objSupplierUpdate.suppTele);
                parameters[5] = new SqlParameter("@CostView", objSupplierUpdate.suppEmail);

                parameters[7] = new SqlParameter("@Flag", SqlDbType.Bit);
                parameters[7].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[dbo].[Supplier_Details_Update]", parameters);

                retVAl = (bool)parameters[7].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public dynamic SupplierOrderWidget(string suppID, string branchCode)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[2];
                parameters[0] = new SqlParameter("@suppID", suppID);
                parameters[1] = new SqlParameter("@BranchCode", branchCode);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_SupplierOrderWidget]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public bool UpdateSupplierStatus(string suppID, string branchCode, string suppStatus)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[4];
                parameters[0] = new SqlParameter("@suppID", suppID);
                parameters[1] = new SqlParameter("@branchCode", branchCode);
                parameters[2] = new SqlParameter("@suppStatus", suppStatus);
                parameters[3] = new SqlParameter("@Flag", SqlDbType.Bit);

                parameters[3].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[dbo].[SupplierStatus]", parameters);

                retVAl = (bool)parameters[3].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }

        public dynamic GetOrderDetailsbyPON(int OrderID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@Orderid", OrderID);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderDetailsbyPON]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderDetailsbyCustId(string CustId)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@CustId", CustId);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderDetailsbyCustomerID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }
        
        public dynamic GetSubscriptionDetailsbySupllierID(string SupllierID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@SupplierID", SupllierID);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetSubscriptionDetailsbySupplierID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic GetOrderDetailsbySupllierID(string SupllierID)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@SupplierID", SupllierID);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_GetOrderDetailsbySupplierID]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic TopPurchasedItembyCustomer(string CustId)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@CustId", CustId);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_TopPuchchasedItem]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic TopOrdersbyCustomer(string CustId)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@CustId", CustId);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_TopOrdersbyCustomer]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public dynamic TotalPurchasedAmtbyCustomer(string CustId)
        {
            Dictionary<string, dynamic> retData = new Dictionary<string, dynamic>();
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[1];
                parameters[0] = new SqlParameter("@CustId", CustId);

                return DBConnection.ExecuteProcedureReturnDataSet("[dbo].[SP_TotalPurchaseAmtbyCustomer]", parameters);
            }
            catch (Exception ex)
            {

            }
            return retData;
        }

        public bool UpdateCustomerStatus(string CustId, string branchCode, string CustStatus)
        {
            bool retVAl = false;
            try
            {
                DBConnection dbcon = new DBConnection();
                SqlConnection con = dbcon.connection();
                SqlParameter[] parameters = new SqlParameter[4];
                parameters[0] = new SqlParameter("@CustId", CustId);
                parameters[1] = new SqlParameter("@branchCode", branchCode);
                parameters[2] = new SqlParameter("@CustStatus", CustStatus);
                parameters[3] = new SqlParameter("@Flag", SqlDbType.Bit);

                parameters[3].Direction = ParameterDirection.Output;

                DBConnection.ExecuteProcedure("[dbo].[SP_CustomerStatus]", parameters);

                retVAl = (bool)parameters[3].Value;

                return retVAl;
            }
            catch (Exception ex)
            {

            }

            return retVAl;
        }
    }
}
