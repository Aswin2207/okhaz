using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models
{
    public class EmployeeMaster
    {
        public string id { get; set; }
        public string userName { get; set; }
        public string passWord { get; set; }
        public string userType { get; set; }
        public string stockView { get; set; }
        public string stockSales { get; set; }
        public string CostView { get; set; }
        public string GraphView { get; set; }
        public string undercostsale { get; set; }
        public string branchid { get; set; }
        public string EmpCode { get; set; }
        public string loginstatus { get; set; }
        public string emailId { get; set; }
        public string AccessToken { get; set; }
        public string OwnerID { get; set; }
        public int UMID { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
    }
}
