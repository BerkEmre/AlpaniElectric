using System;
using System.Collections.Generic;

namespace Alpani.Api.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int CompletionYear { get; set; }
        public string ArchitectName { get; set; } = string.Empty;
        public string LightingDesigner { get; set; } = string.Empty;
        public string ApplicationType { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string CoverImageUrl { get; set; } = string.Empty;
        public List<string> GalleryImages { get; set; } = new();
        public bool IsFeatured { get; set; }
        public List<string> LuminaireCodes { get; set; } = new();
    }

    public class CatalogueDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string CoverImageUrl { get; set; } = string.Empty;
        public string PdfUrl { get; set; } = string.Empty;
        public string FileSize { get; set; } = string.Empty;
        public int VersionYear { get; set; }
        public int PageCount { get; set; }
    }

    public class DistributorApplicationDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string? Website { get; set; }
        public string? AnnualTurnover { get; set; }
        public string? CurrentBrands { get; set; }
        public string? TargetMarkets { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
        public DateTime CreatedAt { get; set; }
    }

    public class ApplicationAreaDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string HeroImageUrl { get; set; } = string.Empty;
        public int ProductCount { get; set; }
    }
}
