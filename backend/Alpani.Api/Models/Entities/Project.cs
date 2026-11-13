using System;
using System.Collections.Generic;

namespace Alpani.Api.Models.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int CompletionYear { get; set; } = 2025;
        public string ArchitectName { get; set; } = string.Empty;
        public string LightingDesigner { get; set; } = string.Empty;
        public string ApplicationType { get; set; } = string.Empty; // Commercial, Museum, Luxury Hospitality, Penthouse
        public string Description { get; set; } = string.Empty;
        public string CoverImageUrl { get; set; } = string.Empty;
        public string GalleryJson { get; set; } = "[]";
        public bool IsFeatured { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<ProjectProduct> ProjectProducts { get; set; } = new List<ProjectProduct>();
    }

    public class ProjectProduct
    {
        public int ProjectId { get; set; }
        public Project? Project { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
