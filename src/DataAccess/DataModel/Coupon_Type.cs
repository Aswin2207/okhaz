namespace Okhaz.DataAccess.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("SQLDBA.Coupon_Type")]
    public partial class Coupon_Type
    {
        public long? CMID { get; set; }

        [Key]
        public long CDID { get; set; }

        [Required]
        [StringLength(300)]
        public string DiscountType { get; set; }

        public long? DiscountValue { get; set; }

        [StringLength(300)]
        public string CTDescription { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(20)]
        public string CreatedBy { get; set; }

        public int? CTStatus { get; set; }

        [StringLength(100)]
        public string BranchID { get; set; }

    }
}
