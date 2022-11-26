using DataAccess.DataModel;
using DataAccess.Models;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.Models;
using Okhaz.Models.Common;
using System;

namespace Okhaz.Controllers.Orders
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private OrderRepository repo;

        public OrderController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new OrderRepository();
        }

        /// <summary>
        /// takes login model, which should contain user name and password with base 64 encrypted
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("AddOrder")]
        public object AddOrder(OnlineOrder id)
        {
            repo.AddOrder(id, userIdentity.BranchId);
            return ("success");
        }

        /// <summary>
        /// Creating EmployeeDetails
        /// </summary>
        /// <param name="objEmployeeMaster"></param>
        /// <returns></returns>
        [HttpPost("CreateEmployeeDetails")]
        public object CreateEmployeeDetails([FromBody] EmployeeMaster objEmployeeMaster)
        {
            object products = repo.CreateEmployeeDetails(objEmployeeMaster);
            return (products);
        }

        /// <summary>
        /// Widget Customer Orders
        /// </summary>
        /// <param name="CustID"></param>
        /// <param name="branchCode"></param>
        /// <returns></returns>
        [HttpGet("CustomerOrderWidget/{CustID}")]
        public object CustomerOrderWidget(string CustID)
        {
            object products = repo.CustomerOrderWidget(CustID, userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Delete Employee Details Details by wGlID
        /// </summary>
        /// <param name="custID"></param>
        /// <returns></returns>
        [HttpDelete("DeleteEmployeeDetails/{ID}")]
        public object DeleteEmployeeDetails(int ID)
        {
            object products = repo.DeleteEmployeeDetails(ID);
            return (products);
        }

        [HttpDelete("DeleteOrder")]
        public object DeleteOrder(string id)
        {
            repo.DeleteOrder(id);
            return Ok();
        }

        /// <summary>
        /// Delete Supplier Details Details by SuppID
        /// </summary>
        /// <param name="suppID"></param>
        /// <returns></returns>
        [HttpDelete("DeleteSupplierDetails/{suppID}")]
        public object DeleteSupplierDetails(string suppID)
        {
            object products = repo.DeleteSupplierDetails(suppID);
            return (products);
        }

        /// <summary>
        /// Delete Customer Details Details by wGlID
        /// </summary>
        /// <param name="custID"></param>
        /// <returns></returns>
        [HttpDelete("DeleteCustomerDetails/{custID}")]
        public object DeleteSupplierDetails(int custID)
        {
            object products = repo.DeleteCustomerDetails(custID);
            return (products);
        }

        [HttpPost("EditOrder")]
        public object EditOrder(OnlineOrder id)
        {
            repo.EditOrder(id);
            return Ok();
        }

        /// <summary>
        /// Getting Delivery Man Details
        /// </summary>
        /// <returns></returns>
        [HttpGet("GeDeliveryManDetails")]
        public object GeDeliveryManDetails()
        {
            object orderStatus = repo.GeDeliveryManDetails();
            return (orderStatus);
        }

        /// <summary>
        /// Getting Customer Details
        /// </summary>
        /// <param name="suppID"></param>
        /// <param name="branchCode"></param>
        /// <returns></returns>
        [HttpGet("GetCustomerDetails/{custID}")]
        public object GetCustomerDetails(int custID)
        {
            object products = repo.GetCustomerDetails(custID, userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Getting Customer Details By Branch
        /// </summary>
        /// <param name="branchCode"></param>
        /// <returns></returns>
        [HttpGet("GetCustomerDetailsbyBranchID")]
        public object GetCustomerDetailsbyBranchID()
        {
            object products = repo.GetCustomerDetailsbyBranchID(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Getting Employee Details
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="branchCode"></param>
        /// <returns></returns>
        [HttpGet("GetEmployeeDetails/{ID}")]
        public object GetEmployeeDetails(string ID)
        {
            object products = repo.GetEmployeeDetails(ID, userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Getting Employee Details By Branch
        /// </summary>
        /// <param name="branchCode"></param>
        /// <returns></returns>
        [HttpGet("GetEmployeeDetailsbyBranch")]
        public object GetEmployeeDetailsbyBranch()
        {
            object products = repo.GetEmployeeDetailsbyBranch(userIdentity.BranchId);
            return (products);
        }

        [HttpGet("GetOrderDetail/{id}")]
        public object GetOrderDetail(int id)
        {
            var products = repo.GetOrderDetail(id);
            return (products);
        }

        /// <summary>
        /// Getting Order Details By CustomerID
        /// </summary>
        /// <param name="CustId"></param>
        /// <returns></returns>
        [HttpGet("GetOrderDetailsbyCustId/{CustId}")]
        public object GetOrderDetailsbyCustId(string CustId)
        {
            object products = repo.GetOrderDetailsbyCustId(CustId);
            return (products);
        }

        /// <summary>
        /// Getting Order Details By POM
        /// </summary>
        /// <param name="OrderID"></param>
        /// <returns></returns>
        [HttpGet("GetOrderDetailsbyPON/{OrderID}")]
        public object GetOrderDetailsbyPON(int OrderID)
        {
            object products = repo.GetOrderDetailsbyPON(OrderID);
            return (products);
        }

        /// <summary>
        /// Getting Order Details By Supllier ID
        /// </summary>
        /// <param name="SupllierID"></param>
        /// <returns></returns>
        [HttpGet("GetOrderDetailsbySupllierID/{SupllierID}")]
        public object GetOrderDetailsbySupllierID(string SupllierID)
        {
            object products = repo.GetOrderDetailsbySupllierID(SupllierID);
            return (products);
        }

        /// <summary>
        /// Getting Order Details along with Supplier Information
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        [HttpGet("GetOrderDetailWithSupplierInfo/{itemId}")]
        public object GetOrderDetailWithSupplierInfo(string itemId)
        {
            object products = repo.GetOrderDetailWithSupplierInfo(itemId, userIdentity.BranchId);
            return (products);
        }

        [HttpPost("GetOrderlist")]
        public object GetOrderlist([FromBody] OrderList orderList)
        {
            object products = repo.GetOrderlist(userIdentity.BranchId, orderList);
            return (products);
        }

        /// <summary>
        /// Getting Order List
        /// </summary>
        /// <param name="branchCode"></param>
        /// <returns></returns>
        [HttpGet("GetOrderlistAsc/{branchCode}")]
        public object GetOrderlistAsc(string branchCode)
        {
            object products = repo.GetOrderlistByBranchCodeAsc(branchCode);
            return (products);
        }

        /// <summary>
        /// Getting Order List
        /// </summary>
        /// <param name="branchCode"></param>
        /// <returns></returns>
        [HttpGet("GetOrderlistDesc/{branchCode}")]
        public object GetOrderlistDesc(string branchCode)
        {
            object products = repo.GetOrderlistByBranchCodeDesc(userIdentity.BranchId);
            return (products);
        }

        [HttpPost("GetOrders/{id}")]
        public object GetOrders(int id, GridModel data)
        {
            object products = repo.GetOrdersWithPageSupport(userIdentity.BranchId, id, data.start, data.limit, data.sortCol, data.sortOrder, data.searchVal);
            return (products);
        }

        /// <summary>
        /// Getting Order Status
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetOrderStatus")]
        public object GetOrderStatus()
        {
            object orderStatus = repo.GetOrderStatus();
            return (orderStatus);
        }

        /// <summary>
        /// Getting Order Details By Supllier ID
        /// </summary>
        /// <param name="SupllierID"></param>
        /// <returns></returns>
        [HttpGet("GetSubscriptionDetailsbySupllierID/{SupllierID}")]
        public object GetSubscriptionDetailsbySupllierID(string SupllierID)
        {
            object products = repo.GetSubscriptionDetailsbySupllierID(SupllierID);
            return (products);
        }

        /// <summary>
        /// Getting Supplier Details
        /// </summary>
        /// <param name="suppID"></param>
        /// <param name="branchCode"></param>
        /// <returns></returns>
        [HttpGet("GetSupplierDetails/{suppID}")]
        public object GetSupplierDetails(string suppID)
        {
            object products = repo.GetSupplierDetails(suppID, userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Getting Supplier Details By Branch
        /// </summary>
        /// <param name="branchCode"></param>
        /// <returns></returns>
        [HttpGet("GetSupplierDetailsbybranchCode")]
        public object GetSupplierDetailsbybranchCode(string branchCode)
        {
            object products = repo.GetSupplierDetailsbybranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Getting Transaction List by Order Id
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        [HttpGet("GetTransactionList/{orderId}")]
        public object GetTransactionList(string orderId)
        {
            try
            {
                object transactionList = repo.GetTransactionList(orderId);
                return (transactionList);
            }
            catch (Exception ex)
            {
                return BadRequest("No result found.");
            }
        }

        /// <summary>
        /// Widget Supplier Orders
        /// </summary>
        /// <param name="suppID"></param>
        /// <param name="branchCode"></param>
        /// <returns></returns>
        [HttpGet("SupplierOrderWidget/{suppID}")]
        public object SupplierOrderWidget(string suppID)
        {
            object products = repo.SupplierOrderWidget(suppID, userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Updating SupplierUpdateDetails
        /// </summary>
        /// <param name="objSupplierUpdate"></param>
        /// <returns></returns>
        [HttpPost("SupplierUpdateDetails")]
        public object SupplierUpdateDetails([FromBody] SupplierUpdate objSupplierUpdate)
        {
            object products = repo.SupplierUpdateDetails(objSupplierUpdate);
            return (products);
        }

        /// <summary>
        /// Getting Top 10 Orders by Customer
        /// </summary>
        /// <param name="CustId"></param>
        /// <returns></returns>
        [HttpGet("TopOrdersbyCustomer/{CustId}")]
        public object TopOrdersbyCustomer(string CustId)
        {
            object products = repo.TopOrdersbyCustomer(CustId);
            return (products);
        }

        /// <summary>
        /// Getting Top 10 Purchased Item by Customer
        /// </summary>
        /// <param name="CustId"></param>
        /// <returns></returns>
        [HttpGet("TopPurchasedItembyCustomer/{CustId}")]
        public object TopPurchasedItembyCustomer(string CustId)
        {
            object products = repo.TopPurchasedItembyCustomer(CustId);
            return (products);
        }

        /// <summary>
        /// Getting Total Purchased Amt by Customer
        /// </summary>
        /// <param name="CustId"></param>
        /// <returns></returns>
        [HttpGet("TotalPurchasedAmtbyCustomer/{CustId}")]
        public object TotalPurchasedAmtbyCustomer(string CustId)
        {
            object products = repo.TotalPurchasedAmtbyCustomer(CustId);
            return (products);
        }

        /// <summary>
        /// Updating Customer Status
        /// </summary>
        /// <param name="CustId"></param>
        /// <param name="branchCode"></param>
        /// <param name="suppStatus"></param>
        /// <returns></returns>
        [HttpPost("UpdateCustomerStatus/{CustId}/{CustStatus}")]
        public object UpdateCustomerStatus(string CustId, string CustStatus)
        {
            object products = repo.UpdateCustomerStatus(CustId, userIdentity.BranchId, CustStatus);
            return (products);
        }

        /// <summary>
        /// Updating EmployeeDetails
        /// </summary>
        /// <param name="objEmployeeMaster"></param>
        /// <returns></returns>
        [HttpPost("UpdateEmployeeDetails")]
        public object UpdateEmployeeDetails([FromBody] EmployeeMaster objEmployeeMaster)
        {
            object products = repo.UpdateEmployeeDetails(objEmployeeMaster);
            return (products);
        }

        /// <summary>
        /// Updating Online Order Status Update
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="deliveryManId"></param>
        /// <returns></returns>
        [HttpPost("UpdateOnlineOrderDeliveryMan/{orderId}/{deliveryManId}")]
        public object UpdateOnlineOrderDeliveryMan(int orderId, string deliveryManId)
        {
            object products = repo.UpdateOnlineOrderDeliveryMan(orderId, deliveryManId, userIdentity.UserId);
            return (products);
        }

        /// <summary>
        /// Updating Online Order Status Update
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="orderStatusId"></param>
        /// <returns></returns>
        [HttpPost("UpdateOnlineOrderStatus/{orderId}/{orderStatusId}")]
        public object UpdateOnlineOrderStatus(int orderId, int orderStatusId)
        {
            object products = repo.UpdateOnlineOrderStatus(orderId, orderStatusId, userIdentity.UserId);
            return (products);
        }

        [HttpPut("UpdateOrderStatus/{id}")]
        public object UpdateOrderStatus(int id, int status)
        {
            object products = repo.UpdateOrderStatus(userIdentity.BranchId, id, status);
            return (products);
        }

        /// <summary>
        /// Updating Supplier Status
        /// </summary>
        /// <param name="suppID"></param>
        /// <param name="branchCode"></param>
        /// <param name="suppStatus"></param>
        /// <returns></returns>
        [HttpPost("UpdateSupplierStatus/{suppID}/{suppStatus}")]
        public object UpdateSupplierStatus(string suppID, string suppStatus)
        {
            object products = repo.UpdateSupplierStatus(suppID, userIdentity.BranchId, suppStatus);
            return (products);
        }
    }
}
