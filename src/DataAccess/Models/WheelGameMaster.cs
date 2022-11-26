using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models
{
    public class WheelGameMaster
    {
        public int WGlID { get; set; }
        public string BranchID{ get; set; }
        public string WGTitle{ get; set; }
        public int ? WGTextSize{ get; set; }
        public int ? SliceRepeat{ get; set; }
        public int ? SpinTime{ get; set; }
        public int ? FairMode{ get; set; }
        public DateTime ? CreateDate{ get; set; }
        public DateTime ? LastUpdateDate{ get; set; }
        public string UserID{ get; set; }
        public string WinnerID{ get; set; }
        public DateTime? WGScheduleTime { get; set; }
        public string WGDescription{ get; set; }
        public string MessageAfterWin{ get; set; }
        public int ? WGStatus{ get; set; }
        public DateTime? LastUse { get; set; }
        public int ? NumberofUsesAllowed{ get; set; }
        public int ? IsActiveOnAndriod{ get; set; }
        public int ? IsActiveOniOS{ get; set; }
        public int? IsActiveOnWeb { get; set; }
    }
}
