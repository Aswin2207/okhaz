using System;

namespace Okhaz.Models.Response.Branch
{
    public class BranchDetails
    {
        public string Address { get; set; }
        public string BranchAvatar { get; set; }
        public string branchid { get; set; }

        public string branchname { get; set; }

        public string BranchStatus { get; set; }
        public string BranchWebSliderPath { get; set; }
        public string contactperson { get; set; }
        public DateTime? createdate { get; set; }
        public string Currency { get; set; }
        public string FTPPassword { get; set; }
        public string FTPUserID { get; set; }
        public string GetReelLocationPath { get; set; }
        public DateTime? LastUpdateDate { get; set; }
        public string location { get; set; }
        public string OnlineBannerHttpPath { get; set; }
        public string OnlineBannerPath { get; set; }
        public string OnlineBillPath { get; set; }
        public string shopnameL1 { get; set; }
        public string shopnameL2 { get; set; }
        public DateTime? SubscriptionValidityFrom { get; set; }
        public DateTime? SubscriptionValidityUpTo { get; set; }
        public string trnNo { get; set; }
        public string UserID { get; set; }
    }
}
