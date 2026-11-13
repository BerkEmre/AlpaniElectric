using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Alpani.Api.Data;
using Alpani.Api.DTOs;
using Alpani.Api.Models.Entities;

namespace Alpani.Api.Controllers
{
    [ApiController]
    [Route("api/admin/products")]
    [Authorize(Roles = "Admin")]
    public class AdminProductsController : ControllerBase
    {
        private readonly AlpaniDbContext _db;

        public AdminProductsController(AlpaniDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductListDto>>> GetAll()
        {
            var products = await _db.Products
                .Include(p => p.Category)
                .Include(p => p.Variants)
                .OrderByDescending(p => p.Id)
                .Select(p => new ProductListDto
                {
                    Id = p.Id,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category != null ? p.Category.Name : "",
                    CategorySlug = p.Category != null ? p.Category.Slug : "",
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

            return Ok(products);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDetailDto>> Create([FromBody] ProductCreateUpdateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Code))
            {
                return BadRequest(new { message = "Product Name and SKU Code are required." });
            }

            var slug = string.IsNullOrWhiteSpace(dto.Slug)
                ? dto.Name.ToLowerInvariant().Replace(" ", "-").Replace("/", "-")
                : dto.Slug.ToLowerInvariant();

            var product = new Product
            {
                CategoryId = dto.CategoryId,
                Code = dto.Code.Trim().ToUpperInvariant(),
                Name = dto.Name,
                Slug = slug,
                ShortDescription = dto.ShortDescription,
                TechnicalDescription = dto.TechnicalDescription,
                MainImageUrl = dto.MainImageUrl,
                GalleryImagesJson = dto.GalleryImagesJson,
                PolarDiagramUrl = dto.PolarDiagramUrl,
                DimensionDrawingUrl = dto.DimensionDrawingUrl,
                DatasheetPdfUrl = dto.DatasheetPdfUrl,
                IesFileUrl = dto.IesFileUrl,
                CadFileUrl = dto.CadFileUrl,
                ManualPdfUrl = dto.ManualPdfUrl,
                LedChipBrand = dto.LedChipBrand,
                DriverBrand = dto.DriverBrand,
                Material = dto.Material,
                IpRating = dto.IpRating,
                IkRating = dto.IkRating,
                Cri = dto.Cri,
                MacAdam = dto.MacAdam,
                Lifetime = dto.Lifetime,
                OperatingVoltage = dto.OperatingVoltage,
                Ugr = dto.Ugr,
                IsFeatured = dto.IsFeatured,
                IsActive = true
            };

            if (dto.Variants != null && dto.Variants.Count > 0)
            {
                foreach (var v in dto.Variants)
                {
                    product.Variants.Add(new ProductVariant
                    {
                        SkuCode = string.IsNullOrWhiteSpace(v.SkuCode) ? $"{product.Code}-{v.Wattage}-{v.Cct}" : v.SkuCode,
                        Wattage = v.Wattage,
                        LumenOutput = v.LumenOutput,
                        Cct = v.Cct,
                        BeamAngle = v.BeamAngle,
                        BodyColor = v.BodyColor,
                        ControlType = v.ControlType,
                        Dimensions = v.Dimensions,
                        IsDefault = v.IsDefault
                    });
                }
            }

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            return CreatedAtAction("GetProductBySlug", "Products", new { slug = product.Slug }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductCreateUpdateDto dto)
        {
            var product = await _db.Products.Include(p => p.Variants).FirstOrDefaultAsync(p => p.Id == id);
            if (product == null) return NotFound(new { message = $"Product #{id} not found." });

            product.CategoryId = dto.CategoryId;
            product.Code = dto.Code;
            product.Name = dto.Name;
            if (!string.IsNullOrWhiteSpace(dto.Slug)) product.Slug = dto.Slug;
            product.ShortDescription = dto.ShortDescription;
            product.TechnicalDescription = dto.TechnicalDescription;
            product.MainImageUrl = dto.MainImageUrl;
            product.GalleryImagesJson = dto.GalleryImagesJson;
            product.PolarDiagramUrl = dto.PolarDiagramUrl;
            product.DimensionDrawingUrl = dto.DimensionDrawingUrl;
            product.DatasheetPdfUrl = dto.DatasheetPdfUrl;
            product.IesFileUrl = dto.IesFileUrl;
            product.CadFileUrl = dto.CadFileUrl;
            product.ManualPdfUrl = dto.ManualPdfUrl;
            product.LedChipBrand = dto.LedChipBrand;
            product.DriverBrand = dto.DriverBrand;
            product.Material = dto.Material;
            product.IpRating = dto.IpRating;
            product.IkRating = dto.IkRating;
            product.Cri = dto.Cri;
            product.MacAdam = dto.MacAdam;
            product.Lifetime = dto.Lifetime;
            product.OperatingVoltage = dto.OperatingVoltage;
            product.Ugr = dto.Ugr;
            product.IsFeatured = dto.IsFeatured;

            // Update variants
            _db.ProductVariants.RemoveRange(product.Variants);
            if (dto.Variants != null)
            {
                foreach (var v in dto.Variants)
                {
                    product.Variants.Add(new ProductVariant
                    {
                        ProductId = product.Id,
                        SkuCode = string.IsNullOrWhiteSpace(v.SkuCode) ? $"{product.Code}-{v.Wattage}" : v.SkuCode,
                        Wattage = v.Wattage,
                        LumenOutput = v.LumenOutput,
                        Cct = v.Cct,
                        BeamAngle = v.BeamAngle,
                        BodyColor = v.BodyColor,
                        ControlType = v.ControlType,
                        Dimensions = v.Dimensions,
                        IsDefault = v.IsDefault
                    });
                }
            }

            await _db.SaveChangesAsync();
            return Ok(new { message = "Product updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null) return NotFound(new { message = $"Product #{id} not found." });

            product.IsActive = false; // Soft delete
            await _db.SaveChangesAsync();

            return Ok(new { message = "Product deactivated successfully." });
        }
    }
}
