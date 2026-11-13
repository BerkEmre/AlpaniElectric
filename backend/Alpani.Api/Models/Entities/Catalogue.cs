using System;

namespace Alpani.Api.Models.Entities
{
    public class Catalogue
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty; // e.g., "Technical Architectural Master Catalogue"
        public string Type { get; set; } = "Technical"; // Technical, Decorative, System Guides, Photometrics
        public string Description { get; set; } = string.Empty;
        public string CoverImageUrl { get; set; } = string.Empty;
        public string PdfUrl { get; set; } = string.Empty;
        public string FileSize { get; set; } = "45 MB";
        public int VersionYear { get; set; } = 2026;
        public int PageCount { get; set; } = 320;
        public int DisplayOrder { get; set; } = 0;
        public bool IsActive { get; set; } = true;
    }
}
