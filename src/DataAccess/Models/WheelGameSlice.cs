using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models
{
    public class WheelGameSlice
    {
        public int WGSID { get; set; }
        public int ? WGlID { get; set; }
        public string WGSText { get; set; }
        public string WGSTextColorCode { get; set; }
        public string WGSBackGroudColorCode { get; set; }
        public string ImagePath { get; set; }
        public DateTime ? WGSCreateDate { get; set; }
        public DateTime ? WGSLastUpdateDate { get; set; }
        public string UserID { get; set; }
        public int ? WGSstatus { get; set; }
    }
}
