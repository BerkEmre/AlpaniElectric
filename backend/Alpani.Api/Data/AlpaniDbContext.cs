using Microsoft.EntityFrameworkCore;
using Alpani.Api.Models.Entities;

namespace Alpani.Api.Data
{
    public class AlpaniDbContext : DbContext
    {
        public AlpaniDbContext(DbContextOptions<AlpaniDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<ProductVariant> ProductVariants => Set<ProductVariant>();
        public DbSet<ApplicationArea> ApplicationAreas => Set<ApplicationArea>();
        public DbSet<ProductApplicationArea> ProductApplicationAreas => Set<ProductApplicationArea>();
        public DbSet<Project> Projects => Set<Project>();
        public DbSet<ProjectProduct> ProjectProducts => Set<ProjectProduct>();
        public DbSet<Catalogue> Catalogues => Set<Catalogue>();
        public DbSet<QuoteRequest> QuoteRequests => Set<QuoteRequest>();
        public DbSet<QuoteRequestItem> QuoteRequestItems => Set<QuoteRequestItem>();
        public DbSet<DistributorApplication> DistributorApplications => Set<DistributorApplication>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.Email).IsRequired().HasMaxLength(150);
                entity.Property(u => u.FullName).IsRequired().HasMaxLength(150);
            });

            // Category
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.HasIndex(c => c.Slug).IsUnique();
                entity.Property(c => c.Name).IsRequired().HasMaxLength(100);
            });

            // Product
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.HasIndex(p => p.Code).IsUnique();
                entity.HasIndex(p => p.Slug).IsUnique();
                entity.Property(p => p.Name).IsRequired().HasMaxLength(200);

                entity.HasOne(p => p.Category)
                      .WithMany(c => c.Products)
                      .HasForeignKey(p => p.CategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // ProductVariant
            modelBuilder.Entity<ProductVariant>(entity =>
            {
                entity.HasKey(v => v.Id);
                entity.HasOne(v => v.Product)
                      .WithMany(p => p.Variants)
                      .HasForeignKey(v => v.ProductId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ProductApplicationArea (Many-to-Many)
            modelBuilder.Entity<ProductApplicationArea>(entity =>
            {
                entity.HasKey(pa => new { pa.ProductId, pa.ApplicationAreaId });

                entity.HasOne(pa => pa.Product)
                      .WithMany(p => p.ProductApplicationAreas)
                      .HasForeignKey(pa => pa.ProductId);

                entity.HasOne(pa => pa.ApplicationArea)
                      .WithMany(a => a.ProductApplicationAreas)
                      .HasForeignKey(pa => pa.ApplicationAreaId);
            });

            // ProjectProduct (Many-to-Many)
            modelBuilder.Entity<ProjectProduct>(entity =>
            {
                entity.HasKey(pp => new { pp.ProjectId, pp.ProductId });

                entity.HasOne(pp => pp.Project)
                      .WithMany(p => p.ProjectProducts)
                      .HasForeignKey(pp => pp.ProjectId);

                entity.HasOne(pp => pp.Product)
                      .WithMany(p => p.ProjectProducts)
                      .HasForeignKey(pp => pp.ProductId);
            });

            // QuoteRequest
            modelBuilder.Entity<QuoteRequest>(entity =>
            {
                entity.HasKey(q => q.Id);
                entity.HasIndex(q => q.ReferenceNumber).IsUnique();
                entity.Property(q => q.ReferenceNumber).IsRequired().HasMaxLength(50);
                entity.Property(q => q.Email).IsRequired().HasMaxLength(150);
                entity.Property(q => q.CompanyName).IsRequired().HasMaxLength(200);
            });

            // QuoteRequestItem
            modelBuilder.Entity<QuoteRequestItem>(entity =>
            {
                entity.HasKey(qi => qi.Id);
                entity.HasOne(qi => qi.QuoteRequest)
                      .WithMany(q => q.Items)
                      .HasForeignKey(qi => qi.QuoteRequestId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(qi => qi.Product)
                      .WithMany()
                      .HasForeignKey(qi => qi.ProductId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(qi => qi.ProductVariant)
                      .WithMany()
                      .HasForeignKey(qi => qi.ProductVariantId)
                      .OnDelete(DeleteBehavior.SetNull);
            });
        }
    }
}
