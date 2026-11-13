using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Alpani.Api.Data;
using Alpani.Api.DTOs;
using Alpani.Api.Models.Entities;

namespace Alpani.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly AlpaniDbContext _db;

        public CategoriesController(AlpaniDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<CategoryDto>>> GetCategories()
        {
            var categories = await _db.Categories
                .Where(c => c.IsActive)
                .OrderBy(c => c.DisplayOrder)
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Slug = c.Slug,
                    Description = c.Description,
                    CoverImageUrl = c.CoverImageUrl,
                    DisplayOrder = c.DisplayOrder,
                    ProductCount = c.Products.Count(p => p.IsActive)
                })
                .ToListAsync();

            return Ok(categories);
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly AlpaniDbContext _db;

        public ProjectsController(AlpaniDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProjectDto>>> GetProjects()
        {
            var projects = await _db.Projects
                .Include(p => p.ProjectProducts)
                    .ThenInclude(pp => pp.Product)
                .OrderByDescending(p => p.CompletionYear)
                .ToListAsync();

            var dtos = projects.Select(p =>
            {
                var gallery = new List<string>();
                try
                {
                    if (!string.IsNullOrWhiteSpace(p.GalleryJson))
                        gallery = JsonSerializer.Deserialize<List<string>>(p.GalleryJson) ?? new();
                }
                catch { }

                return new ProjectDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Slug = p.Slug,
                    Location = p.Location,
                    CompletionYear = p.CompletionYear,
                    ArchitectName = p.ArchitectName,
                    LightingDesigner = p.LightingDesigner,
                    ApplicationType = p.ApplicationType,
                    Description = p.Description,
                    CoverImageUrl = p.CoverImageUrl,
                    GalleryImages = gallery,
                    IsFeatured = p.IsFeatured,
                    LuminaireCodes = p.ProjectProducts.Select(pp => pp.Product?.Code ?? "").Where(c => !string.IsNullOrEmpty(c)).ToList()
                };
            }).ToList();

            return Ok(dtos);
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<ProjectDto>> GetProjectBySlug(string slug)
        {
            var p = await _db.Projects
                .Include(p => p.ProjectProducts)
                    .ThenInclude(pp => pp.Product)
                .FirstOrDefaultAsync(pr => pr.Slug.ToLower() == slug.ToLower());

            if (p == null) return NotFound(new { message = "Project not found" });

            var gallery = new List<string>();
            try
            {
                if (!string.IsNullOrWhiteSpace(p.GalleryJson))
                    gallery = JsonSerializer.Deserialize<List<string>>(p.GalleryJson) ?? new();
            }
            catch { }

            return Ok(new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                Location = p.Location,
                CompletionYear = p.CompletionYear,
                ArchitectName = p.ArchitectName,
                LightingDesigner = p.LightingDesigner,
                ApplicationType = p.ApplicationType,
                Description = p.Description,
                CoverImageUrl = p.CoverImageUrl,
                GalleryImages = gallery,
                IsFeatured = p.IsFeatured,
                LuminaireCodes = p.ProjectProducts.Select(pp => pp.Product?.Code ?? "").Where(c => !string.IsNullOrEmpty(c)).ToList()
            });
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly AlpaniDbContext _db;

        public ApplicationsController(AlpaniDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<ApplicationAreaDto>>> GetApplications()
        {
            var apps = await _db.ApplicationAreas
                .OrderBy(a => a.DisplayOrder)
                .Select(a => new ApplicationAreaDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Slug = a.Slug,
                    Description = a.Description,
                    HeroImageUrl = a.HeroImageUrl,
                    ProductCount = a.ProductApplicationAreas.Count
                })
                .ToListAsync();

            return Ok(apps);
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class CataloguesController : ControllerBase
    {
        private readonly AlpaniDbContext _db;

        public CataloguesController(AlpaniDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<CatalogueDto>>> GetCatalogues()
        {
            var catalogues = await _db.Catalogues
                .Where(c => c.IsActive)
                .OrderBy(c => c.DisplayOrder)
                .Select(c => new CatalogueDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Type = c.Type,
                    Description = c.Description,
                    CoverImageUrl = c.CoverImageUrl,
                    PdfUrl = c.PdfUrl,
                    FileSize = c.FileSize,
                    VersionYear = c.VersionYear,
                    PageCount = c.PageCount
                })
                .ToListAsync();

            return Ok(catalogues);
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class DistributorsController : ControllerBase
    {
        private readonly AlpaniDbContext _db;

        public DistributorsController(AlpaniDbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Apply([FromBody] DistributorApplicationDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.CompanyName) || string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.ContactPerson))
            {
                return BadRequest(new { message = "Company name, contact person, and email are mandatory." });
            }

            var app = new DistributorApplication
            {
                CompanyName = dto.CompanyName,
                ContactPerson = dto.ContactPerson,
                Email = dto.Email,
                Phone = dto.Phone,
                Country = dto.Country,
                City = dto.City,
                Website = dto.Website,
                AnnualTurnover = dto.AnnualTurnover,
                CurrentBrands = dto.CurrentBrands,
                TargetMarkets = dto.TargetMarkets,
                Message = dto.Message,
                Status = "Pending",
                CreatedAt = System.DateTime.UtcNow
            };

            _db.DistributorApplications.Add(app);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Thank you. Your international distributor application has been registered with Alpani Global Export Division." });
        }
    }
}
