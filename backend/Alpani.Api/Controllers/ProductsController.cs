using System;
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
    public class ProductsController : ControllerBase
    {
        private readonly AlpaniDbContext _db;

        public ProductsController(AlpaniDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<ProductListDto>>> GetProducts([FromQuery] ProductFilterDto filter)
        {
            var query = _db.Products
                .Include(p => p.Category)
                .Include(p => p.Variants)
                .Where(p => p.IsActive)
                .AsQueryable();

            // Filter by Category (slug or name or id)
            if (!string.IsNullOrWhiteSpace(filter.Category))
            {
                var catTerm = filter.Category.Trim().ToLower();
                query = query.Where(p => p.Category != null && (p.Category.Slug.ToLower() == catTerm || p.Category.Name.ToLower() == catTerm));
            }

            // Search by Name, Code, ShortDescription
            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                var search = filter.Search.Trim().ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(search) ||
                                         p.Code.ToLower().Contains(search) ||
                                         p.ShortDescription.ToLower().Contains(search));
            }

            // Filter by Wattage
            if (!string.IsNullOrWhiteSpace(filter.Wattage))
            {
                var watt = filter.Wattage.Trim().ToLower();
                query = query.Where(p => p.Variants.Any(v => v.Wattage.ToLower().Contains(watt)));
            }

            // Filter by CCT
            if (!string.IsNullOrWhiteSpace(filter.Cct))
            {
                var cct = filter.Cct.Trim().ToLower();
                query = query.Where(p => p.Variants.Any(v => v.Cct.ToLower().Contains(cct)));
            }

            // Filter by CRI
            if (!string.IsNullOrWhiteSpace(filter.Cri))
            {
                var cri = filter.Cri.Trim().ToLower();
                query = query.Where(p => p.Cri.ToLower().Contains(cri));
            }

            // Filter by IP Rating
            if (!string.IsNullOrWhiteSpace(filter.IpRating))
            {
                var ip = filter.IpRating.Trim().ToLower();
                query = query.Where(p => p.IpRating.ToLower().Contains(ip));
            }

            // Filter by Beam Angle
            if (!string.IsNullOrWhiteSpace(filter.BeamAngle))
            {
                var beam = filter.BeamAngle.Trim().ToLower();
                query = query.Where(p => p.Variants.Any(v => v.BeamAngle.ToLower().Contains(beam)));
            }

            // Filter by Control Type
            if (!string.IsNullOrWhiteSpace(filter.ControlType))
            {
                var ctrl = filter.ControlType.Trim().ToLower();
                query = query.Where(p => p.Variants.Any(v => v.ControlType.ToLower().Contains(ctrl)));
            }

            // Featured
            if (filter.FeaturedOnly == true)
            {
                query = query.Where(p => p.IsFeatured);
            }

            var totalCount = await query.CountAsync();
            var products = await query
                .OrderByDescending(p => p.IsFeatured)
                .ThenBy(p => p.Id)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .Select(p => new ProductListDto
                {
                    Id = p.Id,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category != null ? p.Category.Name : string.Empty,
                    CategorySlug = p.Category != null ? p.Category.Slug : string.Empty,
                    Code = p.Code,
                    Name = p.Name,
                    Slug = p.Slug,
                    ShortDescription = p.ShortDescription,
                    MainImageUrl = p.MainImageUrl,
                    LedChipBrand = p.LedChipBrand,
                    DriverBrand = p.DriverBrand,
                    IpRating = p.IpRating,
                    Cri = p.Cri,
                    MacAdam = p.MacAdam,
                    Ugr = p.Ugr,
                    IsFeatured = p.IsFeatured,
                    Wattages = p.Variants.Select(v => v.Wattage).Distinct().ToList(),
                    Ccts = p.Variants.Select(v => v.Cct).Distinct().ToList(),
                    BeamAngles = p.Variants.Select(v => v.BeamAngle).Distinct().ToList(),
                    BodyColors = p.Variants.Select(v => v.BodyColor).Distinct().ToList(),
                    ControlTypes = p.Variants.Select(v => v.ControlType).Distinct().ToList()
                })
                .ToListAsync();

            return Ok(new PagedResult<ProductListDto>
            {
                Items = products,
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize
            });
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<ProductDetailDto>> GetProductBySlug(string slug)
        {
            var product = await _db.Products
                .Include(p => p.Category)
                .Include(p => p.Variants)
                .FirstOrDefaultAsync(p => p.Slug.ToLower() == slug.ToLower() || p.Code.ToLower() == slug.ToLower());

            if (product == null)
            {
                return NotFound(new { message = $"Product with slug '{slug}' was not found." });
            }

            List<string> gallery = new();
            try
            {
                if (!string.IsNullOrWhiteSpace(product.GalleryImagesJson))
                {
                    gallery = JsonSerializer.Deserialize<List<string>>(product.GalleryImagesJson) ?? new();
                }
            }
            catch { }

            var dto = new ProductDetailDto
            {
                Id = product.Id,
                CategoryId = product.CategoryId,
                CategoryName = product.Category?.Name ?? string.Empty,
                CategorySlug = product.Category?.Slug ?? string.Empty,
                Code = product.Code,
                Name = product.Name,
                Slug = product.Slug,
                ShortDescription = product.ShortDescription,
                TechnicalDescription = product.TechnicalDescription,
                MainImageUrl = product.MainImageUrl,
                GalleryImages = gallery,
                PolarDiagramUrl = product.PolarDiagramUrl,
                DimensionDrawingUrl = product.DimensionDrawingUrl,
                DatasheetPdfUrl = product.DatasheetPdfUrl,
                IesFileUrl = product.IesFileUrl,
                CadFileUrl = product.CadFileUrl,
                ManualPdfUrl = product.ManualPdfUrl,
                LedChipBrand = product.LedChipBrand,
                DriverBrand = product.DriverBrand,
                Material = product.Material,
                IpRating = product.IpRating,
                IkRating = product.IkRating,
                Cri = product.Cri,
                MacAdam = product.MacAdam,
                Lifetime = product.Lifetime,
                OperatingVoltage = product.OperatingVoltage,
                Ugr = product.Ugr,
                IsFeatured = product.IsFeatured,
                Variants = product.Variants.Select(v => new ProductVariantDto
                {
                    Id = v.Id,
                    SkuCode = v.SkuCode,
                    Wattage = v.Wattage,
                    LumenOutput = v.LumenOutput,
                    Cct = v.Cct,
                    BeamAngle = v.BeamAngle,
                    BodyColor = v.BodyColor,
                    ControlType = v.ControlType,
                    Dimensions = v.Dimensions,
                    IsDefault = v.IsDefault
                }).ToList()
            };

            return Ok(dto);
        }
    }
}
