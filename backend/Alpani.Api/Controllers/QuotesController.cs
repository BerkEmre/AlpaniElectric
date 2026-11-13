using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Alpani.Api.DTOs;
using Alpani.Api.Services;

namespace Alpani.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuotesController : ControllerBase
    {
        private readonly IQuoteService _quoteService;
        private readonly IFileStorageService _fileStorage;

        public QuotesController(IQuoteService quoteService, IFileStorageService fileStorage)
        {
            _quoteService = quoteService;
            _fileStorage = fileStorage;
        }

        // Endpoint for multipart/form-data (used by frontend quote submission with file attachment)
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<QuoteResponseDto>> SubmitQuoteForm(
            [FromForm] string? quoteData,
            [FromForm] IFormFile? attachment)
        {
            CreateQuoteRequestDto? requestDto = null;

            if (!string.IsNullOrWhiteSpace(quoteData))
            {
                try
                {
                    requestDto = JsonSerializer.Deserialize<CreateQuoteRequestDto>(quoteData, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = $"Invalid quote data payload format: {ex.Message}" });
                }
            }

            if (requestDto == null && Request.HasFormContentType)
            {
                var form = Request.Form;
                requestDto = new CreateQuoteRequestDto
                {
                    FullName = form["fullName"].ToString(),
                    CompanyName = form["companyName"].ToString(),
                    Email = form["email"].ToString(),
                    Phone = form["phone"].ToString(),
                    Country = form["country"].ToString(),
                    ProjectName = form["projectName"].ToString(),
                    ProjectType = form["projectType"].ToString(),
                    CustomerNotes = form["customerNotes"].ToString()
                };

                var itemsJson = form["items"].ToString();
                if (!string.IsNullOrWhiteSpace(itemsJson))
                {
                    try
                    {
                        requestDto.Items = JsonSerializer.Deserialize<List<QuoteItemDto>>(itemsJson, new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        }) ?? new();
                    }
                    catch { }
                }
            }

            if (requestDto == null)
            {
                return BadRequest(new { message = "Quote request data is missing." });
            }

            return await ProcessQuoteAsync(requestDto, attachment);
        }

        // Endpoint for raw application/json (direct API clients or integration tests)
        [HttpPost]
        [Consumes("application/json")]
        public async Task<ActionResult<QuoteResponseDto>> SubmitQuoteJson([FromBody] CreateQuoteRequestDto dto)
        {
            if (dto == null)
            {
                return BadRequest(new { message = "Quote payload is required." });
            }

            return await ProcessQuoteAsync(dto, null);
        }

        private async Task<ActionResult<QuoteResponseDto>> ProcessQuoteAsync(CreateQuoteRequestDto requestDto, IFormFile? attachment)
        {
            if (string.IsNullOrWhiteSpace(requestDto.CompanyName) || string.IsNullOrWhiteSpace(requestDto.Email) || string.IsNullOrWhiteSpace(requestDto.FullName))
            {
                return BadRequest(new { message = "Company Name, Contact Person, and Email Address are required." });
            }

            if (requestDto.Items == null || requestDto.Items.Count == 0)
            {
                return BadRequest(new { message = "At least one luminaire item must be added to the quote schedule." });
            }

            string? filePath = null;
            string? fileName = null;
            long? fileSize = null;

            if (attachment != null && attachment.Length > 0)
            {
                try
                {
                    var fileResult = await _fileStorage.SaveFileAsync(attachment, "quotes");
                    filePath = fileResult.FilePath;
                    fileName = fileResult.FileName;
                    fileSize = fileResult.FileSize;
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = $"File attachment error: {ex.Message}" });
                }
            }

            var result = await _quoteService.CreateQuoteAsync(requestDto, filePath, fileName, fileSize);
            return Ok(result);
        }
    }
}
