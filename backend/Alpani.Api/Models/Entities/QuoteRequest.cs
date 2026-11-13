using System;
using System.Collections.Generic;

namespace Alpani.Api.Models.Entities
{
    public enum QuoteStatus
    {
        New = 0,
        InReview = 1,
        Quoted = 2,
        Closed = 3
    }

    public class QuoteRequest
    {
        public int Id { get; set; }
        public string ReferenceNumber { get; set; } = string.Empty; // e.g. ALP-2026-0001
        
        // Customer & Company Info
        public string FullName { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;

        // Project Information
        public string ProjectName { get; set; } = string.Empty;
        public string ProjectType { get; set; } = string.Empty; // Commercial, Retail, Hospitality, Residential, Cultural, Façade
        public DateTime? EstimatedDeliveryDate { get; set; }

        // Architectural Plan / Specs Attachment
        public string? AttachmentFileName { get; set; }
        public string? AttachmentPath { get; set; }
        public long? AttachmentSizeBytes { get; set; }

        // Notes
        public string? CustomerNotes { get; set; }
        public string? InternalAdminNotes { get; set; }

        // Workflow Status
        public QuoteStatus Status { get; set; } = QuoteStatus.New;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Itemized Luminaire Schedule
        public ICollection<QuoteRequestItem> Items { get; set; } = new List<QuoteRequestItem>();
    }

    public class QuoteRequestItem
    {
        public int Id { get; set; }
        public int QuoteRequestId { get; set; }
        public QuoteRequest? QuoteRequest { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public int? ProductVariantId { get; set; }
        public ProductVariant? ProductVariant { get; set; }

        // Snapshot of selected technical specifications
        public string SelectedSpecsJson { get; set; } = "{}"; // { Wattage, Lumen, Cct, BeamAngle, BodyColor, ControlType }
        public int Quantity { get; set; } = 1;
        public string? ItemNote { get; set; } // e.g. "Main Atrium Grid 4", "Executive Office - Room 204"
    }
}
