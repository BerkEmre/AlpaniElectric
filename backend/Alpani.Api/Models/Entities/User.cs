using System;

namespace Alpani.Api.Models.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "Admin"; // Admin, Staff, Customer
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
