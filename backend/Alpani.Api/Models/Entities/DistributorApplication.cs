using System;

namespace Alpani.Api.Models.Entities
{
    public class DistributorApplication
    {
        public int Id { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string? Website { get; set; }
        public string? AnnualTurnover { get; set; } // e.g. "$1M - $5M"
        public string? CurrentBrands { get; set; } // e.g. "Flos, iGuzzini, ERCO"
        public string? TargetMarkets { get; set; } // Architectural, Commercial, Hospitality
        public string Message { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending"; // Pending, Contacted, Approved, Rejected
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
