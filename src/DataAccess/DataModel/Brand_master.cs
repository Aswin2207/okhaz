namespace DataAccess.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Brand_Master")]
    [Microsoft.EntityFrameworkCore.Keyless]
    public partial class Brand_master
    {
        [Key]
        public string BrandId { get; set; }
        public string BrandName { get; set; }
        public string BrandDesc { get; set; }
        public DateTime createdate { get; set; }
        public DateTime? LastUpdateDate { get; set; }
        public string UserID { get; set; }
        public string LastUpdatedUserID { get; set; }
        public Int32 ProductCount { get; set; }
        public string branchcode { get; set; }
    }

}
