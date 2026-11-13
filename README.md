# ALPANI LIGHTING - B2B ARCHITECTURAL LIGHTING PLATFORM

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-f2be71?style=for-the-badge)](https://berkemre.github.io/AlpaniElectric/)
[![.NET 8](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **Alpani Lighting (Alpani Dış Ticaret Ltd. Şti.)** — International Architectural & Technical B2B Lighting Platform. Engineered for international architects, lighting designers, facade consultants, and global commercial distributors.

🔗 **Live GitHub Pages Presentation Demo:** [https://berkemre.github.io/AlpaniElectric/](https://berkemre.github.io/AlpaniElectric/)

---

## 🏛️ Brand & Design Identity

- **Design System:** *Obsidian & Luster* (Derived via Google Stitch MCP — inspired by ERCO, Flos, iGuzzini, Delta Light)
- **Palette:** Obsidian Base (`#0D0E11`), Surface Raised (`#121316`), Kelvin Amber (`#E5B86E`), Primary Warm Gold (`#f2be71`), Hairline Border (`#27272A`)
- **Typography:** Plus Jakarta Sans (Headlines), Inter (Body Text), JetBrains Mono (Technical Photometric Specs)
- **Pricing Policy:** Strict Zero Public Pricing (B2B Specification Schedule & RFQ Tender Model)

---

## 📦 Project Architecture

```
AlpaniElectric/
├── backend/                  # .NET 8 Web API (Clean Architecture, EF Core, MSSQL, JWT Bearer)
│   ├── Alpani.Api/          # API Controllers, Middleware, Program.cs
│   ├── Alpani.Application/  # DTOs, Business Logic, FluentValidation
│   ├── Alpani.Domain/       # Domain Entities, Enums
│   └── Alpani.Infrastructure/# EF Core DbContext, Seed Data, File Storage
├── frontend/                 # React + TypeScript + Vite + Tailwind CSS Storefront & Admin
│   ├── src/components/      # Architectural Layout, MegaMenu, Configurator, BoQ Drawer
│   ├── src/pages/           # Storefront Pages, Configurator, Admin Dashboard
│   └── src/context/          # QuoteContext with localStorage persistence
├── demo/                     # Zero-dependency, standalone HTML/CSS/JS prototype
└── docs/                     # GitHub Pages presentation build (auto-hosted)
```

---

## 🚀 Interactive Demo Pages (GitHub Pages)

Explore the 7 core screens linked seamlessly:

1. **[Storefront Homepage](https://berkemre.github.io/AlpaniElectric/index.html)** — Hero section, engineering trust credentials, 8 architectural collection cards, 48V Magnetic System showcase with schematic hotspots (`FIG. 48-MT`), and dual B2B conversion banners.
2. **[Luminaire Catalog](https://berkemre.github.io/AlpaniElectric/products.html)** — Multi-facet specifier filter matrix (CCT, Wattage, Optics, IP Rating, Dimming) with polar candela previews.
3. **[Product Detail & Configurator](https://berkemre.github.io/AlpaniElectric/product-detail.html)** — 3-way viewport switcher (Studio Render, 2D Mechanical CAD, Polar Photometrics SVG) + live technical spec generator.
4. **[Architectural References](https://berkemre.github.io/AlpaniElectric/projects.html)** — Global built works with typology filtering (Museums, Corporate HQ, Hospitality, Residential).
5. **[Specification Schedule Drawer](https://berkemre.github.io/AlpaniElectric/quote-drawer.html)** — Slide-over layer stack with quantity steppers and editable room notes.
6. **[Tender & CAD Upload](https://berkemre.github.io/AlpaniElectric/quote-request.html)** — Configured BoQ schedule + commercial parameters with CAD (.DWG/.DXF) / BIM Revit (.RVT) drag-and-drop zone.
7. **[Technical Downloads](https://berkemre.github.io/AlpaniElectric/downloads.html)** — 2026 bulk asset packages, filterable engineering matrix, and DIALux Evo / Relux plugin hub.

---

## 🛠️ Local Development Setup

### Backend (.NET 8 Web API)
```bash
cd backend/Alpani.Api
dotnet restore
dotnet run --urls "http://localhost:5248"
```
*Swagger UI available at:* `http://localhost:5248/swagger`

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*Application available at:* `http://localhost:5173`

---

## 📄 License & Corporate Info

**Alpani Dış Ticaret Ltd. Şti.**  
Sinanoba Mah. İbrahimzade Cad. No: 1B/35, 34535 Büyükçekmece, Istanbul - Turkey  
Tel / WhatsApp: +90 542 515 87 85 | Email: info@alpani.com  
Website: [https://alpani.com](https://alpani.com)
