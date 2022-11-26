namespace DataAccess.DataModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Microsoft.EntityFrameworkCore.Keyless]
    public class item_master
    {
        public long Code { get; set; }

        [Key]
        [StringLength(30)]
        public string itemID { get; set; }

        [StringLength(500)]
        public string itemName { get; set; }

        public int? itemUnit { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? itemCost { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? itemSellingprice { get; set; }

        [StringLength(25)]
        public string itemSubCategory { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? Margin { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? itemReorder { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? LastSaleRate { get; set; }

        public DateTime? LastSaleDate { get; set; }

        [StringLength(50)]
        public string LastSaleCode { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? LastPurRate { get; set; }

        public DateTime? LastPurDate { get; set; }

        [StringLength(50)]
        public string LastPurCode { get; set; }

        public float? OpgStock { get; set; }

        public float? OpgValue { get; set; }

        public float? ClsQty { get; set; }

        [Column(TypeName = "text")]
        public string ItemDesc1 { get; set; }

        [StringLength(50)]
        public string ItemDesc2 { get; set; }

        [StringLength(15)]
        public string USERNAME { get; set; }

        public DateTime? updatedDate { get; set; }

        public short? DiscPerAllowed { get; set; }

        public float? DiscAmtAllowed { get; set; }

        [StringLength(100)]
        public string MainSupplier { get; set; }

        [StringLength(100)]
        public string LocalSupplier { get; set; }

        [StringLength(100)]
        public string itemRef { get; set; }

        [StringLength(20)]
        public string parantId { get; set; }

        [StringLength(20)]
        public string batchNo { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ExpDate { get; set; }

        [StringLength(500)]
        public string shortDes { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? minSP { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? maxSP { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? ledgerCode { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? MaxLevel { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? MinLevel { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? wholesalePrice { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? specialPrice { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? specialPrice1 { get; set; }

        [StringLength(20)]
        public string scheduleID { get; set; }

        [StringLength(500)]
        public string Arabicname { get; set; }

        [StringLength(50)]
        public string StockLocation { get; set; }

        [StringLength(50)]
        public string Status { get; set; }

        [StringLength(50)]
        public string DepartmentId { get; set; }

        [StringLength(50)]
        public string Brand { get; set; }

        public int? WeighingScaleItems { get; set; }

        [StringLength(50)]
        public string Producttot { get; set; }

        public int? wheight { get; set; }

        public int? price { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? AvgCost { get; set; }

        [StringLength(50)]
        public string StockingType { get; set; }

        [StringLength(20)]
        public string salesman { get; set; }

        public float? lastPurQty { get; set; }

        [StringLength(50)]
        public string costingmethod { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? VatRate { get; set; }

        public long? ModelID { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? billcost { get; set; }

        [StringLength(50)]
        public string itemFlavour { get; set; }

        [StringLength(100)]
        public string itemType { get; set; }

        [StringLength(50)]
        public string favourite { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? estTime { get; set; }

        [StringLength(100)]
        public string subCode { get; set; }

        public int? DefaultImageId { get; set; }

        [StringLength(25)]
        public string BranchCode { get; set; }

        public string image_url { get; set; }

        public int? FreeShipping { get; set; }

        [StringLength(1)]
        public string IsFeaturedItem { get; set; }

        public string AvailabilityText { get; set; }
        public string Condition { get; set; }
        public string MSRP { get; set; }
        public string SearchKeywords { get; set; }
        public string SortOrder { get; set; }
        public string TemplateLayoutFile { get; set; }
        public string WarrantyInformation { get; set; }
        public string binPickingNo { get; set; }
        public string customFieldName1 { get; set; }
        public string customFieldValue1 { get; set; }
        public string depth { get; set; }
        public string discountType { get; set; }
        
        public string featuredProduct { get; set; }
        public string fixedShippingPrice { get; set; }
        public string giftWrapping { get; set; }
        public string globalTradeNo { get; set; }
        public string height { get; set; }
        public string managecustoms { get; set; }
        public string manufacturePartNumber { get; set; }
        public string maxPurchaseQuantity { get; set; }
        public string message { get; set; }
        public string metaDesc { get; set; }
        public string minimumPurchaseQuantity { get; set; }
        public string pageTitle { get; set; }
        public string pricingLabel { get; set; }
        public string productLowStock { get; set; }
        public string productStock { get; set; }
        public string productUPCorEAN { get; set; }
        public string productUrl { get; set; }
        public string productWeight { get; set; }
        public string purchasability { get; set; }
        public string releaseDate { get; set; }
        public string removeNotification { get; set; }
        public string showcondition { get; set; }
        public string sku { get; set; }
        public string taxClass { get; set; }
        public string taxCode { get; set; }
        public string trackInventory { get; set; }
        public string useMetaDesc { get; set; }
        public string useProductName { get; set; }
        public string variantsDetails { get; set; }
        //public string ProductFeedbacks { get; internal set; }
    }
}
