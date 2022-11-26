using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.DataModel
{
    public class OrderStatus
    {
        public int OrderStatusID { get; set; }
        public string OrderStatusName { get; set; }
        public string Timer { get; set; }
        public string StatusSequence { get; set; }
        public string FontColorCode { get; set; }
        public string BgColorCode { get; set; }
    }
}
