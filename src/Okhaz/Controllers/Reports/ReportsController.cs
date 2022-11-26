using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.Models.Common;

namespace Okhaz.Controllers.Reports
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private ReportsRepository repo;

        public ReportsController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new ReportsRepository();
        }

        /// <summary>
        /// Get Online Sales Low Revenue Item by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetLowRevItembyBranch")]
        public object GetLowRevItembyBranch()
        {
            object products = repo.GetLowRevItembyBranch(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Online Sales Top Revenue Item by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetTopRevItembyBranch")]
        public object GetTopRevItembyBranch()
        {
            object products = repo.GetTopRevItembyBranch(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Online Sales Top Sold Item by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetTopSoldItembyBranch")]
        public object GetTopSoldItembyBranch()
        {
            object products = repo.GetTopSoldItembyBranch(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Online Sales Report Join Deliveryman Name By Branch, Order By Ordered Date ASC
        /// </summary>
        /// <param name="FromDate"></param>
        /// <param name="ToDate"></param>
        /// <param name="branchID"></param>
        /// <returns></returns>
        [HttpGet("OnlineSalesReportByBranch/{FromDate}/{ToDate}")]
        public object OnlineSalesReportByBranch(string FromDate, string ToDate)
        {
            object products = repo.OnlineSalesReportByBranch(FromDate, ToDate, userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Online Sales Report Customer Top Sales By Branch, Order By Total Sale of Customer ASC
        /// </summary>
        /// <param name="FromDate"></param>
        /// <param name="ToDate"></param>
        /// <param name="branchID"></param>
        /// <returns></returns>
        [HttpGet("OnlineSalesReportByCustomerSale/{FromDate}/{ToDate}")]
        public object OnlineSalesReportByCustomerSale(string FromDate, string ToDate)
        {
            object products = repo.OnlineSalesReportByCustomerSale(FromDate, ToDate, userIdentity.BranchId);
            return (products);
        }

        /// <summary> Online Sales Report Join Deliveryman Name By Branch Order & By DeliveryManID,
        /// Order By Ordered Date ASC </summary> <param name="FromDate"></param> <param
        /// name="ToDate"></param> <param name="branchID"></param> <param
        /// name="DeliveryManID"></param> <returns></returns>
        [HttpGet("OnlineSalesReportByDeliverManID/{FromDate}/{ToDate}/{DeliveryManID}")]
        public object OnlineSalesReportByDeliverManID(string FromDate, string ToDate, string DeliveryManID)
        {
            object products = repo.OnlineSalesReportByDeliverManID(FromDate, ToDate, userIdentity.BranchId, DeliveryManID);
            return (products);
        }

        /// <summary>
        /// Online Sales Report By Branch - Top Selling Product Count by Supplier Name and Item Name
        /// with Quanity * Price
        /// </summary>
        /// <param name="FromDate"></param>
        /// <param name="ToDate"></param>
        /// <param name="branchID"></param>
        /// <returns></returns>
        [HttpGet("OnlineSalesReportByProductCount/{FromDate}/{ToDate}")]
        public object OnlineSalesReportByProductCount(string FromDate, string ToDate)
        {
            object products = repo.OnlineSalesReportByProductCount(FromDate, ToDate, userIdentity.BranchId);
            return (products);
        }

        /// <summary> Online Sales Report By Branch Order & By SupplierID, Order By Ordered Date ASC
        /// </summary> <param name="FromDate"></param> <param name="ToDate"></param> <param
        /// name="branchID"></param> <param name="SupplierID"></param> <returns></returns>
        [HttpGet("OnlineSalesReportBySuppID/{FromDate}/{ToDate}/{SupplierID}")]
        public object OnlineSalesReportBySuppID(string FromDate, string ToDate, string SupplierID)
        {
            object products = repo.OnlineSalesReportBySuppID(FromDate, ToDate, userIdentity.BranchId, SupplierID);
            return (products);
        }
    }
}
