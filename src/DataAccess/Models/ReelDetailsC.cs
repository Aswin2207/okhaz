using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Repositories
{
    public class ReelDetailsC
    {
        public int? ReelID { get; set; }
        public string BranchID { get; set; }
        public string WhoView_UserID { get; set; }
        public DateTime? LastViewDate { get; set; }
        public int? ReelDetailStatus { get; set; }
    }
}
