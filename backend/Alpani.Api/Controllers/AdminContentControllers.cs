using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Alpani.Api.Data;
using Alpani.Api.DTOs;
using Alpani.Api.Models.Entities;
using Alpani.Api.Services;

namespace Alpani.Api.Controllers
{
    [ApiController]
    [Route("api/admin/distributors")]
    [Authorize(Roles = "Admin")]
    public class AdminDistributorsController : ControllerBase
    {
        private readonly AlpaniDbContext _db;

        public AdminDistributorsController(AlpaniDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<DistributorApplication>>> GetAll()
        {
            var apps = await _db.DistributorApplications
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();
            return Ok(apps);
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            var app = await _db.DistributorApplications.FindAsync(id);
            if (app == null) return NotFound(new { message = "Application not found." });

            app.Status = status;
            await _db.SaveChangesAsync();
            return Ok(new { message = "Status updated." });
        }
    }

    [ApiController]
    [Route("api/admin/uploads")]
    [Authorize(Roles = "Admin")]
    public class UploadsController : ControllerBase
    {
        private readonly IFileStorageService _fileStorage;

        public UploadsController(IFileStorageService fileStorage)
        {
            _fileStorage = fileStorage;
        }

        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromQuery] string subFolder = "media")
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "No file received." });

            try
            {
                var result = await _fileStorage.SaveFileAsync(file, subFolder);
                return Ok(new
                {
                    url = result.FilePath,
                    fileName = result.FileName,
                    size = result.FileSize
                });
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
