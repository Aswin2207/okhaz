using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models
{
    public class ReelCU
    {
        public string BranchID { get; set; }
        public string ReelTitle { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? LastUpdateDate { get; set; }
        public string UserID { get; set; }
        public string ReelLocation { get; set; }
        public int? ReelStatus { get; set; }
        public int? ReelViewCount { get; set; }
        public string Filename { get; set; }
        public string Fileheight { get; set; }
        public string Filewidth { get; set; }
        public string Filesize { get; set; }
        public string DeviceName { get; set; }
    }
}
