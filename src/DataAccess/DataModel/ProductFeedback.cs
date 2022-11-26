namespace DataAccess.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("ProductFeedback")]
    [Microsoft.EntityFrameworkCore.Keyless]
    public  class ProductFeedback
    {
        [StringLength(50)]
        public string Id { get; set; }

        [Required]
        [StringLength(30)]
        public string ItemId { get; set; }

        [StringLength(50)]
        public string Barcode { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? Feedback { get; set; }

        [StringLength(250)]
        public string Comments { get; set; }

    }
}
