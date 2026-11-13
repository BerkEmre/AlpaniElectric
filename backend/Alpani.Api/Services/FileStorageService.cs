using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Alpani.Api.Services
{
    public interface IFileStorageService
    {
        Task<(string FilePath, string FileName, long FileSize)> SaveFileAsync(IFormFile file, string subFolder);
        (byte[] Bytes, string ContentType, string FileName)? GetFile(string relativePath);
    }

    public class FileStorageService : IFileStorageService
    {
        private readonly IWebHostEnvironment _env;

        public FileStorageService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public async Task<(string FilePath, string FileName, long FileSize)> SaveFileAsync(IFormFile file, string subFolder)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File is empty");

            // Max 25 MB limit
            if (file.Length > 25 * 1024 * 1024)
                throw new InvalidOperationException("File size exceeds maximum allowed limit of 25MB.");

            var allowedExtensions = new[] { ".dwg", ".dxf", ".pdf", ".ies", ".ldt", ".xlsx", ".xls", ".zip", ".png", ".jpg", ".jpeg", ".webp" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!Array.Exists(allowedExtensions, ext => ext == extension))
            {
                throw new InvalidOperationException($"File extension {extension} is not permitted for upload.");
            }

            var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
            var uploadsDir = Path.Combine(webRoot, "uploads", subFolder);

            if (!Directory.Exists(uploadsDir))
            {
                Directory.CreateDirectory(uploadsDir);
            }

            var safeFileName = $"{Guid.NewGuid():N}_{Path.GetFileName(file.FileName)}";
            var fullPath = Path.Combine(uploadsDir, safeFileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var relativePath = $"/uploads/{subFolder}/{safeFileName}";
            return (relativePath, file.FileName, file.Length);
        }

        public (byte[] Bytes, string ContentType, string FileName)? GetFile(string relativePath)
        {
            if (string.IsNullOrWhiteSpace(relativePath)) return null;

            var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
            var cleanPath = relativePath.TrimStart('/', '\\').Replace('/', Path.DirectorySeparatorChar);
            var fullPath = Path.Combine(webRoot, cleanPath);

            if (!File.Exists(fullPath)) return null;

            var bytes = File.ReadAllBytes(fullPath);
            var ext = Path.GetExtension(fullPath).ToLowerInvariant();
            var contentType = ext switch
            {
                ".pdf" => "application/pdf",
                ".dwg" => "application/acad",
                ".dxf" => "application/dxf",
                ".ies" => "text/plain",
                ".ldt" => "text/plain",
                ".zip" => "application/zip",
                ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ".png" => "image/png",
                ".jpg" or ".jpeg" => "image/jpeg",
                ".webp" => "image/webp",
                _ => "application/octet-stream"
            };

            return (bytes, contentType, Path.GetFileName(fullPath));
        }
    }
}
