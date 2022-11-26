namespace DataAccess.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

   
    public partial class branch_master
    {
        [Key]
        [StringLength(50)]
        public string branchid { get; set; }

        [StringLength(50)]
        public string branchname { get; set; }

        [StringLength(100)]
        public string location { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        [StringLength(25)]
        public string contactperson { get; set; }

        [StringLength(20)]
        public string trnNo { get; set; }

        [StringLength(100)]
        public string shopnameL1 { get; set; }

        [StringLength(100)]
        public string shopnameL2 { get; set; }

        public DateTime? createdate { get; set; }

        public DateTime? LastUpdateDate { get; set; }

        [StringLength(50)]
        public string UserID { get; set; }

        [StringLength(500)]
        public string OnlineBillPath { get; set; }

        [StringLength(500)]
        public string OnlineBannerPath { get; set; }

        [StringLength(30)]
        public string FTPUserID { get; set; }

        [StringLength(50)]
        public string FTPPassword { get; set; }

        public DateTime? SubscriptionValidityFrom { get; set; }

        public DateTime? SubscriptionValidityUpTo { get; set; }

        [StringLength(7)]
        public string BranchStatus { get; set; }

        public string BranchAvatar { get; set; }

        public string BranchWebSliderPath { get; set; }
        public string OnlineBannerHttpPath { get; set; }

        public string GetReelLocationPath { get; set; }
        public string Currency { get; set; }
    }
}
