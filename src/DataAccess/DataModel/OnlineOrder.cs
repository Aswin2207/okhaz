namespace DataAccess.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("OnlineOrder")]
    [Microsoft.EntityFrameworkCore.Keyless]
    public  class OnlineOrder
    {
        [Key]
        public long OrderID { get; set; }

        [StringLength(25)]
        public string CustId { get; set; }

        [StringLength(100)]
        public string sessionId { get; set; }

        [StringLength(100)]
        public string token { get; set; }

        public int? OrderStatus { get; set; }

        public double? SubTotal { get; set; }

        public double? ItemDiscount { get; set; }

        public double? tax { get; set; }

        public double? shipping { get; set; }

        public double? Total { get; set; }

        [StringLength(50)]
        public string Promo { get; set; }

        public double? discount { get; set; }

        public double? grandtotal { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string MiddleName { get; set; }

        [StringLength(20)]
        public string Mobile { get; set; }

        [StringLength(100)]
        public string email { get; set; }

        [StringLength(200)]
        public string AddressLine1 { get; set; }

        [StringLength(200)]
        public string AddressLine2 { get; set; }

        [StringLength(100)]
        public string City { get; set; }

        [StringLength(100)]
        public string Province { get; set; }

        [StringLength(100)]
        public string country { get; set; }

        public DateTime? CreateAt { get; set; }

        public DateTime? UpdateAt { get; set; }

        public string Contect { get; set; }

        [StringLength(50)]
        public string DeviceName { get; set; }

        [StringLength(50)]
        public string DeliveryMan { get; set; }

        [StringLength(25)]
        public string BranchCode { get; set; }

        public int? OrderPlacedMailSent { get; set; }

        [StringLength(100)]
        public string latitude { get; set; }

        [StringLength(100)]
        public string longitude { get; set; }

        [StringLength(20)]
        public string OrderTransactionType { get; set; }
    }
}
