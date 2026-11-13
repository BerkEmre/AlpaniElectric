namespace Alpani.Api.Models.Entities
{
    public class ProductVariant
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public string SkuCode { get; set; } = string.Empty; // e.g. ALP-M48-LIN1000-24W-30K-BLK-DALI
        public string Wattage { get; set; } = string.Empty; // e.g., "12W", "24W", "36W", "48W"
        public string LumenOutput { get; set; } = string.Empty; // e.g., "1440 lm", "2880 lm", "4320 lm"
        public string Cct { get; set; } = string.Empty; // "2700K", "3000K", "4000K", "Tunable White (2700K-6500K)"
        public string BeamAngle { get; set; } = string.Empty; // "15°", "24°", "36°", "60°", "110° Diffuse", "Asymmetric Wallwasher"
        public string BodyColor { get; set; } = string.Empty; // "Matte Black (RAL 9005)", "Matte White (RAL 9016)", "Brushed Gold", "Anodized Aluminum"
        public string ControlType { get; set; } = string.Empty; // "On-Off", "DALI-2", "0-10V", "Casambi Bluetooth"
        public string Dimensions { get; set; } = string.Empty; // e.g., "1000 x 26 x 45 mm"
        public bool IsDefault { get; set; } = false;
    }
}
