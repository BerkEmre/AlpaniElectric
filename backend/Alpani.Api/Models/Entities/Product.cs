using System;
using System.Collections.Generic;

namespace Alpani.Api.Models.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public string Code { get; set; } = string.Empty; // SKU e.g., ALP-M48-LIN1000
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string TechnicalDescription { get; set; } = string.Empty;

        // Visual & Technical Assets
        public string MainImageUrl { get; set; } = string.Empty;
        public string GalleryImagesJson { get; set; } = "[]";
        public string PolarDiagramUrl { get; set; } = string.Empty;
        public string DimensionDrawingUrl { get; set; } = string.Empty;
        public string DatasheetPdfUrl { get; set; } = string.Empty;
        public string IesFileUrl { get; set; } = string.Empty;
        public string CadFileUrl { get; set; } = string.Empty;
        public string ManualPdfUrl { get; set; } = string.Empty;

        // Engineering & Component Specifications
        public string LedChipBrand { get; set; } = "Nichia / Samsung";
        public string DriverBrand { get; set; } = "Tridonic / Osram";
        public string Material { get; set; } = "Die-Cast Aluminum & Optical Polycarbonate";
        public string IpRating { get; set; } = "IP20"; // IP20, IP54, IP65
        public string IkRating { get; set; } = "IK06"; // IK06, IK08
        public string Cri { get; set; } = "Ra > 90"; // Ra > 90, Ra > 97
        public string MacAdam { get; set; } = "SDCM < 3"; // SDCM < 2, SDCM < 3
        public string Lifetime { get; set; } = "L90B10 > 50,000 hrs";
        public string OperatingVoltage { get; set; } = "48V DC / 220-240V AC";
        public string Ugr { get; set; } = "< 19"; // Unified Glare Rating

        public bool IsFeatured { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
        public ICollection<ProductApplicationArea> ProductApplicationAreas { get; set; } = new List<ProductApplicationArea>();
        public ICollection<ProjectProduct> ProjectProducts { get; set; } = new List<ProjectProduct>();
    }
}
