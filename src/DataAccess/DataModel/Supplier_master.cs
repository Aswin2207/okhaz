using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.DataModel
{
    public class Supplier_master
    {
        [Key]
        [StringLength(25)]
        public string suppID { get; set; }

        [StringLength(150)]
        public string suppName { get; set; }

        [StringLength(150)]
        public string suppAdd1 { get; set; }

        [StringLength(150)]
        public string suppAdd2 { get; set; }

        [StringLength(100)]
        public string suppTele { get; set; }

        [StringLength(30)]
        public string suppFax { get; set; }

        [StringLength(30)]
        public string suppMob { get; set; }

        [StringLength(30)]
        public string suppEmail { get; set; }

        [StringLength(50)]
        public string suppWeb { get; set; }

        [StringLength(200)]
        public string accountName { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? creditLimit { get; set; }

        [StringLength(50)]
        public string paymentMode { get; set; }

        public int? nofOfdays { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? OpeningBalance { get; set; }

        public DateTime? OpeningBalanceDate { get; set; }

        public int? LedgerCode { get; set; }

        [StringLength(25)]
        public string suppStatus { get; set; }

        [StringLength(50)]
        public string emirates { get; set; }

        [StringLength(50)]
        public string BranchId { get; set; }

        public DateTime? SubscriptionValidityFrom { get; set; }

        public DateTime? SubscriptionValidityUpTo { get; set; }
    }
}
