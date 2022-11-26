namespace DataAccess.DataModel
{
    using System.ComponentModel.DataAnnotations;

    public class user_manager
    {
        public string AccessToken { get; set; }

        [StringLength(20)]
        public string branchid { get; set; }

        [StringLength(20)]
        public string CostView { get; set; }

        [Required]
        [StringLength(320)]
        public string emailId { get; set; }

        [StringLength(50)]
        public string EmpCode { get; set; }

        [StringLength(20)]
        public string GraphView { get; set; }

        [StringLength(50)]
        public string id { get; set; }

        [StringLength(20)]
        public string loginstatus { get; set; }

        [StringLength(100)]
        public string passWord { get; set; }

        [StringLength(20)]
        public string stockSales { get; set; }

        [StringLength(20)]
        public string stockView { get; set; }

        [StringLength(20)]
        public string undercostsale { get; set; }

        [StringLength(100)]
        public string userName { get; set; }

        [StringLength(50)]
        public string userType { get; set; }
    }
}
