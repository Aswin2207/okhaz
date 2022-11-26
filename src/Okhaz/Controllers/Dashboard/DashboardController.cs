using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Okhaz.Models.Common;

namespace Okhaz.Controllers.Dashboard
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly UserIdentity userIdentity;
        private DashboardRepository repo;

        public DashboardController(UserIdentity userIdentity)
        {
            this.userIdentity = userIdentity;
            repo = new DashboardRepository();
        }

        /// <summary>
        /// Get Category Count by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetCategoryCountbyBranchCode")]
        public object GetCategoryCountbyBranchCode()
        {
            object products = repo.GetCategoryCountbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get CustName Count by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetCustNameCountbyBranchCode")]
        public object GetCustNameCountbyBranchCode()
        {
            object products = repo.GetCustNameCountbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Customer FeedBack Fetch by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetCustomerFeedBackFetchbyBranchCode")]
        public object GetCustomerFeedBackFetchbyBranchCode()
        {
            object products = repo.GetCustomerFeedBackFetchbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get ItemName Count by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetItemNameCountbyBranchCode")]
        public object GetItemNameCountbyBranchCode()
        {
            object products = repo.GetItemNameCountbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Cancelled Fetch by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetOrderCancelledFetchbyBranchCode")]
        public object GetOrderCancelledFetchbyBranchCode()
        {
            object products = repo.GetOrderCancelledFetchbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Counts by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetOrderCountsbyBranchCode")]
        public object GetOrderCountsbyBranchCode()
        {
            object products = repo.GetOrderCountsbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Counts with Date by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetOrderCountswithDatebyBranchCode")]
        public object GetOrderCountswithDatebyBranchCode()
        {
            object products = repo.GetOrderCountswithDatebyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Delivered Fetch by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetOrderDeliveredFetchbyBranchCode")]
        public object GetOrderDeliveredFetchbyBranchCode()
        {
            object products = repo.GetOrderDeliveredFetchbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Pending Counts by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetOrderPendingCountsbyBranchCode")]
        public object GetOrderPendingCountsbyBranchCode()
        {
            object products = repo.GetOrderPendingCountsbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Pending Fetch by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetOrderPendingFetchbyBranchCode")]
        public object GetOrderPendingFetchbyBranchCode()
        {
            object products = repo.GetOrderPendingFetchbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Placed Counts by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetOrderPlacedCountsbyBranchCode")]
        public object GetOrderPlacedCountsbyBranchCode()
        {
            object products = repo.GetOrderPlacedCountsbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Placed Fetch by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetOrderPlacedFetchbyBranchCode")]
        public object GetOrderPlacedFetchbyBranchCode()
        {
            object products = repo.GetOrderPlacedFetchbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Progress Counts by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetOrderProgressCountsbyBranchCode")]
        public object GetOrderProgressCountsbyBranchCode()
        {
            object products = repo.GetOrderProgressCountsbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Revenue with Date by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetOrderRevenueswithDatebyBranchCode")]
        public object GetOrderRevenueswithDatebyBranchCode()
        {
            object products = repo.GetOrderRevenueswithDatebyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Total by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetOrderTotalbyBranchCode")]
        public object GetOrderTotalbyBranchCode()
        {
            object products = repo.GetOrderTotalbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Category Count by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetSubCategoryCountbyBranchCode")]
        public object GetSubCategoryCountbyBranchCode()
        {
            object products = repo.GetSubCategoryCountbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Supplier Review Fetch by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetSupplierReviewFetchbyBranchCode")]
        public object GetSupplierReviewFetchbyBranchCode()
        {
            object products = repo.GetSupplierReviewFetchbyBranchCode(userIdentity.BranchId);
            return (products);
        }

        /// <summary>
        /// Get Order Status Name by Order ID
        /// </summary>
        /// <param name="OrderID"></param>
        /// <returns></returns>
        [HttpGet("GetOrderStatusbyOrderID/{OrderID}")]
        public object GetSupplierReviewFetchbyBranchCode(int OrderID)
        {
            object products = repo.GetOrderStatusbyOrderID(OrderID);
            return (products);
        }

        /// <summary>
        /// Get SuppName Count by BranchCode
        /// </summary>
        /// <param name="branchid"></param>
        /// <returns></returns>
        [HttpGet("GetSuppNameCountbyBranchCode")]
        public object GetSuppNameCountbyBranchCode()
        {
            object products = repo.GetSuppNameCountbyBranchCode(userIdentity.BranchId);
            return (products);
        }
    }
}
