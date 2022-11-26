namespace Okhaz.DataAccess.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("SQLDBA.Coupon_Master")]
    public partial class Coupon_Master
    {
        [Key]
        public long CMID { get; set; }

        [Required]
        [StringLength(150)]
        public string CMCode { get; set; }

        [Required]
        [StringLength(250)]
        public string CMName { get; set; }

        [StringLength(500)]
        public string CMDescription { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public long? MinimumPurchaseAmount { get; set; }

        public int? LimitNumberOfUses { get; set; }

        public int? LimitExisitingUserUses { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(20)]
        public string CreatedBy { get; set; }

        public int? VStatus { get; set; }

        [StringLength(100)]
        public string BranchID { get; set; }

        public string ImagePath { get; set; }

    }

    public partial class Coupon_Master1
    {
        public long CMID { get; set; }

        public string CMCode { get; set; }

        public string CMName { get; set; }

        public string CMDescription { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public long? MinimumPurchaseAmount { get; set; }

        public int? LimitNumberOfUses { get; set; }

        public int? LimitExisitingUserUses { get; set; }

        public DateTime? CreateDate { get; set; }
        public string CreatedBy { get; set; }
        public int? VStatus { get; set; }
        public string BranchID { get; set; }

        public string ImagePath { get; set; }

        public long CDID { get; set; }

        public string DiscountType { get; set; }

        public long? DiscountValue { get; set; }

        public string CTDescription { get; set; }

        public int? CTStatus { get; set; }

    }
}
