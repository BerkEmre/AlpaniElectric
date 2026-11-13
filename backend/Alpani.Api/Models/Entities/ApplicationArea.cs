using System.Collections.Generic;

namespace Alpani.Api.Models.Entities
{
    public class ApplicationArea
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; // Office & Commercial, Retail & Hospitality, Museums & Galleries, Residential
        public string Slug { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string HeroImageUrl { get; set; } = string.Empty;
        public int DisplayOrder { get; set; } = 0;

        public ICollection<ProductApplicationArea> ProductApplicationAreas { get; set; } = new List<ProductApplicationArea>();
    }

    public class ProductApplicationArea
    {
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public int ApplicationAreaId { get; set; }
        public ApplicationArea? ApplicationArea { get; set; }
    }
}
