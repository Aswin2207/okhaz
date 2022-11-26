using DataAccess.DAL;
using DataAccess.DAL.ConfigReader;
using Microsoft.EntityFrameworkCore;
using Okhaz.DataAccess.DataModel;

namespace DataAccess.DataModel
{
    public partial class DataContext : DbContext
    {
        public virtual DbSet<branch_master> Branch_Master { get; set; }

        public virtual DbSet<Brand_master> Brand_Master { get; set; }

        public virtual DbSet<category_master> category_master { get; set; }

        public virtual DbSet<Coupon_Master> Coupon_Master { get; set; }

        public virtual DbSet<Coupon_Master1> Coupon_Master1 { get; set; }

        public virtual DbSet<customer_master> customer_master { get; set; }

        public virtual DbSet<DepartmentList> DepartmentList { get; set; }

        public virtual DbSet<item_master> item_master { get; set; }

        public virtual DbSet<OnlineOrder> OnlineOrder { get; set; }

        public virtual DbSet<ProductFeedback> ProductFeedbacks { get; set; }

        public virtual DbSet<subcategory_master> subcategory_master { get; set; }

        public virtual DbSet<Supplier_master> Supplier_master { get; set; }

        public virtual DbSet<user_manager> user_manager { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = SettingsReaderInstanceManager.Instance.ConnectionString;
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<item_master>().HasKey(c => c.itemID);
            modelBuilder.Entity<Brand_master>().HasKey(c => c.BrandId);
            modelBuilder.Entity<Supplier_master>().HasKey(c => c.suppID);
            modelBuilder.Entity<Coupon_Master>().HasKey(c => c.CMID);
            modelBuilder.Entity<Coupon_Master1>().HasKey(c => c.CMID);
            modelBuilder.Entity<DepartmentList>().HasKey(c => c.DepartmentId);
        }
    }
}
