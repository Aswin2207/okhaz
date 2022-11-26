namespace DataAccess.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public  class category_master
    {
        
        [Key]
        [StringLength(25)]
        public string CategoryId { get; set; }

        [StringLength(100)]
        public string CategoryName { get; set; }

        [Column(TypeName = "text")]
        public string CategoryDesc { get; set; }

        [StringLength(50)]
        public string Dept_Id { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? Vatrate { get; set; }

        [StringLength(255)]
        public string CategoryType { get; set; }

        [StringLength(50)]
        public string CategoryNameArabic { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? FixedProfit { get; set; }

        [StringLength(50)]
        public string arabic { get; set; }

        [StringLength(25)]
        public string BrachCode { get; set; }

        public string ImagePath { get; set; }

        public int? SupplierCount { get; set; }
        public int? ProductsCount { get; set; }
        public byte? CMstatus { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<CategoryAssignedToSupplier> CategoryAssignedToSuppliers { get; set; }
    }
}
