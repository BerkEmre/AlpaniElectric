using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Alpani.Api.Data;
using Alpani.Api.DTOs;
using Alpani.Api.Models.Entities;

namespace Alpani.Api.Services
{
    public interface IQuoteService
    {
        Task<QuoteResponseDto> CreateQuoteAsync(CreateQuoteRequestDto dto, string? attachmentPath, string? attachmentFileName, long? attachmentSize);
        Task<QuoteStatsDto> GetStatsAsync();
        Task<PagedResult<QuoteDetailDto>> GetQuotesAsync(string? search, string? status, int page, int pageSize);
        Task<QuoteDetailDto?> GetQuoteByIdAsync(int id);
        Task<bool> UpdateQuoteStatusAsync(int id, UpdateQuoteStatusDto dto);
        Task<byte[]?> GenerateQuoteCsvAsync(int id);
    }

    public class QuoteService : IQuoteService
    {
        private readonly AlpaniDbContext _db;

        public QuoteService(AlpaniDbContext db)
        {
            _db = db;
        }

        public async Task<QuoteResponseDto> CreateQuoteAsync(CreateQuoteRequestDto dto, string? attachmentPath, string? attachmentFileName, long? attachmentSize)
        {
            // Generate next sequential reference code: ALP-2026-XXXX
            var currentYear = DateTime.UtcNow.Year;
            var yearPrefix = $"ALP-{currentYear}-";
            var latestQuote = await _db.QuoteRequests
                .Where(q => q.ReferenceNumber.StartsWith(yearPrefix))
                .OrderByDescending(q => q.Id)
                .FirstOrDefaultAsync();

            int nextNum = 1;
            if (latestQuote != null && latestQuote.ReferenceNumber.Length >= yearPrefix.Length + 4)
            {
                var suffix = latestQuote.ReferenceNumber.Substring(yearPrefix.Length);
                if (int.TryParse(suffix, out int parsed))
                {
                    nextNum = parsed + 1;
                }
            }

            var refNumber = $"{yearPrefix}{nextNum:D4}";

            var quote = new QuoteRequest
            {
                ReferenceNumber = refNumber,
                FullName = dto.FullName,
                CompanyName = dto.CompanyName,
                Email = dto.Email,
                Phone = dto.Phone,
                Country = dto.Country,
                ProjectName = dto.ProjectName,
                ProjectType = dto.ProjectType,
                EstimatedDeliveryDate = dto.EstimatedDeliveryDate,
                AttachmentPath = attachmentPath,
                AttachmentFileName = attachmentFileName,
                AttachmentSizeBytes = attachmentSize,
                CustomerNotes = dto.CustomerNotes,
                Status = QuoteStatus.New,
                CreatedAt = DateTime.UtcNow
            };

            int totalLuminaires = 0;
            foreach (var item in dto.Items)
            {
                quote.Items.Add(new QuoteRequestItem
                {
                    ProductId = item.ProductId,
                    ProductVariantId = item.ProductVariantId,
                    SelectedSpecsJson = item.SelectedSpecsJson ?? "{}",
                    Quantity = item.Quantity > 0 ? item.Quantity : 1,
                    ItemNote = item.ItemNote
                });
                totalLuminaires += (item.Quantity > 0 ? item.Quantity : 1);
            }

            _db.QuoteRequests.Add(quote);
            await _db.SaveChangesAsync();

            return new QuoteResponseDto
            {
                ReferenceNumber = quote.ReferenceNumber,
                Message = "Your architectural lighting quote request has been registered successfully. An Alpani engineering specialist will review your schedule and respond within 24 hours.",
                TotalItems = quote.Items.Count,
                TotalLuminaires = totalLuminaires,
                CreatedAt = quote.CreatedAt
            };
        }

        public async Task<QuoteStatsDto> GetStatsAsync()
        {
            var quotes = await _db.QuoteRequests.Include(q => q.Items).ToListAsync();

            return new QuoteStatsDto
            {
                TotalQuotes = quotes.Count,
                NewQuotes = quotes.Count(q => q.Status == QuoteStatus.New),
                InReviewQuotes = quotes.Count(q => q.Status == QuoteStatus.InReview),
                QuotedQuotes = quotes.Count(q => q.Status == QuoteStatus.Quoted),
                ClosedQuotes = quotes.Count(q => q.Status == QuoteStatus.Closed),
                TotalLuminairesRequested = quotes.SelectMany(q => q.Items).Sum(i => i.Quantity)
            };
        }

