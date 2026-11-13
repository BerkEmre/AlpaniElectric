using System;
using System.Collections.Generic;
using Alpani.Api.Models.Entities;

namespace Alpani.Api.DTOs
{
    public class QuoteItemDto
    {
        public int ProductId { get; set; }
        public int? ProductVariantId { get; set; }
        public string? ProductCode { get; set; }
        public string? ProductName { get; set; }
        public string? SelectedSpecsJson { get; set; }
        public int Quantity { get; set; } = 1;
        public string? ItemNote { get; set; }
    }

    public class CreateQuoteRequestDto
    {
        public string FullName { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string ProjectName { get; set; } = string.Empty;
        public string ProjectType { get; set; } = string.Empty;
        public DateTime? EstimatedDeliveryDate { get; set; }
        public string? CustomerNotes { get; set; }
        public List<QuoteItemDto> Items { get; set; } = new();
    }

    public class QuoteResponseDto
    {
        public string ReferenceNumber { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public int TotalItems { get; set; }
        public int TotalLuminaires { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class QuoteDetailDto
    {
        public int Id { get; set; }
        public string ReferenceNumber { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string ProjectName { get; set; } = string.Empty;
        public string ProjectType { get; set; } = string.Empty;
        public DateTime? EstimatedDeliveryDate { get; set; }
        public string? AttachmentFileName { get; set; }
        public string? AttachmentPath { get; set; }
        public long? AttachmentSizeBytes { get; set; }
        public string? CustomerNotes { get; set; }
        public string? InternalAdminNotes { get; set; }
        public string Status { get; set; } = "New";
        public DateTime CreatedAt { get; set; }
        public int TotalLuminaires { get; set; }
        public List<QuoteItemDetailDto> Items { get; set; } = new();
    }

    public class QuoteItemDetailDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductCode { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public string ProductImageUrl { get; set; } = string.Empty;
        public int? ProductVariantId { get; set; }
        public string SelectedSpecsJson { get; set; } = "{}";
        public int Quantity { get; set; }
        public string? ItemNote { get; set; }
    }

    public class QuoteStatsDto
    {
        public int TotalQuotes { get; set; }
        public int NewQuotes { get; set; }
        public int InReviewQuotes { get; set; }
        public int QuotedQuotes { get; set; }
        public int ClosedQuotes { get; set; }
        public int TotalLuminairesRequested { get; set; }
    }

    public class UpdateQuoteStatusDto
    {
        public string Status { get; set; } = string.Empty; // New, InReview, Quoted, Closed
        public string? InternalAdminNotes { get; set; }
    }
}
