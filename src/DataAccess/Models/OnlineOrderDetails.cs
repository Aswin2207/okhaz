using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models
{

    public class OnlineOrderDetails
    {
        public int? OrderItemId { get; set; }

        public string ItemId { get; set; }

        public int? OrderId { get; set; }

        public string Sku { get; set; }

        public float? Price { get; set; }

        public float? Discount { get; set; }

        public int? Quantity { get; set; }

        public DateTime? CreateAt { get; set; }

        public DateTime? UpdateAt { get; set; }

        public string Content { get; set; }

        public string BranchCode { get; set; }

        public string OrderItemStatus { get; set; }

        public string SupplierID { get; set; }

        public string SplitOrderStatus { get; set; }

        public int? SubOrderNumber { get; set; }

        public DateTime? LastUpdate { get; set; }

        public string itemName { get; set; }

        public string image_url { get; set; }

        public string suppName { get; set; }

        public string suppAdd1 { get; set; }

        public string suppAdd2 { get; set; }

        public string suppTele { get; set; }

        public string UOM_Name { get; set; }
    }
}
