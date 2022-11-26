using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.DataModel
{
    public class Employee_Attendance
    {
        public string Aid { get; set; }
        public string UserId { get; set; }
        public int SignInValue { get; set; }
        public DateTime SignInDateTime { get; set; }
        public int SignOutValue { get; set; }
        public DateTime SignOutDateTime { get; set; }
        public int OrderCount { get; set; }
        public string Remark { get; set; }
        public string Barchcode { get; set; }
    }
}
