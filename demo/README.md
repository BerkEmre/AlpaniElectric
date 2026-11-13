# ALPANI LIGHTING - STANDALONE ARCHITECTURAL DEMO

This folder contains the complete, zero-dependency HTML/CSS/JS prototype generated directly with **Google Stitch MCP** using the **Obsidian & Luster** architectural luxury design system (`assets/ffc93d8e9c3f468ea6a6d145f752d789`).

All 7 core storefront pages have been generated and styled in high-end minimalist German architectural lighting aesthetic (ERCO / Delta Light / iGuzzini style) with monochromatic palette, soft 3000K warm brass accents, and full technical spec tables.

---

## 🚀 Available Screens & Navigation Flow

You can open any file directly in your browser by double-clicking:

1. **[`index.html`](./index.html)** - **Storefront Homepage**
   - Architectural Hero section with metric counters & trust credentials
   - Engineering Trust Bar (10+ Years R&D, CE/ENEC, DIALux SLA)
   - 8 Architectural Collection Cards with hover light effects
   - Modular 48V Magnetic Track System showcase with interactive schematic hotspots (`FIG. 48-MT`)
   - Built works preview & dual B2B conversion banners
2. **[`products.html`](./products.html)** - **Architectural Luminaire Catalog**
   - Multi-facet specifier filter matrix (CCT, Wattage, Optics, IP Rating, Dimming)
   - 3-column architectural specifier cards with polar candela previews
3. **[`product-detail.html`](./product-detail.html)** - **Product Detail & Configurator**
   - 3-way viewport switcher: View 01 Studio Render, View 02 2D CAD Mechanical Drawing, View 03 Polar Photometric Candela SVG
   - Interactive live configurator & one-click download bar
4. **[`projects.html`](./projects.html)** - **Architectural References & Built Works**
   - Filter chips for typologies (Museums & Cultural, Corporate HQ, Hospitality, Residential)
   - High-contrast reference portfolio with CRI Ra > 95 & SDCM ≤ 2 compliance tags
   - 2026 Master Monograph (140MB PDF) download link
5. **[`quote-drawer.html`](./quote-drawer.html)** - **Specification Schedule BoQ Drawer Overlay**
   - Slide-over layer stack displaying configured luminaires, room/zone spec notes, quantity steppers, and tender plan submission CTA
6. **[`quote-request.html`](./quote-request.html)** - **B2B Project Tender & Plan Upload**
   - Left Column: Itemized luminaire BoQ schedule with room assignments & electrical load aggregation
   - Right Column: Commercial project parameters & drag-and-drop CAD DWG / BIM Revit upload zone
7. **[`downloads.html`](./downloads.html)** - **Technical Downloads & Engineering Asset Center**
   - Direct 2026 bulk packages (All IES Photometrics .ZIP, Complete CAD/BIM Library .ZIP, Master Monograph PDF)
   - Filterable engineering matrix with 10 real luminaire assets and format badges (.IES, .RVT, .DWG, .PDF)
   - DIALux Evo & Relux engineering plugin integration module

---

## 💻 How to Run

### Method 1: Direct Double-Click (Zero Setup)
Simply double-click on any `.html` file (e.g. `index.html`) in your file explorer. It will open in Chrome, Edge, or Safari with full styles, fonts, and responsive layout.

### Method 2: Local Static Web Server
```bash
# In this directory:
npx serve .
# Or via Python:
python -m http.server 8080
```
Then open: `http://localhost:8080/index.html`

---

## 🎨 Design System Tokens
- **Base**: Obsidian Base (`#0D0E11`), Surface Raised (`#121316`), Container (`#1F1F23`)
- **Accents**: Primary Warm Gold (`#f2be71`), Kelvin Amber (`#E5B86E`), Hairline Border (`#27272A`)
- **Typography**: Plus Jakarta Sans (Headings), Inter (Body Text), JetBrains Mono (Technical Spec Labels)
