namespace DataAccess.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    [Microsoft.EntityFrameworkCore.Keyless]
    public  class customer_master
    {
        public Int32 custID { get; set; }

        [Required]
        [StringLength(150)]
        public string custName { get; set; }

        [StringLength(150)]
        public string cusAdd1 { get; set; }

        [StringLength(150)]
        public string cusAdd2 { get; set; }

        [StringLength(30)]
        public string cusTele { get; set; }

        [StringLength(30)]
        public string cusFax { get; set; }

        [Required]
        [StringLength(30)]
        public string cusMob { get; set; }

        
        [Column(Order = 0)]
        [StringLength(100)]
        public string cusEmail { get; set; }

        [StringLength(50)]
        public string cusWeb { get; set; }

        [StringLength(100)]
        public string AccountName { get; set; }

        [StringLength(10)]
        public string creditLimit { get; set; }

        [StringLength(30)]
        public string paymentMode { get; set; }

        public Int32? nofOfdays { get; set; }

        [StringLength(25)]
        public string CostCentre { get; set; }

        public decimal? CustMargin { get; set; }

        public decimal? OpeningBalance { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime? OpeningBalanceDate { get; set; }

        public Int32? LedgerCode { get; set; }

        [StringLength(50)]
        public string CustStatus { get; set; }

        [StringLength(30)]
        public string salesman { get; set; }

        [StringLength(50)]
        public string custRef { get; set; }

        [StringLength(50)]
        public string emirates { get; set; }

        
        [Column(Order = 1)]
        [StringLength(50)]
        public string branchid { get; set; }

        public string custNameArabic { get; set; }

        [StringLength(80)]
        public string vehicleNo { get; set; }

        [StringLength(80)]
        public string doorno { get; set; }

        [StringLength(25)]
        public string DeviceName { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime? CreateDate { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime? LastUpdateDate { get; set; }

        [StringLength(100)]
        public string CPassword { get; set; }

        [StringLength(100)]
        public string latitude { get; set; }

        [StringLength(100)]
        public string longitude { get; set; }

        public string AccessToken { get; set; }

        [StringLength(250)]
        public string LastName { get; set; }

        [StringLength(250)]
        public string MiddleName { get; set; }

        [StringLength(250)]
        public string City { get; set; }

        [StringLength(250)]
        public string State { get; set; }

        [StringLength(250)]
        public string country { get; set; }

        [StringLength(250)]
        public string Zipcode { get; set; }
    }
}
