using System;
using System.Collections.Generic;

namespace Alpani.Api.DTOs
{
    public class ProductListDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string CategorySlug { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string MainImageUrl { get; set; } = string.Empty;
        public string LedChipBrand { get; set; } = string.Empty;
        public string DriverBrand { get; set; } = string.Empty;
        public string IpRating { get; set; } = string.Empty;
        public string Cri { get; set; } = string.Empty;
        public string MacAdam { get; set; } = string.Empty;
        public string Ugr { get; set; } = string.Empty;
        public bool IsFeatured { get; set; }
        public List<string> Wattages { get; set; } = new();
        public List<string> Ccts { get; set; } = new();
        public List<string> BeamAngles { get; set; } = new();
        public List<string> BodyColors { get; set; } = new();
        public List<string> ControlTypes { get; set; } = new();
    }

    public class ProductVariantDto
    {
        public int Id { get; set; }
        public string SkuCode { get; set; } = string.Empty;
        public string Wattage { get; set; } = string.Empty;
        public string LumenOutput { get; set; } = string.Empty;
        public string Cct { get; set; } = string.Empty;
        public string BeamAngle { get; set; } = string.Empty;
        public string BodyColor { get; set; } = string.Empty;
        public string ControlType { get; set; } = string.Empty;
        public string Dimensions { get; set; } = string.Empty;
        public bool IsDefault { get; set; }
    }

    public class ProductDetailDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string CategorySlug { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string TechnicalDescription { get; set; } = string.Empty;

        public string MainImageUrl { get; set; } = string.Empty;
        public List<string> GalleryImages { get; set; } = new();
        public string PolarDiagramUrl { get; set; } = string.Empty;
        public string DimensionDrawingUrl { get; set; } = string.Empty;
        public string DatasheetPdfUrl { get; set; } = string.Empty;
        public string IesFileUrl { get; set; } = string.Empty;
        public string CadFileUrl { get; set; } = string.Empty;
        public string ManualPdfUrl { get; set; } = string.Empty;

        public string LedChipBrand { get; set; } = string.Empty;
        public string DriverBrand { get; set; } = string.Empty;
        public string Material { get; set; } = string.Empty;
        public string IpRating { get; set; } = string.Empty;
        public string IkRating { get; set; } = string.Empty;
        public string Cri { get; set; } = string.Empty;
        public string MacAdam { get; set; } = string.Empty;
        public string Lifetime { get; set; } = string.Empty;
        public string OperatingVoltage { get; set; } = string.Empty;
        public string Ugr { get; set; } = string.Empty;
        public bool IsFeatured { get; set; }

        public List<ProductVariantDto> Variants { get; set; } = new();
    }

    public class ProductFilterDto
    {
        public string? Category { get; set; }
        public string? Search { get; set; }
        public string? Wattage { get; set; }
        public string? Cct { get; set; }
        public string? Cri { get; set; }
        public string? IpRating { get; set; }
        public string? BeamAngle { get; set; }
        public string? ControlType { get; set; }
        public bool? FeaturedOnly { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 12;
    }

    public class PagedResult<T>
    {
        public List<T> Items { get; set; } = new();
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    }

    public class ProductCreateUpdateDto
    {
        public int CategoryId { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string TechnicalDescription { get; set; } = string.Empty;
        public string MainImageUrl { get; set; } = string.Empty;
        public string GalleryImagesJson { get; set; } = "[]";
        public string PolarDiagramUrl { get; set; } = string.Empty;
        public string DimensionDrawingUrl { get; set; } = string.Empty;
        public string DatasheetPdfUrl { get; set; } = string.Empty;
        public string IesFileUrl { get; set; } = string.Empty;
        public string CadFileUrl { get; set; } = string.Empty;
        public string ManualPdfUrl { get; set; } = string.Empty;
        public string LedChipBrand { get; set; } = string.Empty;
        public string DriverBrand { get; set; } = string.Empty;
        public string Material { get; set; } = string.Empty;
        public string IpRating { get; set; } = "IP20";
        public string IkRating { get; set; } = "IK06";
        public string Cri { get; set; } = "Ra > 90";
        public string MacAdam { get; set; } = "SDCM < 3";
        public string Lifetime { get; set; } = "L90B10 > 50,000 hrs";
        public string OperatingVoltage { get; set; } = "220-240V AC";
        public string Ugr { get; set; } = "< 19";
        public bool IsFeatured { get; set; } = false;
        public List<ProductVariantDto> Variants { get; set; } = new();
    }
}
