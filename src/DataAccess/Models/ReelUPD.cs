using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models
{
    public class ReelUPD
    {
        public int? ReelID { get; set; }
        public string ReelTitle { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? LastUpdateDate { get; set; }
        public string ReelLocation { get; set; }
        public string Filename { get; set; }
        public string Fileheight { get; set; }
        public string Filewidth { get; set; }
        public string Filesize { get; set; }
        public string DeviceName { get; set; }
    }
}
