namespace DataAccess.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Microsoft.EntityFrameworkCore.Keyless]
    public  class subcategory_master
    {
        [Key]
        [StringLength(30)]
        public string item_subCatID { get; set; }

        [StringLength(200)]
        public string item_subCatName { get; set; }

        [StringLength(25)]
        public string CategoryId { get; set; }

        [Column(TypeName = "text")]
        public string Description { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? Margin { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? Vatrate { get; set; }

        [StringLength(50)]
        public string item_subCatNameArabic { get; set; }

        [StringLength(100)]
        public string SubCATSequence { get; set; }

        [StringLength(100)]
        public string PrinterName2 { get; set; }

        [StringLength(100)]
        public string PrinterName3 { get; set; }

        [StringLength(100)]
        public string PrinterName4 { get; set; }

        [StringLength(50)]
        public string BranchCode { get; set; }

        public string ImagePath { get; set; }
    }
}
