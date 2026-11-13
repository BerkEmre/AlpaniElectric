using System;
using System.Collections.Generic;
using System.Linq;
using Alpani.Api.Models.Entities;
using BCrypt.Net;

namespace Alpani.Api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AlpaniDbContext context)
        {
            context.Database.EnsureCreated();

            // 1. Seed Admin User
            if (!context.Users.Any())
            {
                var adminUser = new User
                {
                    FullName = "Alpani Chief Architect",
                    Email = "admin@alpani.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Alpani2026!Admin"),
                    Role = "Admin",
                    CreatedAt = DateTime.UtcNow
                };
                context.Users.Add(adminUser);
                context.SaveChanges();
            }

            // 2. Seed Categories
            if (!context.Categories.Any())
            {
                var categories = new List<Category>
                {
                    new Category
                    {
                        Name = "48V Magnetic",
                        Slug = "48v-magnetic",
                        Description = "Low-voltage 48V DC modular track systems with magnetic snap-in luminaires, linear diffusers, micro-spots, and wallwash modules for ultra-flexible architectural layouts.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 1,
                        IsActive = true
                    },
                    new Category
                    {
                        Name = "Profile",
                        Slug = "profile",
                        Description = "Precision-extruded aluminum linear profile systems for recessed, surface, trimless, and suspended architectural continuous lines of light.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 2,
                        IsActive = true
                    },
                    new Category
                    {
                        Name = "Tracklight",
                        Slug = "tracklight",
                        Description = "High-precision 3-phase and DALI track spotlights with adjustable optical zooms, framing projectors, and ultra-high CRI > 97 for retail and exhibition spaces.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 3,
                        IsActive = true
                    },
                    new Category
                    {
                        Name = "Recessed",
                        Slug = "recessed",
                        Description = "Architectural deep-regressed, dark-light downlights with UGR < 12 glare control, trimless installation rings, and IP54/IP65 options for wet areas.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 4,
                        IsActive = true
                    },
                    new Category
                    {
                        Name = "Surface / Pendant",
                        Slug = "surface-pendant",
                        Description = "Direct/indirect suspended cylinders, acoustic rings, and surface luminaires engineered for high ceilings and open commercial office spaces.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 5,
                        IsActive = true
                    },
                    new Category
                    {
                        Name = "Panel",
                        Slug = "panel",
                        Description = "Edge-lit and back-lit micro-prismatic optical panels with UGR < 19 compliant visual comfort, circadian rhythm Tunable White, and DALI-2 push integration.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 6,
                        IsActive = true
                    },
                    new Category
                    {
                        Name = "Wall",
                        Slug = "wall",
                        Description = "Bi-directional up/down wall grazers, indirect wallwashers, and step lights engineered with IP65 weather-resistance and anti-corrosive powder coatings.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 7,
                        IsActive = true
                    },
                    new Category
                    {
                        Name = "Decorative",
                        Slug = "decorative",
                        Description = "Artistic and sculptural statement chandeliers, blown-glass pendants, and acoustic fabric installations merging lighting science with interior luxury.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 8,
                        IsActive = true
                    }
                };

                context.Categories.AddRange(categories);
                context.SaveChanges();
            }

            // 3. Seed Application Areas
            if (!context.ApplicationAreas.Any())
            {
                var areas = new List<ApplicationArea>
                {
                    new ApplicationArea
                    {
                        Name = "Office & Commercial",
                        Slug = "office-commercial",
                        Description = "Human-centric lighting, low glare UGR < 19, circadian rhythm tuning, and smart presence automation.",
                        HeroImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 1
                    },
                    new ApplicationArea
                    {
                        Name = "Retail & Hospitality",
                        Slug = "retail-hospitality",
                        Description = "High-contrast accentuation, vivid color fidelity Ra > 95, luxury warmth, and dynamic DALI scene control.",
                        HeroImageUrl = "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 2
                    },
                    new ApplicationArea
                    {
                        Name = "Museums & Galleries",
                        Slug = "museums-galleries",
                        Description = "Zero-UV, zero-IR conservation optical design, MacAdam Step 2 color consistency, and optical framing shutters.",
                        HeroImageUrl = "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 3
                    },
                    new ApplicationArea
                    {
                        Name = "Residential & Penthouse",
                        Slug = "residential-penthouse",
                        Description = "Minimalist trimless integration, warm dimming 1800K-3000K, and bespoke architectural profiles.",
                        HeroImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                        DisplayOrder = 4
                    }
                };

                context.ApplicationAreas.AddRange(areas);
                context.SaveChanges();
            }

            // 4. Seed Products and Variants
            if (!context.Products.Any())
            {
                var catMagnetic = context.Categories.First(c => c.Slug == "48v-magnetic");
                var catProfile = context.Categories.First(c => c.Slug == "profile");
                var catTrack = context.Categories.First(c => c.Slug == "tracklight");
                var catRecessed = context.Categories.First(c => c.Slug == "recessed");
                var catPendant = context.Categories.First(c => c.Slug == "surface-pendant");
                var catPanel = context.Categories.First(c => c.Slug == "panel");
                var catWall = context.Categories.First(c => c.Slug == "wall");
                var catDecorative = context.Categories.First(c => c.Slug == "decorative");

                var products = new List<Product>
                {
                    // 1. 48V Magnetic Linear Diffuse
                    new Product
                    {
                        CategoryId = catMagnetic.Id,
                        Code = "ALP-M48-LIN1000",
                        Name = "VECTA 48V Magnetic Opal Linear",
                        Slug = "vecta-48v-magnetic-opal-linear",
                        ShortDescription = "Slim 48V low-voltage magnetic snap-in diffuse linear module delivering seamless, dot-free general illumination.",
                        TechnicalDescription = "Constructed from 6063-T5 aerospace extruded aluminum with an internal magnetic mechanical lock. Features frosted PMMA diffuser for 110° lambertian distribution and Nichia 757G LEDs. Integrated 48V DC constant-current buck converter with DALI-2 addressability.",
                        MainImageUrl = "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
                        GalleryImagesJson = "[\"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80\",\"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80\"]",
                        PolarDiagramUrl = "/assets/photometrics/polar-vecta-lin.svg",
                        DimensionDrawingUrl = "/assets/cad/dim-vecta-lin1000.svg",
                        DatasheetPdfUrl = "/downloads/datasheets/ALP-M48-LIN1000-Datasheet.pdf",
                        IesFileUrl = "/downloads/photometrics/ALP-M48-LIN1000.ies",
                        CadFileUrl = "/downloads/cad/ALP-M48-LIN1000.dwg",
                        ManualPdfUrl = "/downloads/manuals/ALP-M48-Installation.pdf",
                        LedChipBrand = "Nichia 757G Mid-Power",
                        DriverBrand = "Tridonic DC-String DALI-2",
                        Material = "Extruded AL6063-T5 + Opal Polycarbonate",
                        IpRating = "IP20",
                        IkRating = "IK06",
                        Cri = "Ra > 90 (R9 > 50)",
                        MacAdam = "SDCM < 3 (3-Step)",
                        Lifetime = "L90B10 > 60,000 hrs",
                        OperatingVoltage = "48V DC SELV",
                        Ugr = "< 19",
                        IsFeatured = true,
                        IsActive = true,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { SkuCode = "ALP-M48-LIN1000-24W-30K-BLK-DALI", Wattage = "24W", LumenOutput = "2640 lm", Cct = "3000K", BeamAngle = "110° Diffuse", BodyColor = "Matte Black (RAL 9005)", ControlType = "DALI-2", Dimensions = "1000 x 26 x 45 mm", IsDefault = true },
                            new ProductVariant { SkuCode = "ALP-M48-LIN1000-24W-40K-BLK-DALI", Wattage = "24W", LumenOutput = "2850 lm", Cct = "4000K", BeamAngle = "110° Diffuse", BodyColor = "Matte Black (RAL 9005)", ControlType = "DALI-2", Dimensions = "1000 x 26 x 45 mm" },
                            new ProductVariant { SkuCode = "ALP-M48-LIN1000-24W-30K-WHT-DALI", Wattage = "24W", LumenOutput = "2640 lm", Cct = "3000K", BeamAngle = "110° Diffuse", BodyColor = "Matte White (RAL 9016)", ControlType = "DALI-2", Dimensions = "1000 x 26 x 45 mm" },
                            new ProductVariant { SkuCode = "ALP-M48-LIN1000-36W-TW-BLK-CAS", Wattage = "36W", LumenOutput = "3800 lm", Cct = "Tunable White (2700K-6500K)", BeamAngle = "110° Diffuse", BodyColor = "Matte Black (RAL 9005)", ControlType = "Casambi Bluetooth", Dimensions = "1000 x 26 x 45 mm" }
                        }
                    },

                    // 2. 48V Magnetic Micro Spot
                    new Product
                    {
                        CategoryId = catMagnetic.Id,
                        Code = "ALP-M48-SPOT40",
                        Name = "KRONOS 48V Magnetic Architectural Spot",
                        Slug = "kronos-48v-magnetic-architectural-spot",
                        ShortDescription = "360° rotatable 90° tiltable magnetic accent luminaire equipped with hybrid collimator lens and dark-light anti-glare snoot.",
                        TechnicalDescription = "Precision CNC machined aluminum body with concealed hinge wiring. Features Citizen COB LED, Ra > 97 with deep red R9 > 90 reproduction. Multiple optical field-swappable reflectors (15°, 24°, 36°) and honeycomb louvre attachment support.",
                        MainImageUrl = "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
                        GalleryImagesJson = "[\"https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80\"]",
                        PolarDiagramUrl = "/assets/photometrics/polar-kronos-spot.svg",
                        DimensionDrawingUrl = "/assets/cad/dim-kronos-spot40.svg",
                        DatasheetPdfUrl = "/downloads/datasheets/ALP-M48-SPOT40-Datasheet.pdf",
                        IesFileUrl = "/downloads/photometrics/ALP-M48-SPOT40.ies",
                        CadFileUrl = "/downloads/cad/ALP-M48-SPOT40.dwg",
                        ManualPdfUrl = "/downloads/manuals/ALP-M48-Installation.pdf",
                        LedChipBrand = "Citizen CLU028 High-CRI COB",
                        DriverBrand = "Boke DC-48V Mini DALI-2",
                        Material = "Die-Cast AL6063 Aluminum",
                        IpRating = "IP20",
                        IkRating = "IK04",
                        Cri = "Ra > 97 (R9 > 90)",
                        MacAdam = "SDCM < 2 (2-Step Ellipse)",
                        Lifetime = "L90B10 > 55,000 hrs",
                        OperatingVoltage = "48V DC SELV",
                        Ugr = "< 13",
                        IsFeatured = true,
                        IsActive = true,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { SkuCode = "ALP-M48-SPOT40-12W-30K-15D-BLK", Wattage = "12W", LumenOutput = "1180 lm", Cct = "3000K", BeamAngle = "15° Spot", BodyColor = "Matte Black (RAL 9005)", ControlType = "DALI-2", Dimensions = "Ø40 x 110 mm", IsDefault = true },
                            new ProductVariant { SkuCode = "ALP-M48-SPOT40-12W-30K-24D-BLK", Wattage = "12W", LumenOutput = "1220 lm", Cct = "3000K", BeamAngle = "24° Medium", BodyColor = "Matte Black (RAL 9005)", ControlType = "DALI-2", Dimensions = "Ø40 x 110 mm" },
                            new ProductVariant { SkuCode = "ALP-M48-SPOT40-12W-30K-36D-GLD", Wattage = "12W", LumenOutput = "1220 lm", Cct = "3000K", BeamAngle = "36° Flood", BodyColor = "Brushed Gold", ControlType = "DALI-2", Dimensions = "Ø40 x 110 mm" },
                            new ProductVariant { SkuCode = "ALP-M48-SPOT40-12W-27K-24D-WHT", Wattage = "12W", LumenOutput = "1140 lm", Cct = "2700K Warm", BeamAngle = "24° Medium", BodyColor = "Matte White (RAL 9016)", ControlType = "Casambi Bluetooth", Dimensions = "Ø40 x 110 mm" }
                        }
                    },

                    // 3. Architectural Continuous Profile
                    new Product
                    {
                        CategoryId = catProfile.Id,
                        Code = "ALP-PRF-SLIM50",
                        Name = "MODULA-50 Architectural Recessed / Trimless Linear",
                        Slug = "modula-50-architectural-recessed-trimless-linear",
                        ShortDescription = "Continuous seamless architectural linear profile for drywall ceiling integration, creating unbroken light paths up to 50 meters.",
                        TechnicalDescription = "Constructed with dual-chamber heat dissipation aluminum chassis and quick-snap rolling micro-prismatic optical diffuser. Supports through-wiring (5-pole / 7-pole for DALI and emergency battery packs). High luminous efficacy up to 135 lm/W.",
                        MainImageUrl = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
                        GalleryImagesJson = "[\"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80\"]",
                        PolarDiagramUrl = "/assets/photometrics/polar-modula-50.svg",
                        DimensionDrawingUrl = "/assets/cad/dim-modula-50.svg",
                        DatasheetPdfUrl = "/downloads/datasheets/ALP-PRF-SLIM50-Datasheet.pdf",
                        IesFileUrl = "/downloads/photometrics/ALP-PRF-SLIM50.ies",
                        CadFileUrl = "/downloads/cad/ALP-PRF-SLIM50.dwg",
                        ManualPdfUrl = "/downloads/manuals/ALP-PRF-Installation.pdf",
                        LedChipBrand = "Samsung LM301B Top Bin",
                        DriverBrand = "Osram Optotronic Intelligent DALI-2",
                        Material = "Extruded AL6060 Aluminum + PMMA Diffuser",
                        IpRating = "IP40",
                        IkRating = "IK07",
                        Cri = "Ra > 90",
                        MacAdam = "SDCM < 3",
                        Lifetime = "L80B10 > 70,000 hrs",
                        OperatingVoltage = "220-240V AC 50/60Hz",
                        Ugr = "< 19",
                        IsFeatured = true,
                        IsActive = true,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { SkuCode = "ALP-PRF-SLIM50-32W-30K-1200-BLK", Wattage = "32W", LumenOutput = "4100 lm", Cct = "3000K", BeamAngle = "85° Microprismatic", BodyColor = "Matte Black (RAL 9005)", ControlType = "DALI-2", Dimensions = "1135 x 50 x 75 mm", IsDefault = true },
                            new ProductVariant { SkuCode = "ALP-PRF-SLIM50-32W-40K-1200-WHT", Wattage = "32W", LumenOutput = "4400 lm", Cct = "4000K", BeamAngle = "85° Microprismatic", BodyColor = "Matte White (RAL 9016)", ControlType = "DALI-2", Dimensions = "1135 x 50 x 75 mm" },
                            new ProductVariant { SkuCode = "ALP-PRF-SLIM50-64W-40K-2400-ALU", Wattage = "64W", LumenOutput = "8800 lm", Cct = "4000K", BeamAngle = "85° Microprismatic", BodyColor = "Anodized Aluminum", ControlType = "DALI-2", Dimensions = "2270 x 50 x 75 mm" }
                        }
                    },

                    // 4. Commercial Profile - Suspended Direct/Indirect
                    new Product
                    {
                        CategoryId = catProfile.Id,
                        Code = "ALP-PRF-AERO70",
                        Name = "AERO-70 Direct/Indirect Suspended Office Profile",
                        Slug = "aero-70-direct-indirect-suspended-office-profile",
                        ShortDescription = "Ergonomic workplace suspended luminaire with 70% direct task lighting and 30% indirect ceiling wash for premium corporate environments.",
                        TechnicalDescription = "Features split-circuit DALI controls allowing independent dimming of direct task and indirect ambient components. Micro-louvre dark-light optics provide UGR < 16, entirely eliminating computer screen reflections. Includes stainless steel aircraft suspension kits.",
                        MainImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
                        GalleryImagesJson = "[\"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80\"]",
                        PolarDiagramUrl = "/assets/photometrics/polar-aero70.svg",
                        DimensionDrawingUrl = "/assets/cad/dim-aero70.svg",
                        DatasheetPdfUrl = "/downloads/datasheets/ALP-PRF-AERO70-Datasheet.pdf",
                        IesFileUrl = "/downloads/photometrics/ALP-PRF-AERO70.ies",
                        CadFileUrl = "/downloads/cad/ALP-PRF-AERO70.dwg",
                        ManualPdfUrl = "/downloads/manuals/ALP-AERO-Suspension.pdf",
                        LedChipBrand = "Nichia 3030 Mid-Power",
                        DriverBrand = "Tridonic LCA One4All DALI-2",
                        Material = "Seamless Aerospace Aluminum Extrusion",
                        IpRating = "IP20",
                        IkRating = "IK06",
                        Cri = "Ra > 90",
                        MacAdam = "SDCM < 3",
                        Lifetime = "L90B10 > 60,000 hrs",
                        OperatingVoltage = "220-240V AC",
                        Ugr = "< 16",
                        IsFeatured = false,
                        IsActive = true,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { SkuCode = "ALP-PRF-AERO70-48W-40K-WHT-DALI", Wattage = "48W (32W Down + 16W Up)", LumenOutput = "6200 lm", Cct = "4000K", BeamAngle = "65° Down / 120° Up", BodyColor = "Matte White (RAL 9016)", ControlType = "DALI-2", Dimensions = "1420 x 70 x 85 mm", IsDefault = true },
                            new ProductVariant { SkuCode = "ALP-PRF-AERO70-48W-30K-BLK-DALI", Wattage = "48W (32W Down + 16W Up)", LumenOutput = "5900 lm", Cct = "3000K", BeamAngle = "65° Down / 120° Up", BodyColor = "Matte Black (RAL 9005)", ControlType = "DALI-2", Dimensions = "1420 x 70 x 85 mm" }
                        }
                    },

                    // 5. Tracklight - Master Zoom
                    new Product
                    {
                        CategoryId = catTrack.Id,
                        Code = "ALP-TRK-OPTIX35",
                        Name = "OPTIX-35 Precision Zoom Track Spotlight",
                        Slug = "optix-35-precision-zoom-track-spotlight",
                        ShortDescription = "3-circuit DALI tracklight equipped with stepless mechanical zoom ring (15° to 55°) and museum-grade Ra > 98 color rendering.",
                        TechnicalDescription = "Engineered for premium retail boutiques, galleries, and car showrooms. Built-in passive cold-forged heatsink ensures thermal dissipation with zero fan noise. Front optic accommodates framing snoots, honeycomb louvres, and ovalizing lenses.",
                        MainImageUrl = "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
                        GalleryImagesJson = "[\"https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80\"]",
                        PolarDiagramUrl = "/assets/photometrics/polar-optix35.svg",
                        DimensionDrawingUrl = "/assets/cad/dim-optix35.svg",
                        DatasheetPdfUrl = "/downloads/datasheets/ALP-TRK-OPTIX35-Datasheet.pdf",
                        IesFileUrl = "/downloads/photometrics/ALP-TRK-OPTIX35.ies",
                        CadFileUrl = "/downloads/cad/ALP-TRK-OPTIX35.dwg",
                        ManualPdfUrl = "/downloads/manuals/ALP-TRK-Manual.pdf",
                        LedChipBrand = "Citizen High-Fidelity COB Ra98",
                        DriverBrand = "Global Track In-Adapter DALI-2 Driver",
                        Material = "Cold-Forged Aluminum & Optical Glass",
                        IpRating = "IP20",
                        IkRating = "IK05",
                        Cri = "Ra > 98 (R9 > 95)",
                        MacAdam = "SDCM < 2",
                        Lifetime = "L90B10 > 50,000 hrs",
                        OperatingVoltage = "220-240V AC 3-Phase",
                        Ugr = "< 14",
                        IsFeatured = true,
                        IsActive = true,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { SkuCode = "ALP-TRK-OPTIX35-35W-30K-ZM-BLK", Wattage = "35W", LumenOutput = "3400 lm", Cct = "3000K", BeamAngle = "15°-55° Stepless Zoom", BodyColor = "Matte Black (RAL 9005)", ControlType = "DALI-2", Dimensions = "Ø85 x 220 mm", IsDefault = true },
                            new ProductVariant { SkuCode = "ALP-TRK-OPTIX35-35W-40K-ZM-BLK", Wattage = "35W", LumenOutput = "3650 lm", Cct = "4000K", BeamAngle = "15°-55° Stepless Zoom", BodyColor = "Matte Black (RAL 9005)", ControlType = "DALI-2", Dimensions = "Ø85 x 220 mm" },
                            new ProductVariant { SkuCode = "ALP-TRK-OPTIX35-35W-30K-ZM-WHT", Wattage = "35W", LumenOutput = "3400 lm", Cct = "3000K", BeamAngle = "15°-55° Stepless Zoom", BodyColor = "Matte White (RAL 9016)", ControlType = "DALI-2", Dimensions = "Ø85 x 220 mm" }
                        }
                    },

                    // 6. Recessed Dark-Light Downlight
                    new Product
                    {
                        CategoryId = catRecessed.Id,
                        Code = "ALP-REC-DARK80",
                        Name = "LUMENOR Dark-Light Architectural Downlight",
                        Slug = "lumenor-dark-light-architectural-downlight",
                        ShortDescription = "Deep-regressed visual comfort downlight offering UGR < 10 with hidden light source effect and magnetic quick-swap bezels.",
                        TechnicalDescription = "Features 45° cut-off angle preventing direct luminaire glare. Cast aluminum thermal housing and precision vacuum-metalized specular reflector. Available with round or square trim and round trimless plaster-in frames. IP54 rated front face.",
                        MainImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
                        GalleryImagesJson = "[\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80\"]",
                        PolarDiagramUrl = "/assets/photometrics/polar-lumenor.svg",
                        DimensionDrawingUrl = "/assets/cad/dim-lumenor.svg",
                        DatasheetPdfUrl = "/downloads/datasheets/ALP-REC-DARK80-Datasheet.pdf",
                        IesFileUrl = "/downloads/photometrics/ALP-REC-DARK80.ies",
                        CadFileUrl = "/downloads/cad/ALP-REC-DARK80.dwg",
                        ManualPdfUrl = "/downloads/manuals/ALP-REC-Manual.pdf",
                        LedChipBrand = "Bridgelux V-Series HD COB",
                        DriverBrand = "EldoLED ECOdrive DALI-2 / 0-10V",
                        Material = "Die-Cast Aluminum + Specular Dark Reflector",
                        IpRating = "IP54",
                        IkRating = "IK06",
                        Cri = "Ra > 95",
                        MacAdam = "SDCM < 2",
                        Lifetime = "L90B10 > 55,000 hrs",
                        OperatingVoltage = "220-240V AC",
                        Ugr = "< 10",
                        IsFeatured = true,
                        IsActive = true,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { SkuCode = "ALP-REC-DARK80-15W-30K-24D-BLK", Wattage = "15W", LumenOutput = "1550 lm", Cct = "3000K", BeamAngle = "24° Spot", BodyColor = "Matte Black (RAL 9005)", ControlType = "DALI-2", Dimensions = "Ø92 x 105 mm (Cutout Ø80 mm)", IsDefault = true },
                            new ProductVariant { SkuCode = "ALP-REC-DARK80-15W-30K-38D-WHT", Wattage = "15W", LumenOutput = "1550 lm", Cct = "3000K", BeamAngle = "38° Flood", BodyColor = "Matte White (RAL 9016)", ControlType = "DALI-2", Dimensions = "Ø92 x 105 mm (Cutout Ø80 mm)" },
                            new ProductVariant { SkuCode = "ALP-REC-DARK80-25W-30K-38D-BLK", Wattage = "25W", LumenOutput = "2700 lm", Cct = "3000K", BeamAngle = "38° Flood", BodyColor = "Matte Black (RAL 9005)", ControlType = "DALI-2", Dimensions = "Ø115 x 125 mm (Cutout Ø100 mm)" }
                        }
                    },

                    // 7. Surface / Pendant Cylinder
                    new Product
                    {
                        CategoryId = catPendant.Id,
                        Code = "ALP-PEN-CYL65",
                        Name = "CYLINDRO-65 Architectural Suspended Cylinder",
                        Slug = "cylindro-65-architectural-suspended-cylinder",
                        ShortDescription = "Minimalist tubular pendant luminaire featuring concealed ceiling canopy and textile fabric power suspension cable.",
                        TechnicalDescription = "Machined from solid aluminum billet with interchangeable decorative baffle rings (Black, Gold, White). Deep recess optic provides glare-free downlight for reception counters, dining tables, and double-height lobbies.",
                        MainImageUrl = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80",
                        GalleryImagesJson = "[\"https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80\"]",
                        PolarDiagramUrl = "/assets/photometrics/polar-cylindro.svg",
                        DimensionDrawingUrl = "/assets/cad/dim-cylindro.svg",
                        DatasheetPdfUrl = "/downloads/datasheets/ALP-PEN-CYL65-Datasheet.pdf",
                        IesFileUrl = "/downloads/photometrics/ALP-PEN-CYL65.ies",
                        CadFileUrl = "/downloads/cad/ALP-PEN-CYL65.dwg",
                        ManualPdfUrl = "/downloads/manuals/ALP-CYL-Installation.pdf",
                        LedChipBrand = "Citizen COB Ra95",
                        DriverBrand = "Tridonic Constant Current DALI-2",
                        Material = "CNC Machined Aluminum + Billet Baffle",
                        IpRating = "IP20",
                        IkRating = "IK06",
                        Cri = "Ra > 95",
                        MacAdam = "SDCM < 3",
                        Lifetime = "L90B10 > 50,000 hrs",
                        OperatingVoltage = "220-240V AC",
                        Ugr = "< 15",
                        IsFeatured = false,
                        IsActive = true,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { SkuCode = "ALP-PEN-CYL65-18W-30K-36D-BLK", Wattage = "18W", LumenOutput = "1850 lm", Cct = "3000K", BeamAngle = "36° Medium", BodyColor = "Matte Black (RAL 9005)", ControlType = "DALI-2", Dimensions = "Ø65 x 260 mm (Suspension 1500mm)", IsDefault = true },
                            new ProductVariant { SkuCode = "ALP-PEN-CYL65-18W-30K-36D-GLD", Wattage = "18W", LumenOutput = "1850 lm", Cct = "3000K", BeamAngle = "36° Medium", BodyColor = "Brushed Gold", ControlType = "DALI-2", Dimensions = "Ø65 x 260 mm (Suspension 1500mm)" }
                        }
                    },

                    // 8. Panel - UGR < 19 Microprismatic
                    new Product
                    {
                        CategoryId = catPanel.Id,
                        Code = "ALP-PNL-LUMIX60",
                        Name = "LUMIX-60 Micro-Prismatic Office Panel",
                        Slug = "lumix-60-micro-prismatic-office-panel",
                        ShortDescription = "Premium 600x600 mm backlit LED panel with multilayer microprismatic optic conforming strictly to EN 12464-1 workplace standards.",
                        TechnicalDescription = "Constructed with seamless laser-welded aluminum frame and high-efficiency optical PMMA light guide. Flicker-free ripple < 1% driver prevents eye strain and camera interference in conference video rooms. Available with Tunable White circadian control.",
                        MainImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
                        GalleryImagesJson = "[\"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80\"]",
                        PolarDiagramUrl = "/assets/photometrics/polar-lumix60.svg",
                        DimensionDrawingUrl = "/assets/cad/dim-lumix60.svg",
                        DatasheetPdfUrl = "/downloads/datasheets/ALP-PNL-LUMIX60-Datasheet.pdf",
                        IesFileUrl = "/downloads/photometrics/ALP-PNL-LUMIX60.ies",
                        CadFileUrl = "/downloads/cad/ALP-PNL-LUMIX60.dwg",
                        ManualPdfUrl = "/downloads/manuals/ALP-PNL-Installation.pdf",
                        LedChipBrand = "Samsung LM281B+ Pro",
                        DriverBrand = "Philips Xitanium DALI-2 TouchDim",
                        Material = "Extruded AL6063 Frame + PMMA Microprism",
                        IpRating = "IP44",
                        IkRating = "IK04",
                        Cri = "Ra > 90",
                        MacAdam = "SDCM < 3",
                        Lifetime = "L80B10 > 70,000 hrs",
                        OperatingVoltage = "220-240V AC",
                        Ugr = "< 18",
                        IsFeatured = false,
                        IsActive = true,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { SkuCode = "ALP-PNL-LUMIX60-36W-40K-WHT-DALI", Wattage = "36W", LumenOutput = "4500 lm", Cct = "4000K", BeamAngle = "90° Prismatic", BodyColor = "Matte White (RAL 9016)", ControlType = "DALI-2", Dimensions = "595 x 595 x 32 mm", IsDefault = true },
                            new ProductVariant { SkuCode = "ALP-PNL-LUMIX60-36W-30K-WHT-DALI", Wattage = "36W", LumenOutput = "4300 lm", Cct = "3000K", BeamAngle = "90° Prismatic", BodyColor = "Matte White (RAL 9016)", ControlType = "DALI-2", Dimensions = "595 x 595 x 32 mm" },
                            new ProductVariant { SkuCode = "ALP-PNL-LUMIX60-40W-TW-WHT-CAS", Wattage = "40W", LumenOutput = "4800 lm", Cct = "Tunable White (2700K-6500K)", BeamAngle = "90° Prismatic", BodyColor = "Matte White (RAL 9016)", ControlType = "Casambi Bluetooth", Dimensions = "595 x 595 x 32 mm" }
                        }
                    },

                    // 9. Wall - Up/Down Architectural Blade
                    new Product
                    {
                        CategoryId = catWall.Id,
                        Code = "ALP-WAL-BLADE",
                        Name = "BLADE-IP65 Bi-Directional Wall Luminaire",
                        Slug = "blade-ip65-bi-directional-wall-luminaire",
                        ShortDescription = "Sleek architectural exterior/interior wall luminaire projecting razor-sharp blades of light up and down across textured masonry.",
                        TechnicalDescription = "Die-cast marine grade aluminum housing treated with 20-micron fluorocarbon anti-saline powder coating. Tempered 4mm ultra-clear borosilicate glass lenses with silicon gasket seals ensuring IP65 weatherproof integrity.",
                        MainImageUrl = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
                        GalleryImagesJson = "[\"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80\"]",
                        PolarDiagramUrl = "/assets/photometrics/polar-blade.svg",
                        DimensionDrawingUrl = "/assets/cad/dim-blade.svg",
                        DatasheetPdfUrl = "/downloads/datasheets/ALP-WAL-BLADE-Datasheet.pdf",
                        IesFileUrl = "/downloads/photometrics/ALP-WAL-BLADE.ies",
                        CadFileUrl = "/downloads/cad/ALP-WAL-BLADE.dwg",
                        ManualPdfUrl = "/downloads/manuals/ALP-WAL-Installation.pdf",
                        LedChipBrand = "Cree XP-G3 High Power",
                        DriverBrand = "Mean Well IP67 DALI-2 Driver",
                        Material = "Marine Grade Die-Cast Aluminum",
                        IpRating = "IP65",
                        IkRating = "IK08",
                        Cri = "Ra > 90",
                        MacAdam = "SDCM < 3",
                        Lifetime = "L90B10 > 50,000 hrs",
                        OperatingVoltage = "220-240V AC",
                        Ugr = "N/A (Indirect)",
                        IsFeatured = true,
                        IsActive = true,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { SkuCode = "ALP-WAL-BLADE-16W-30K-BLK-ONOFF", Wattage = "16W (8W Up + 8W Down)", LumenOutput = "1500 lm", Cct = "3000K", BeamAngle = "10° Razor Beam", BodyColor = "Matte Black (RAL 9005)", ControlType = "On-Off", Dimensions = "160 x 120 x 48 mm", IsDefault = true },
                            new ProductVariant { SkuCode = "ALP-WAL-BLADE-16W-30K-ANT-DALI", Wattage = "16W (8W Up + 8W Down)", LumenOutput = "1500 lm", Cct = "3000K", BeamAngle = "10° Razor Beam", BodyColor = "Anthracite Grey (RAL 7016)", ControlType = "DALI-2", Dimensions = "160 x 120 x 48 mm" }
                        }
                    },

                    // 10. Decorative - Sculptural Ring
                    new Product
                    {
                        CategoryId = catDecorative.Id,
                        Code = "ALP-DEC-AURA1200",
                        Name = "AURA-1200 Suspended Halo Chandelier",
                        Slug = "aura-1200-suspended-halo-chandelier",
                        ShortDescription = "Ø1200mm circular continuous light ring crafted in brushed champagne gold with inward & downward acoustic illumination.",
                        TechnicalDescription = "Constructed from continuous seamless curved aluminum profile with hand-finished electroplated champagne brass finish. Opal silicon curved sleeve diffuser. Suspended via ultra-fine conductive coaxial micro-cables for an ethereal floating appearance.",
                        MainImageUrl = "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
                        GalleryImagesJson = "[\"https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80\"]",
                        PolarDiagramUrl = "/assets/photometrics/polar-aura.svg",
                        DimensionDrawingUrl = "/assets/cad/dim-aura1200.svg",
                        DatasheetPdfUrl = "/downloads/datasheets/ALP-DEC-AURA1200-Datasheet.pdf",
                        IesFileUrl = "/downloads/photometrics/ALP-DEC-AURA1200.ies",
                        CadFileUrl = "/downloads/cad/ALP-DEC-AURA1200.dwg",
                        ManualPdfUrl = "/downloads/manuals/ALP-AURA-Manual.pdf",
                        LedChipBrand = "Samsung CSP Ultra-Flexible Array",
                        DriverBrand = "Tridonic Premium DALI-2 Driver",
                        Material = "Seamless Curved AL6063 + Electroplated Brass",
                        IpRating = "IP20",
                        IkRating = "IK04",
                        Cri = "Ra > 95",
                        MacAdam = "SDCM < 2",
                        Lifetime = "L80B10 > 60,000 hrs",
                        OperatingVoltage = "220-240V AC",
                        Ugr = "< 19",
                        IsFeatured = true,
                        IsActive = true,
                        Variants = new List<ProductVariant>
                        {
                            new ProductVariant { SkuCode = "ALP-DEC-AURA1200-55W-27K-GLD-DALI", Wattage = "55W", LumenOutput = "5200 lm", Cct = "2700K Warm", BeamAngle = "120° Inward & Down", BodyColor = "Brushed Gold", ControlType = "DALI-2", Dimensions = "Ø1200 x 30 x 40 mm", IsDefault = true },
                            new ProductVariant { SkuCode = "ALP-DEC-AURA1200-55W-30K-BLK-CAS", Wattage = "55W", LumenOutput = "5400 lm", Cct = "3000K", BeamAngle = "120° Inward & Down", BodyColor = "Matte Black (RAL 9005)", ControlType = "Casambi Bluetooth", Dimensions = "Ø1200 x 30 x 40 mm" }
                        }
                    }
                };

                context.Products.AddRange(products);
                context.SaveChanges();
            }

            // 5. Seed Projects
            if (!context.Projects.Any())
            {
                var projects = new List<Project>
                {
                    new Project
                    {
                        Title = "Istanbul International Financial Center HQ",
                        Slug = "istanbul-financial-center-hq",
                        Location = "Istanbul, Turkey",
                        CompletionYear = 2025,
                        ArchitectName = "HPP Architects & Tabanlioglu",
                        LightingDesigner = "Alpani Engineering & Atelier Lux",
                        ApplicationType = "Commercial Headquarters",
                        Description = "45,000 m² corporate headquarters illuminated with over 4,200 meters of bespoke Alpani Modula-50 continuous profile systems and VECTA 48V magnetic track layouts integrated into acoustical wood slat ceilings.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                        GalleryJson = "[\"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80\",\"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80\"]",
                        IsFeatured = true
                    },
                    new Project
                    {
                        Title = "Zurich Museum of Contemporary Art",
                        Slug = "zurich-contemporary-art-museum",
                        Location = "Zurich, Switzerland",
                        CompletionYear = 2024,
                        ArchitectName = "Kerez Architekten",
                        LightingDesigner = "Lichtbau Zurich",
                        ApplicationType = "Museum & Cultural",
                        Description = "Precision exhibition lighting utilizing Alpani OPTIX-35 track spotlights with Citizen Ra > 98 chips and variable framing snoots to preserve fragile historic canvases while highlighting delicate textures.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80",
                        GalleryJson = "[\"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80\"]",
                        IsFeatured = true
                    },
                    new Project
                    {
                        Title = "Bvlgari Luxury Resort & Spa Lounge",
                        Slug = "bvlgari-luxury-resort-dubai",
                        Location = "Jumeira Bay, Dubai - UAE",
                        CompletionYear = 2025,
                        ArchitectName = "Antonio Citterio Patricia Viel",
                        LightingDesigner = "Studio Fractal London",
                        ApplicationType = "Hospitality & Spa",
                        Description = "Warm, intimate ambience achieved with dark-light LUMENOR downlights (2700K warm dim) and custom brushed champagne gold AURA-1200 halo rings suspended above the reflection pools.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80",
                        GalleryJson = "[\"https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80\"]",
                        IsFeatured = true
                    },
                    new Project
                    {
                        Title = "Milan Fashion Quadrilatero Flagship",
                        Slug = "milan-fashion-flagship-store",
                        Location = "Via Montenapoleone, Milan - Italy",
                        CompletionYear = 2025,
                        ArchitectName = "Studio Lissoni & Partners",
                        LightingDesigner = "Alpani Architectural Lighting Labs",
                        ApplicationType = "High-End Luxury Retail",
                        Description = "Turnkey lighting design featuring black VECTA 48V magnetic tracks combined with micro-spot snoots and asymmetric linear wallwash modules highlighting haute-couture fabrics with true color fidelity.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
                        GalleryJson = "[\"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80\"]",
                        IsFeatured = true
                    }
                };

                context.Projects.AddRange(projects);
                context.SaveChanges();
            }

            // 6. Seed Catalogues
            if (!context.Catalogues.Any())
            {
                var catalogues = new List<Catalogue>
                {
                    new Catalogue
                    {
                        Title = "Alpani Technical Architectural Lighting Master Catalogue",
                        Type = "Technical",
                        Description = "Complete engineering guide with polar diagrams, technical drawings, UGR calculation tables, and DALI wiring schematics.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
                        PdfUrl = "/downloads/catalogues/Alpani-Technical-Master-2026.pdf",
                        FileSize = "58.4 MB",
                        VersionYear = 2026,
                        PageCount = 348,
                        DisplayOrder = 1
                    },
                    new Catalogue
                    {
                        Title = "48V Magnetic Track Systems & Linear Profiles",
                        Type = "System Guides",
                        Description = "Modular low-voltage architectural tracks, corners, power feeds, connectors, and snap-in luminaire specifications.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
                        PdfUrl = "/downloads/catalogues/Alpani-48V-Magnetic-Systems-2026.pdf",
                        FileSize = "34.1 MB",
                        VersionYear = 2026,
                        PageCount = 180,
                        DisplayOrder = 2
                    },
                    new Catalogue
                    {
                        Title = "High-CRI Museum & Retail Optical Spotlights",
                        Type = "Technical",
                        Description = "Citizen Ra > 97 COB spotlights, zoom optics, framing projectors, and photometrics for curators and lighting designers.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80",
                        PdfUrl = "/downloads/catalogues/Alpani-Museum-Retail-Spots-2026.pdf",
                        FileSize = "28.9 MB",
                        VersionYear = 2026,
                        PageCount = 142,
                        DisplayOrder = 3
                    },
                    new Catalogue
                    {
                        Title = "Alpani Architectural Statement & Decorative Collection",
                        Type = "Decorative",
                        Description = "Luxury sculptural halos, acoustic pendants, and blown-glass hospitality chandeliers.",
                        CoverImageUrl = "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80",
                        PdfUrl = "/downloads/catalogues/Alpani-Decorative-Collection-2026.pdf",
                        FileSize = "42.0 MB",
                        VersionYear = 2026,
                        PageCount = 210,
                        DisplayOrder = 4
                    }
                };

                context.Catalogues.AddRange(catalogues);
                context.SaveChanges();
            }

            // 7. Seed Initial Quote Requests for Admin Dashboard
            if (!context.QuoteRequests.Any())
            {
                var prod1 = context.Products.FirstOrDefault(p => p.Code == "ALP-M48-LIN1000");
                var prod2 = context.Products.FirstOrDefault(p => p.Code == "ALP-REC-DARK80");
                var prod3 = context.Products.FirstOrDefault(p => p.Code == "ALP-TRK-OPTIX35");

                var sampleQuote1 = new QuoteRequest
                {
                    ReferenceNumber = "ALP-2026-0001",
                    FullName = "Jean-Pierre Laurent",
                    CompanyName = "Atelier Lumiere Paris",
                    Email = "j.laurent@atelierlumiere.fr",
                    Phone = "+33 1 42 68 55 00",
                    Country = "France",
                    ProjectName = "Galeries Lafayette Luxury Annex",
                    ProjectType = "Retail & Hospitality",
                    EstimatedDeliveryDate = DateTime.UtcNow.AddMonths(2),
                    CustomerNotes = "Requires DALI-2 drivers tested with Lutron Quantum central system. Delivery to central Paris site in two phases.",
                    InternalAdminNotes = "Dispatched spec sheets to Paris distributor. Preliminary quote prepared with 35% B2B project tier.",
                    Status = QuoteStatus.InReview,
                    CreatedAt = DateTime.UtcNow.AddDays(-3),
                    Items = new List<QuoteRequestItem>
                    {
                        new QuoteRequestItem
                        {
                            ProductId = prod1?.Id ?? 1,
                            Quantity = 120,
                            SelectedSpecsJson = "{\"Wattage\":\"24W\",\"Lumen\":\"2640 lm\",\"Cct\":\"3000K\",\"BeamAngle\":\"110° Diffuse\",\"BodyColor\":\"Matte Black (RAL 9005)\",\"ControlType\":\"DALI-2\"}",
                            ItemNote = "Main Atrium Grid Levels 1-3"
                        },
                        new QuoteRequestItem
                        {
                            ProductId = prod2?.Id ?? 2,
                            Quantity = 350,
                            SelectedSpecsJson = "{\"Wattage\":\"15W\",\"Lumen\":\"1550 lm\",\"Cct\":\"3000K\",\"BeamAngle\":\"24° Spot\",\"BodyColor\":\"Matte Black (RAL 9005)\",\"ControlType\":\"DALI-2\"}",
                            ItemNote = "Boutique Display Aisles"
                        }
                    }
                };

                var sampleQuote2 = new QuoteRequest
                {
                    ReferenceNumber = "ALP-2026-0002",
                    FullName = "Marcus Weber",
                    CompanyName = "Weber & Partner Lichtplanung GmbH",
                    Email = "m.weber@weber-licht.de",
                    Phone = "+49 89 2311 4400",
                    Country = "Germany",
                    ProjectName = "Munich Tech Campus Tower B",
                    ProjectType = "Commercial Office",
                    EstimatedDeliveryDate = DateTime.UtcNow.AddMonths(3),
                    CustomerNotes = "All luminaires must comply with UGR < 19 and EN 12464-1. CAD files needed for DIALux evo 12 simulation.",
                    InternalAdminNotes = "DIALux files sent via WeTransfer. Awaiting confirmation of quantities for floor 12-18.",
                    Status = QuoteStatus.New,
                    CreatedAt = DateTime.UtcNow.AddHours(-14),
                    Items = new List<QuoteRequestItem>
                    {
                        new QuoteRequestItem
                        {
                            ProductId = prod3?.Id ?? 3,
                            Quantity = 80,
                            SelectedSpecsJson = "{\"Wattage\":\"35W\",\"Lumen\":\"3400 lm\",\"Cct\":\"4000K\",\"BeamAngle\":\"15°-55° Stepless Zoom\",\"BodyColor\":\"Matte White (RAL 9016)\",\"ControlType\":\"DALI-2\"}",
                            ItemNote = "Auditorium & Innovation Hub"
                        }
                    }
                };

                context.QuoteRequests.AddRange(sampleQuote1, sampleQuote2);
                context.SaveChanges();
            }
        }
    }
}