        public async Task<PagedResult<QuoteDetailDto>> GetQuotesAsync(string? search, string? status, int page, int pageSize)
        {
            var query = _db.QuoteRequests
                .Include(q => q.Items)
                    .ThenInclude(i => i.Product)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim().ToLower();
                query = query.Where(q => q.ReferenceNumber.ToLower().Contains(term) ||
                                         q.CompanyName.ToLower().Contains(term) ||
                                         q.FullName.ToLower().Contains(term) ||
                                         q.Email.ToLower().Contains(term) ||
                                         q.Country.ToLower().Contains(term) ||
                                         q.ProjectName.ToLower().Contains(term));
            }

            if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<QuoteStatus>(status, true, out var quoteStatus))
            {
                query = query.Where(q => q.Status == quoteStatus);
            }

            var totalCount = await query.CountAsync();
            var items = await query
                .OrderByDescending(q => q.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(q => MapToDetailDto(q))
                .ToListAsync();

            return new PagedResult<QuoteDetailDto>
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize
            };
        }

        public async Task<QuoteDetailDto?> GetQuoteByIdAsync(int id)
        {
            var quote = await _db.QuoteRequests
                .Include(q => q.Items)
                    .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quote == null) return null;
            return MapToDetailDto(quote);
        }

        public async Task<bool> UpdateQuoteStatusAsync(int id, UpdateQuoteStatusDto dto)
        {
            var quote = await _db.QuoteRequests.FindAsync(id);
            if (quote == null) return false;

            if (Enum.TryParse<QuoteStatus>(dto.Status, true, out var parsedStatus))
            {
                quote.Status = parsedStatus;
            }

            if (dto.InternalAdminNotes != null)
            {
                quote.InternalAdminNotes = dto.InternalAdminNotes;
            }

            quote.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<byte[]?> GenerateQuoteCsvAsync(int id)
        {
            var quote = await _db.QuoteRequests
                .Include(q => q.Items)
                    .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quote == null) return null;

            var sb = new StringBuilder();

            // UTF-8 BOM is added when encoding
            sb.AppendLine("ALPANI LIGHTING - OFFICIAL B2B RFQ LUMINAIRE SCHEDULE");
            sb.AppendLine($"Reference Number:,{EscapeCsv(quote.ReferenceNumber)}");
            sb.AppendLine($"Date Submitted:,{quote.CreatedAt:yyyy-MM-dd HH:mm:ss} UTC");
            sb.AppendLine($"Company Name:,{EscapeCsv(quote.CompanyName)}");
            sb.AppendLine($"Contact Person:,{EscapeCsv(quote.FullName)}");
            sb.AppendLine($"Email Address:,{EscapeCsv(quote.Email)}");
            sb.AppendLine($"Phone / WhatsApp:,{EscapeCsv(quote.Phone)}");
            sb.AppendLine($"Destination Country:,{EscapeCsv(quote.Country)}");
            sb.AppendLine($"Project Name:,{EscapeCsv(quote.ProjectName)}");
            sb.AppendLine($"Project Type:,{EscapeCsv(quote.ProjectType)}");
            sb.AppendLine($"Estimated Delivery:,{(quote.EstimatedDeliveryDate.HasValue ? quote.EstimatedDeliveryDate.Value.ToString("yyyy-MM-dd") : "Not specified")}");
            sb.AppendLine($"Current Status:,{quote.Status}");
            sb.AppendLine($"Customer Notes:,{EscapeCsv(quote.CustomerNotes ?? "")}");
            sb.AppendLine($"Internal Notes:,{EscapeCsv(quote.InternalAdminNotes ?? "")}");
            sb.AppendLine();
            sb.AppendLine("ITEMIZED LUMINAIRE SPECIFICATIONS");
            sb.AppendLine("Item #,Product SKU,Product Name,Wattage,CCT / Kelvin,Beam Angle,Body Finish,Control Protocol,Quantity (pcs),Project Zone / Note");

            int idx = 1;
            foreach (var item in quote.Items)
            {
                var specs = ParseSpecs(item.SelectedSpecsJson);
                sb.AppendLine($"{idx}," +
                              $"{EscapeCsv(item.Product?.Code ?? "N/A")}," +
                              $"{EscapeCsv(item.Product?.Name ?? "Luminaire")}," +
                              $"{EscapeCsv(specs.GetValueOrDefault("Wattage", "-"))}," +
                              $"{EscapeCsv(specs.GetValueOrDefault("Cct", "-"))}," +
                              $"{EscapeCsv(specs.GetValueOrDefault("BeamAngle", "-"))}," +
                              $"{EscapeCsv(specs.GetValueOrDefault("BodyColor", "-"))}," +
                              $"{EscapeCsv(specs.GetValueOrDefault("ControlType", "-"))}," +
                              $"{item.Quantity}," +
                              $"{EscapeCsv(item.ItemNote ?? "")}");
                idx++;
            }

            sb.AppendLine();
            sb.AppendLine($"Total Requested Luminaires:,{quote.Items.Sum(i => i.Quantity)} pcs");
            sb.AppendLine("Alpani Dış Ticaret Ltd. Şti. | Sinanoba Mah. Ibrahimzade Cad. No: 1B/35 Buyukcekmece, Istanbul - Turkey | info@alpani.com | +90 542 515 87 85");

            // Write with UTF-8 BOM
            var preamble = Encoding.UTF8.GetPreamble();
            var contentBytes = Encoding.UTF8.GetBytes(sb.ToString());
            var result = new byte[preamble.Length + contentBytes.Length];
            Buffer.BlockCopy(preamble, 0, result, 0, preamble.Length);
            Buffer.BlockCopy(contentBytes, 0, result, preamble.Length, contentBytes.Length);

            return result;
        }

        private static string EscapeCsv(string value)
        {
            if (string.IsNullOrEmpty(value)) return "\"\"";
            if (value.Contains(",") || value.Contains("\"") || value.Contains("\n") || value.Contains("\r"))
            {
                return $"\"{value.Replace("\"", "\"\"")}\"";
            }
            return value;
        }

        private static Dictionary<string, string> ParseSpecs(string json)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(json)) return new();
                return JsonSerializer.Deserialize<Dictionary<string, string>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new();
            }
            catch
            {
                return new();
            }
        }

        private static QuoteDetailDto MapToDetailDto(QuoteRequest q)
        {
            return new QuoteDetailDto
            {
                Id = q.Id,
                ReferenceNumber = q.ReferenceNumber,
                FullName = q.FullName,
                CompanyName = q.CompanyName,
                Email = q.Email,
                Phone = q.Phone,
                Country = q.Country,
                ProjectName = q.ProjectName,
                ProjectType = q.ProjectType,
                EstimatedDeliveryDate = q.EstimatedDeliveryDate,
                AttachmentFileName = q.AttachmentFileName,
                AttachmentPath = q.AttachmentPath,
                AttachmentSizeBytes = q.AttachmentSizeBytes,
                CustomerNotes = q.CustomerNotes,
                InternalAdminNotes = q.InternalAdminNotes,
                Status = q.Status.ToString(),
                CreatedAt = q.CreatedAt,
                TotalLuminaires = q.Items.Sum(i => i.Quantity),
                Items = q.Items.Select(i => new QuoteItemDetailDto
                {
                    Id = i.Id,
                    ProductId = i.ProductId,
                    ProductCode = i.Product?.Code ?? string.Empty,
                    ProductName = i.Product?.Name ?? string.Empty,
                    ProductImageUrl = i.Product?.MainImageUrl ?? string.Empty,
                    ProductVariantId = i.ProductVariantId,
                    SelectedSpecsJson = i.SelectedSpecsJson,
                    Quantity = i.Quantity,
                    ItemNote = i.ItemNote
                }).ToList()
            };
        }
    }
}
