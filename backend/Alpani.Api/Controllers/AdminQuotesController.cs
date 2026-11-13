using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Alpani.Api.DTOs;
using Alpani.Api.Services;

namespace Alpani.Api.Controllers
{
    [ApiController]
    [Route("api/admin/quotes")]
    [Authorize(Roles = "Admin")]
    public class AdminQuotesController : ControllerBase
    {
        private readonly IQuoteService _quoteService;
        private readonly IFileStorageService _fileStorage;

        public AdminQuotesController(IQuoteService quoteService, IFileStorageService fileStorage)
        {
            _quoteService = quoteService;
            _fileStorage = fileStorage;
        }

        [HttpGet("stats")]
        public async Task<ActionResult<QuoteStatsDto>> GetStats()
        {
            var stats = await _quoteService.GetStatsAsync();
            return Ok(stats);
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<QuoteDetailDto>>> GetQuotes(
            [FromQuery] string? search,
            [FromQuery] string? status,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 15)
        {
            var result = await _quoteService.GetQuotesAsync(search, status, page, pageSize);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuoteDetailDto>> GetQuoteById(int id)
        {
            var quote = await _quoteService.GetQuoteByIdAsync(id);
            if (quote == null) return NotFound(new { message = $"Quote #{id} not found." });
            return Ok(quote);
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateQuoteStatusDto dto)
        {
            var success = await _quoteService.UpdateQuoteStatusAsync(id, dto);
            if (!success) return NotFound(new { message = $"Quote #{id} not found." });
            return Ok(new { message = "Quote status updated successfully." });
        }

        [HttpGet("{id}/export-csv")]
        public async Task<IActionResult> ExportCsv(int id)
        {
            var csvBytes = await _quoteService.GenerateQuoteCsvAsync(id);
            if (csvBytes == null) return NotFound(new { message = $"Quote #{id} not found." });

            var quote = await _quoteService.GetQuoteByIdAsync(id);
            var refNum = quote?.ReferenceNumber ?? $"Quote_{id}";
            var fileName = $"Alpani_Schedule_{refNum}.csv";

            return File(csvBytes, "text/csv; charset=utf-8", fileName);
        }

        [HttpGet("{id}/attachment")]
        public async Task<IActionResult> DownloadAttachment(int id)
        {
            var quote = await _quoteService.GetQuoteByIdAsync(id);
            if (quote == null || string.IsNullOrWhiteSpace(quote.AttachmentPath))
            {
                return NotFound(new { message = "No attachment found for this quote." });
            }

            var fileData = _fileStorage.GetFile(quote.AttachmentPath);
            if (fileData == null)
            {
                return NotFound(new { message = "Physical attachment file is missing on the server." });
            }

            var downloadName = quote.AttachmentFileName ?? fileData.Value.FileName;
            return File(fileData.Value.Bytes, fileData.Value.ContentType, downloadName);
        }
    }
}
