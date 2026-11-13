import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Download,
  FileSpreadsheet,
  Lock,
  Settings,
  EyeOff,
  Palette,
  CheckCircle,
  Building,
  Upload,
  Handshake,
  Layers,
  FolderArchive
} from 'lucide-react';
import { EngineeringTrustBar } from '../components/common/EngineeringTrustBar';
import { api } from '../services/api';
import { Category, Project } from '../types';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
    api.getProjects().then(setProjects).catch(() => {});
  }, []);

  const categoryCards = [
    {
      sys: 'SYSTEM 01',
      name: '48V Magnetic Systems',
      slug: '48v-magnetic',
      badge: 'FLAGSHIP',
      desc: 'Ultra-slim recessed, surface, and pendant tracks with tool-free hot-swap inserts.',
      spec: '48V DC • DALI-2 / Casambi',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb7QweP23rPvKk1ZPqeCjbEcVDmDom7yj9JvzRJ6Ffudm4s14AHztN5rbJTDOZ99xJoK-4BL7NqOOVJq9reqkWvQOZgWyA3cJE0yJ9dC0WQDkSWUfPiPJY2W60tXqR3f5GLmjxtxklRK0ZbAGX5dcg_vlveEUB9Yj3xvlDFxMSvKT7ltTkE2oWbn63wd_mLLqLkWou21gCwaM1fzb0R5I6jvyIKvRw4LWze2Ptz14'
    },
    {
      sys: 'SYSTEM 02',
      name: 'Tracklights',
      slug: 'tracklight',
      badge: null,
      desc: 'Precision zoomable projectors with interchangeable snoot, honeycombs, and framing shutters.',
      spec: '93–97 CRI • 10°–55° Zoom',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxENL05C749sVQdnV6UdVQ2Lgo-cNTHTpUqo3hTj-iYr3LWDtPaHt80BYgrljJVyT_E-QEJJzaHeF38Yf9mFa-pr5rF088zcaf-uIH12kov-b-oZcw3tR1jX1tmmNB4Jha-tCTS2zzVzW0oo45EMOyjWiK1sgvVE5VBkH9SDoFuVQl9bdoY7lMXCNb9iw3fLwCxPsNoTXW4LobsdDBj1PG_Xo23xuGJ96nJo5lGX0'
    },
    {
      sys: 'SYSTEM 03',
      name: 'Architectural Profiles',
      slug: 'profile',
      badge: null,
      desc: 'Continuous seamless linear extrusion systems with micro-louvers for office and retail.',
      spec: 'Up to 3400 lm/m • UGR < 16',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXc6uMc2DRc0VmAidqkgld8Y1jDIYTwF0ixcptucNrchC3afDziiQCZ1VfiHR-chwstuDiJKY551m1j6vIzjCInVXUPo7s_KvVImhEXejpB5Q_cdH9JFXeioaS3by2dCegDInxxCU3MfFMVrvIdf4t7J7ewQrssQif3XU5RMuRrRzylvaddMugPa6_5QQ_LwPKZXq7hIQ2qBRZJi6XJ9d4H7c8bcJpvcphNLtVjRo'
    },
    {
      sys: 'SYSTEM 04',
      name: 'Recessed Downlights',
      slug: 'recessed',
      badge: null,
      desc: 'Trimless darklight downlights with deep baffle cut-off for virtually invisible ceilings.',
      spec: 'IP54/IP65 • 30° Shielding Cut-off',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6itllp3O-VMXdKIRroyUx6KF2JT_nf2ym_H47FVGbR6EjaQGGvslT6fZcMSVNwz7U8XfHH8X8DDvGDfFIWR5eJlQR_VkHKIa8t1NDj-5qYw3q-7Ua8j6_MUDrV_meou5kYbrsBeWxDwiNf7UmFuUlf4s_b7QERMBETyOTds56IQoK27M4arVqJC__ZPu9XLGLN0fIIZYGndzXYVw-a9DbeeVi5jQK0VeWf4mj6No'
    },
    {
      sys: 'SYSTEM 05',
      name: 'Surface & Pendant',
      slug: 'surface-pendant',
      badge: null,
      desc: 'Geometric cylinders, acoustic rings, and suspended direct/indirect luminaires.',
      spec: 'Tunable White 2700K–6500K',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3eLjibP280yQKpuo0Vs5JxP8EQi2Y_YD9_oXYHc1_-t6DIHirFckrkjCaZDW579XRPgARMP_uxXhaHlI54YuYFUgOaUqk7Q_KfWFYctRhhyY9BEvW1_hx1onbkBPdpY5zApSjuxpSraveInFg5iZXqBq0smA_Dfs9YvZpC7ue-OSP0hdQmccAZbtKAamtcgB7TVoFkJHvKL1UOfGDhIynNOfSTb7YSnBNY5CyQ6g'
    },
    {
      sys: 'SYSTEM 06',
      name: 'LED Panels & Grids',
      slug: 'panel',
      badge: null,
      desc: 'High-efficacy glare-free modular panels for corporate headquarters and healthcare spaces.',
      spec: '140 lm/W • Micro-prismatic',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAka0Epg6yiNu-MayTextBWmeq3fMnLR7kirBb0Ek-d95ghNhe3BlUVc8D4Idn7iuO1NCBAi9U6t_toI_byJeiM8MHffM8I05WqPeeItjXRZOythgkwgctMmcUe0pr8d7tn3ODQqISaUvWPso6q9p4G-PfVI4f-7Pg2JLbMLEX1K1Y4yj1RYtfNZdJNpmh6UasGp-3WC6tidrvbAQ5pdOm-OZmkSlUmiDEKGBlMGb4'
    },
    {
      sys: 'SYSTEM 07',
      name: 'Wall Luminaires',
      slug: 'wall',
      badge: null,
      desc: 'Grazing wallwashers and asymmetric step lights creating crisp architectural rhythm.',
      spec: 'Asymmetric Optic • Dark Sky',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO5E7eSXZG41k4IYvS7_l9mzvXtYTZ_qWDDWBQaEKDxhwe81gmS0L3YO-ao9m6kZ9hCG5qQrFGbQU4uz-olsxNl_e8D5ip94r6IcN6C4BvlxgzecMvT678OhO-8FINOqP__boLsgWYe_B4GCvy1QRnqq8m6AU7M5Xp7k1IM71sFuHuvr1uz__KeSulpj76TocMDUNxSJc7fc83kHCAon8XEXJHYpMB8XRga-tqTmw'
    },
    {
      sys: 'SYSTEM 08',
      name: 'Decorative Architectural',
      slug: 'decorative',
      badge: null,
      desc: 'Sculptural statement fixtures blending artisanal craftsmanship with technical photometrics.',
      spec: 'Brushed Brass / Anodized Black',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU5fz9rhNVzVbu_1A1lkqE1jDWlNxiDiJZJeNyIgpiL9VGOT_7om_sbstvT-JjNXOOHISE0ZhiotGp20sh4dIW8MqvP0tKDdW0USuI5jh2oCv9rlvwQ2zgiZYmd7YZ0c3wuL7tHRa0n_tF5l82N6lWK7GNtAWN6vz1FTOR2h0PKWnh33ew5CxIZjRKqkZqzpxY3VfcqkSOTMKdbfsb9pTgctHihq4eOlFDMhHabgQ'
    }
  ];

  return (
    <div className="w-full bg-[#121316] text-[#e3e2e6] selection:bg-[#f2be71] selection:text-[#442b00]">
      {/* 1. HERO SECTION (FULL-BLEED DARK ARCHITECTURAL) */}
      <section className="relative w-full bg-[#0D0E11] overflow-hidden border-b border-[#27272A]">
        {/* Atmospheric Ambient Blooms */}
        <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-[#f2be71]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -top-12 right-10 w-[500px] h-[500px] bg-[#d4a359]/10 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col justify-between min-h-[820px]">
          {/* Background Architectural Visual Layer */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity pointer-events-none">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyPjdVAyAxAdnlMV-lD0i4afU8Ssd0AjTQE0DEr_e5DiEOj-MX5EaEfFhTSWz6g7bJhkxBY7Q75tzcsd3MzPAGYaXXbrujUPoMT48BBi1pUnnsw_q0GM3rqTLjU65imxy74oTdTmJKqUnHVZMEIdy1ormjehik1cx9j2ChgeyjwJp_MaA99Bo6WKvQrGvxt7tBqlCggD6ZnO2KOLSmlQpNQfEqZn_PKi6KhAIs3P4')"
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E11] via-[#0D0E11]/90 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-transparent to-[#0D0E11]/60"></div>
          </div>

          {/* Hero Main Content (Foreground) */}
          <div className="relative z-10 max-w-4xl flex flex-col gap-6">
            {/* Eyebrow Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1f1f23]/80 backdrop-blur-md border border-[#27272A] w-fit rounded-sm">
              <span className="w-2 h-2 rounded-full bg-[#E5B86E] animate-pulse shadow-[0_0_12px_#E5B86E]"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#F8F9FA] font-medium">
                ARCHITECTURAL & TECHNICAL LIGHTING INSTRUMENTS
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl text-[#F8F9FA] uppercase tracking-tight max-w-3xl leading-[1.06] font-light">
              Precision Light for Contemporary Architecture
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#d3c4b3] max-w-2xl font-light leading-relaxed">
              Engineered in Istanbul for international architects, lighting designers, and landmark commercial spaces. Over a decade of proprietary optical R&D, uncompromising glare suppression, and seamless smart integration.
            </p>

            {/* CTA Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#collections"
                className="inline-flex items-center justify-center gap-2 bg-[#F8F9FA] text-[#0D0E11] px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#f2be71] transition-all rounded-sm"
              >
                <span>Explore Luminaires</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#dialux-support"
                className="inline-flex items-center justify-center gap-2 bg-[#121316]/80 backdrop-blur-sm border border-[#27272A] text-[#F8F9FA] px-7 py-3.5 font-mono text-xs uppercase tracking-wider hover:border-[#d4a359] hover:text-[#f2be71] transition-all rounded-sm"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#E5B86E]" />
                <span>Start a Project / DIALux</span>
              </a>
            </div>
          </div>

          {/* Quick Metric Counters / Specifier Deck */}
          <div className="relative z-10 pt-10 mt-12 border-t border-[#27272A] grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
            <div className="flex flex-col gap-0.5">
              <span className="text-[#9c8f7f] uppercase text-[10px] tracking-wider">Color Rendering</span>
              <span className="text-[#F8F9FA] text-base font-semibold tracking-wide">CRI Ra ≥ 97</span>
              <span className="text-[#E5B86E] text-[10px]">R9 &gt; 90 / TM-30 Rf 95</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#9c8f7f] uppercase text-[10px] tracking-wider">Glare Index</span>
              <span className="text-[#F8F9FA] text-base font-semibold tracking-wide">UGR &lt; 10</span>
              <span className="text-[#94A3B8] text-[10px]">Darklight Micro-Louvers</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#9c8f7f] uppercase text-[10px] tracking-wider">Color Consistency</span>
              <span className="text-[#F8F9FA] text-base font-semibold tracking-wide">MacAdam SDCM ≤ 2</span>
              <span className="text-[#94A3B8] text-[10px]">Tier-1 Optical Binning</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#9c8f7f] uppercase text-[10px] tracking-wider">Commercial Warranty</span>
              <span className="text-[#F8F9FA] text-base font-semibold tracking-wide">5-Year Full Luminaire</span>
              <span className="text-[#f2be71] text-[10px]">L90/B10 &gt; 65,000h</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ENGINEERING TRUST STRIP */}
      <EngineeringTrustBar />

      {/* 3. PRODUCT CATEGORIES SHOWCASE GRID (HIGH-CONTRAST SECTION) */}
      <section className="w-full bg-[#F8F9FA] text-[#0D0E11] py-16 border-b border-[#E2E8F0]" id="collections">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0D0E11]"></span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8] font-semibold">
                  COLLECTIONS 2026
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#0D0E11] tracking-tight font-light">
                Architectural Luminaire Systems
              </h2>
              <p className="text-sm text-slate-600 font-light">
                Modular 48V channels, optical track projectors, precision darklight downlights, and linear extrusions tailored for clinical ceiling rhythm.
              </p>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <Link
                to="/products"
                className="px-3.5 py-1.5 bg-[#0D0E11] text-[#F8F9FA] font-medium flex items-center gap-1.5 rounded-sm"
              >
                <span className="w-1 h-1 bg-[#f2be71]"></span>
                All Systems
              </Link>
              <Link
                to="/products?category=48v-magnetic"
                className="px-3.5 py-1.5 bg-white border border-slate-300 text-slate-700 hover:border-[#0D0E11] transition-colors rounded-sm"
              >
                Magnetic 48V
              </Link>
              <Link
                to="/products?category=recessed"
                className="px-3.5 py-1.5 bg-white border border-slate-300 text-slate-700 hover:border-[#0D0E11] transition-colors rounded-sm"
              >
                Downlights
              </Link>
              <Link
                to="/products?category=profile"
                className="px-3.5 py-1.5 bg-white border border-slate-300 text-slate-700 hover:border-[#0D0E11] transition-colors rounded-sm"
              >
                Linear & Profiles
              </Link>
            </div>
          </div>

          {/* 4x2 Product Grid (8 bespoke cards from Google Stitch) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryCards.map((cat, idx) => (
              <div
                key={idx}
                className="group bg-white border border-slate-200 flex flex-col justify-between hover:border-[#d4a359] hover:shadow-lg transition-all duration-200"
              >
                <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  ></div>
                  {cat.badge && (
                    <div className="absolute top-2.5 right-2.5 font-mono text-[10px] bg-[#0D0E11] text-[#F8F9FA] px-2 py-0.5 font-medium tracking-wider">
                      {cat.badge}
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col gap-2 flex-grow justify-between">
                  <div>
                    <div className="font-mono text-[11px] text-[#94A3B8]">{cat.sys}</div>
                    <h3 className="font-headline text-base font-semibold text-[#0D0E11] group-hover:text-[#7e5713] transition-colors mt-0.5">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-snug font-light">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex flex-col gap-2">
                    <span className="font-mono text-[11px] text-slate-500">{cat.spec}</span>
                    <div className="flex items-center justify-between pt-1">
                      <Link
                        to={`/products?category=${cat.slug}`}
                        className="font-mono text-[11px] text-[#0D0E11] font-semibold underline underline-offset-4 hover:text-[#7e5713]"
                      >
                        Explore Models
                      </Link>
                      <Link
                        to={`/products?category=${cat.slug}`}
                        className="font-mono text-[11px] text-[#7e5713] font-medium hover:underline"
                      >
                        + Configure
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED SYSTEM SPOTLIGHT: THE 48V MAGNETIC TRACK */}
      <section className="relative w-full bg-[#0D0E11] py-20 overflow-hidden border-b border-[#27272A]">
        {/* Restrained photonic amber aura */}
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#f2be71]/10 rounded-full blur-[180px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-0.5 bg-[#f2be71]"></span>
              <span className="font-mono text-xs text-[#E5B86E] uppercase tracking-widest font-medium">
                ENGINEERING BENCHMARK / FLAGSHIP SYSTEM
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="font-headline text-3xl sm:text-4xl text-[#F8F9FA] uppercase tracking-tight font-light">
                Alpani MagnaTrack 48V
              </h2>
              <span className="font-mono text-xs text-[#9c8f7f] tracking-wider">
                MODULAR ARCHITECTURAL ECOSYSTEM • GEN 3.2
              </span>
            </div>
          </div>

          {/* Split Asymmetric Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Specs & Anatomy (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <p className="font-mono text-xs text-[#9c8f7f] tracking-widest uppercase">
                INFINITE CONFIGURATIONS, ZERO VISUAL NOISE
              </p>
              <p className="text-base text-[#d3c4b3] font-light leading-relaxed">
                An ultra-low profile extruded aluminum channel that seamlessly integrates into drywall, exposed concrete, or suspended ceilings. Equipped with tool-free mechanical snap-locks, magnetic hold, and dual-circuit addressability.
              </p>

              {/* Core Feature Bullets */}
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#121316] border border-[#27272A] flex items-center justify-center text-[#f2be71] shrink-0 mt-0.5 rounded-sm">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs uppercase text-[#F8F9FA] font-semibold">Tool-Free Snap-in Mechanism</span>
                    <span className="text-xs text-[#9c8f7f] font-light mt-0.5">Reliable mechanical auto-lock combined with dual copper conductors for safe hot-swap repositioning.</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#121316] border border-[#27272A] flex items-center justify-center text-[#f2be71] shrink-0 mt-0.5 rounded-sm">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs uppercase text-[#F8F9FA] font-semibold">Independent DALI-2 & Casambi Control</span>
                    <span className="text-xs text-[#9c8f7f] font-light mt-0.5">Multi-channel digital addressing inside the same 18mm track aperture. Individual scene recall.</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#121316] border border-[#27272A] flex items-center justify-center text-[#f2be71] shrink-0 mt-0.5 rounded-sm">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs uppercase text-[#F8F9FA] font-semibold">Uncompromising Glare Control (UGR &lt; 13)</span>
                    <span className="text-xs text-[#9c8f7f] font-light mt-0.5">Multi-cell black specular louvers with optical lens arrays protect sightlines from direct discomfort glare.</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#121316] border border-[#27272A] flex items-center justify-center text-[#f2be71] shrink-0 mt-0.5 rounded-sm">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs uppercase text-[#F8F9FA] font-semibold">Full-Spectrum Color Fidelity</span>
                    <span className="text-xs text-[#9c8f7f] font-light mt-0.5">CRI Ra &gt; 97 and saturated red R9 &gt; 90 for museum conservation, prestigious gallerists, and high-end retail.</span>
                  </div>
                </div>
              </div>

              {/* Spec Sheet Quick Table */}
              <div className="border border-[#27272A] bg-[#121316] p-4 font-mono text-xs flex flex-col divide-y divide-[#27272A] mt-2 rounded-sm">
                <div className="py-2 flex justify-between">
                  <span className="text-[#9c8f7f] uppercase text-[11px]">System Voltage</span>
                  <span className="text-[#F8F9FA] font-medium">48V DC Class III Safe Extra-Low Voltage</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-[#9c8f7f] uppercase text-[11px]">Module Output Range</span>
                  <span className="text-[#F8F9FA] font-medium">6W (480 lm) to 35W (3,900 lm) per fixture</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-[#9c8f7f] uppercase text-[11px]">Luminous Efficacy</span>
                  <span className="text-[#F8F9FA] font-medium">Up to 115 lm/W System Level</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-[#9c8f7f] uppercase text-[11px]">Dimming Resolution</span>
                  <span className="text-[#F8F9FA] font-medium">0.1% – 100% Flicker-Free (IEEE 1789)</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products?category=48v-magnetic"
                  className="inline-flex items-center gap-2 bg-[#F8F9FA] text-[#0D0E11] px-6 py-3 font-mono text-xs uppercase font-semibold hover:bg-[#f2be71] transition-colors rounded-sm"
                >
                  <span>Configure MagnaTrack 48V</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/downloads"
                  className="inline-flex items-center gap-2 border border-[#27272A] bg-[#121316] px-6 py-3 font-mono text-xs uppercase text-[#F8F9FA] hover:border-[#9c8f7f] transition-colors rounded-sm"
                >
                  <Download className="w-4 h-4 text-[#E5B86E]" />
                  <span>DIALux Plugin & IES Files</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Exploded Technical View (6 cols) */}
            <div className="lg:col-span-6 relative border border-[#27272A] bg-[#16171B] p-6 flex flex-col justify-between min-h-[580px] rounded-sm">
              <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                <span className="font-mono text-xs text-[#F8F9FA] uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#f2be71]"></span>
                  EXPLODED TECHNICAL SCHEMATIC
                </span>
                <span className="font-mono text-[11px] text-[#9c8f7f]">FIG. 48-MT // REV 2.4</span>
              </div>

              {/* Central Technical Image with Hotspots */}
              <div className="relative w-full aspect-[4/3] my-4 flex items-center justify-center overflow-hidden">
                <div
                  className="w-full h-full bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDf6qOHb0vVb82YtfbgBblmmIyVr_DMcU_-KolBTu1O9k78hj0IeiZKQkiGVyuJ7G91deeNA1nDqfskKhZTs3xVvKFg25U8Elc0V-72ypZxx-8HLe3acoqo6d0h0XHSnhiX5QXm-yN9VhvX0Fnhda1vVF-6hQ2KGr640XKYS4XYYwI2Hxzsi4gHbApuUNbIp6SRE_drvygD0vp--qHO-l_G7s-Qw9ElA-j6eDsojo0')"
                  }}
                ></div>

                {/* Hotspot 1 */}
                <div
                  className="absolute top-[28%] left-[24%] cursor-pointer group"
                  onMouseEnter={() => setActiveHotspot(1)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="w-4 h-4 rounded-full bg-[#f2be71]/30 flex items-center justify-center animate-ping absolute"></div>
                  <div className="w-5 h-5 rounded-full bg-[#f2be71] flex items-center justify-center border-2 border-[#0D0E11] relative z-10 shadow-lg shadow-[#f2be71]/50">
                    <span className="text-[10px] font-mono font-bold text-[#0D0E11]">1</span>
                  </div>
                  <div className={`absolute left-7 top-1/2 -translate-y-1/2 ${activeHotspot === 1 ? 'flex' : 'hidden group-hover:flex'} flex-col bg-[#0D0E11] border border-[#27272A] p-2.5 shadow-2xl z-30 min-w-[200px] rounded`}>
                    <span className="font-mono text-[#f2be71] text-[10px] uppercase font-bold">Profile Body</span>
                    <span className="text-[#F8F9FA] text-xs font-light">Extruded 6063-T6 Structural Aluminum</span>
                  </div>
                </div>

                {/* Hotspot 2 */}
                <div
                  className="absolute top-[48%] left-[56%] cursor-pointer group"
                  onMouseEnter={() => setActiveHotspot(2)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="w-4 h-4 rounded-full bg-[#f2be71]/30 flex items-center justify-center animate-ping absolute"></div>
                  <div className="w-5 h-5 rounded-full bg-[#f2be71] flex items-center justify-center border-2 border-[#0D0E11] relative z-10 shadow-lg shadow-[#f2be71]/50">
                    <span className="text-[10px] font-mono font-bold text-[#0D0E11]">2</span>
                  </div>
                  <div className={`absolute left-7 top-1/2 -translate-y-1/2 ${activeHotspot === 2 ? 'flex' : 'hidden group-hover:flex'} flex-col bg-[#0D0E11] border border-[#27272A] p-2.5 shadow-2xl z-30 min-w-[210px] rounded`}>
                    <span className="font-mono text-[#f2be71] text-[10px] uppercase font-bold">Smart Busbar</span>
                    <span className="text-[#F8F9FA] text-xs font-light">Dual 48V Power + DALI-2 Digital Line</span>
                  </div>
                </div>

                {/* Hotspot 3 */}
                <div
                  className="absolute bottom-[22%] right-[28%] cursor-pointer group"
                  onMouseEnter={() => setActiveHotspot(3)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="w-4 h-4 rounded-full bg-[#f2be71]/30 flex items-center justify-center animate-ping absolute"></div>
                  <div className="w-5 h-5 rounded-full bg-[#f2be71] flex items-center justify-center border-2 border-[#0D0E11] relative z-10 shadow-lg shadow-[#f2be71]/50">
                    <span className="text-[10px] font-mono font-bold text-[#0D0E11]">3</span>
                  </div>
                  <div className={`absolute right-7 top-1/2 -translate-y-1/2 ${activeHotspot === 3 ? 'flex' : 'hidden group-hover:flex'} flex-col bg-[#0D0E11] border border-[#27272A] p-2.5 shadow-2xl z-30 min-w-[220px] rounded`}>
                    <span className="font-mono text-[#f2be71] text-[10px] uppercase font-bold">Optical Engine</span>
                    <span className="text-[#F8F9FA] text-xs font-light">TIR Polycarbonate Lens + UGR Louver</span>
                  </div>
                </div>
              </div>

              {/* Bottom Hotspot Guide */}
              <div className="border-t border-[#27272A] pt-3 grid grid-cols-3 gap-2 font-mono text-xs">
                <div className="flex items-center gap-1.5 text-[#9c8f7f]">
                  <span className="w-2 h-2 bg-[#f2be71]"></span>
                  <span className="text-[11px]">1. 6063 Aluminum</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#9c8f7f]">
                  <span className="w-2 h-2 bg-[#f2be71]"></span>
                  <span className="text-[11px]">2. DALI Busbar</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#9c8f7f]">
                  <span className="w-2 h-2 bg-[#f2be71]"></span>
                  <span className="text-[11px]">3. TIR Collimator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SELECTED REFERENCE PROJECTS */}
      <section className="w-full bg-[#121316] py-20 border-b border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#27272A] pb-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#E5B86E]"></span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#E5B86E] font-semibold">
                  BUILT ARCHITECTURE IN LIGHT
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#F8F9FA] uppercase tracking-tight font-light">
                Selected Global References
              </h2>
              <p className="text-sm text-[#d3c4b3] font-light">
                Illuminating national museums, international financial centers, and bespoke residential architecture across Europe, the Middle East, and Asia.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[#F8F9FA] font-mono text-xs uppercase hover:text-[#f2be71] transition-colors"
            >
              <span>View All Projects</span>
              <span className="text-[#E5B86E] font-semibold">(48+ Case Studies)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3-Column Luxury Architecture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project 1: Zurich */}
            <div className="group flex flex-col bg-[#121316] border border-[#27272A] hover:border-[#9c8f7f] transition-colors">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#292a2d]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCVr6iQPe1Yp7M9B2DxY6JFf4dDuSGKVUNNjHC9Koql0vWsGVcoMgyZbmuhBm6jN0nC0ViS_nISECLkG9Svp4i4ggNzwlTwKjIMpsXWA_yt9KfM7oXGfwZqkL9o_NA1Y-Tm2XNaRZLMVxU9rPOyaA4pRJkwPBTTWQgtnk4ZK2eSz7BTipUWMEMrIWVNU8uPDaRzMg3ZyP4PWeu3b2t4odxLCwXIYsfdHumlAfV5VdQ')"
                  }}
                ></div>
                <div className="absolute bottom-3 left-3 bg-[#0D0E11]/90 backdrop-blur-sm border border-[#27272A] px-2.5 py-1 font-mono text-[11px] text-[#F8F9FA]">
                  ZURICH, SWITZERLAND
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 justify-between flex-grow">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] text-[#9c8f7f] uppercase tracking-wider">CULTURAL / MUSEUM</span>
                  <h3 className="font-headline text-lg text-[#F8F9FA] font-normal group-hover:text-[#f2be71] transition-colors">
                    The Kunsthaus Modern Wing
                  </h3>
                  <p className="text-xs text-[#d3c4b3] mt-1 font-light leading-relaxed">
                    Preservation-grade optical lighting with custom zero-UV beam shaping lenses that render marble texture with total chromatic accuracy.
                  </p>
                </div>
                <div className="border-t border-[#27272A] pt-4 flex flex-col gap-1 font-mono text-[11px]">
                  <div className="flex justify-between text-[#9c8f7f]">
                    <span>Luminaires:</span>
                    <span className="text-[#F8F9FA]">MagnaTrack 48V (3000K, CRI 98)</span>
                  </div>
                  <div className="flex justify-between text-[#9c8f7f]">
                    <span>Lighting Specifier:</span>
                    <span className="text-[#F8F9FA]">Studio Lux Zurich</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2: Dubai */}
            <div className="group flex flex-col bg-[#121316] border border-[#27272A] hover:border-[#9c8f7f] transition-colors">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#292a2d]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDORaZIkZfUsGYjziBq3BJcCj2BPE2i9aWEZVWHezJyaKofxSlUnP3UoYmMMJGRxnwnf42BWGPW94sAyzdbFHEe77BqZMUjpCu1RU7ljv9NiOzSmMobunv3DtNBxlHvxnyRTY106ygdpBzE83uyv-G4inuHf_oXwxQifUN1Vk4imkRgg6tERbkoelEydNOeT_BqT6Xaz9OHd2bTT7J_2UeecImV3Pt_0avTjnS0Hd0')"
                  }}
                ></div>
                <div className="absolute bottom-3 left-3 bg-[#0D0E11]/90 backdrop-blur-sm border border-[#27272A] px-2.5 py-1 font-mono text-[11px] text-[#F8F9FA]">
                  DIFC, DUBAI
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 justify-between flex-grow">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] text-[#9c8f7f] uppercase tracking-wider">CORPORATE HEADQUARTERS</span>
                  <h3 className="font-headline text-lg text-[#F8F9FA] font-normal group-hover:text-[#f2be71] transition-colors">
                    Private Capital DIFC Tower
                  </h3>
                  <p className="text-xs text-[#d3c4b3] mt-1 font-light leading-relaxed">
                    Ultra-low UGR &lt; 8 recessed downlighting combined with continuous linear cove lighting, fully controlled via automated DALI-2 circadian cycles.
                  </p>
                </div>
                <div className="border-t border-[#27272A] pt-4 flex flex-col gap-1 font-mono text-[11px]">
                  <div className="flex justify-between text-[#9c8f7f]">
                    <span>Luminaires:</span>
                    <span className="text-[#F8F9FA]">LineaPro & Trimless Darklight</span>
                  </div>
                  <div className="flex justify-between text-[#9c8f7f]">
                    <span>Lighting Specifier:</span>
                    <span className="text-[#F8F9FA]">Licht Kunst Dubai</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3: Istanbul */}
            <div className="group flex flex-col bg-[#121316] border border-[#27272A] hover:border-[#9c8f7f] transition-colors">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#292a2d]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCu9muySnNDMIxC3eJOYEtOxrsTNdHMcRdQFxfxpoGOpmMzoBJtZ3pAUbnwi2q-I3-kizIjlwBtvMSK953MeUSd0NlWoZBpRchNbOTQptPvDw7DZs6EHiUm6WvK4MF_PtmgQoqn5zUzMvneWAZx_UJGRZffxaRoja-1lylWkQURRs7922eTzG-S0x1rL2hmZ7M3vAQS9_2bIVy4wbRX4juxJP9tShDd9-pEBAj0SXM')"
                  }}
                ></div>
                <div className="absolute bottom-3 left-3 bg-[#0D0E11]/90 backdrop-blur-sm border border-[#27272A] px-2.5 py-1 font-mono text-[11px] text-[#F8F9FA]">
                  ISTANBUL, TURKEY
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 justify-between flex-grow">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] text-[#9c8f7f] uppercase tracking-wider">PRIVATE RESIDENTIAL</span>
                  <h3 className="font-headline text-lg text-[#F8F9FA] font-normal group-hover:text-[#f2be71] transition-colors">
                    Bosphorus Heritage Villa
                  </h3>
                  <p className="text-xs text-[#d3c4b3] mt-1 font-light leading-relaxed">
                    Custom optical wallwashers grazing ancient stone masonry alongside marine-grade IP67 architectural inground luminaires along coastal promenades.
                  </p>
                </div>
                <div className="border-t border-[#27272A] pt-4 flex flex-col gap-1 font-mono text-[11px]">
                  <div className="flex justify-between text-[#9c8f7f]">
                    <span>Luminaires:</span>
                    <span className="text-[#F8F9FA]">Custom Façade & Trimless Spot</span>
                  </div>
                  <div className="flex justify-between text-[#9c8f7f]">
                    <span>Lighting Specifier:</span>
                    <span className="text-[#F8F9FA]">Alpani Custom Engineering</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DUAL B2B CONVERSION BANNERS */}
      <section className="w-full bg-[#0D0E11] py-20 border-b border-[#27272A]" id="dialux-support">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card A: Specifiers & Architects */}
          <div className="relative bg-[#121316] border border-[#27272A] p-8 sm:p-12 flex flex-col justify-between overflow-hidden rounded-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#f2be71]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#E5B86E]" />
                <span className="font-mono text-xs uppercase text-[#F8F9FA] tracking-widest font-semibold">
                  FOR LIGHTING DESIGNERS & SPECIFIERS
                </span>
              </div>
              <h3 className="font-headline text-2xl sm:text-3xl text-[#F8F9FA] tracking-tight font-light">
                Have an Active Lighting Project?
              </h3>
              <p className="text-sm text-[#d3c4b3] leading-relaxed font-light">
                Upload your CAD (.DWG), PDF drawings, or 3D architectural models. Our in-house optical engineering department generates comprehensive DIALux Evo calculations, lux heatmaps, and formal luminaire specifications within 24 hours.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 font-mono text-[11px]">
                <span className="bg-[#1f1f23] px-2.5 py-1 border border-[#27272A] text-[#F8F9FA]">DIALux Evo Ready</span>
                <span className="bg-[#1f1f23] px-2.5 py-1 border border-[#27272A] text-[#F8F9FA]">Revit BIM Library</span>
                <span className="bg-[#1f1f23] px-2.5 py-1 border border-[#27272A] text-[#F8F9FA]">Photometric Calculation</span>
              </div>
            </div>
            <div className="pt-8 relative z-10">
              <Link
                to="/quote-request"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F8F9FA] text-[#0D0E11] px-6 py-3.5 font-mono text-xs uppercase font-semibold hover:bg-[#f2be71] transition-colors rounded-sm"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Project & Request DIALux Study</span>
              </Link>
            </div>
          </div>

          {/* Card B: Global Distribution & Agency Partners */}
          <div className="relative bg-[#121316] border border-[#27272A] p-8 sm:p-12 flex flex-col justify-between overflow-hidden rounded-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#b7c8e1]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-2">
                <Handshake className="w-5 h-5 text-[#E5B86E]" />
                <span className="font-mono text-xs uppercase text-[#F8F9FA] tracking-widest font-semibold">
                  FOR COMMERCIAL DISTRIBUTORS & REPS
                </span>
              </div>
              <h3 className="font-headline text-2xl sm:text-3xl text-[#F8F9FA] tracking-tight font-light">
                Global Partner & Agency Network
              </h3>
              <p className="text-sm text-[#d3c4b3] leading-relaxed font-light">
                Alpani collaborates with premier architectural lighting agencies, regional distributors, and MEP contractors across 35+ countries. Benefit from guaranteed specification protection, priority production slots, and showroom luminaire kits.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 font-mono text-[11px]">
                <span className="bg-[#1f1f23] px-2.5 py-1 border border-[#27272A] text-[#F8F9FA]">Protected Specification</span>
                <span className="bg-[#1f1f23] px-2.5 py-1 border border-[#27272A] text-[#F8F9FA]">Exclusive Regional Territories</span>
                <span className="bg-[#1f1f23] px-2.5 py-1 border border-[#27272A] text-[#F8F9FA]">European Central Stock</span>
              </div>
            </div>
            <div className="pt-8 relative z-10">
              <Link
                to="/become-distributor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#27272A] bg-[#121316] text-[#F8F9FA] px-6 py-3.5 font-mono text-xs uppercase font-semibold hover:border-[#d4a359] hover:text-[#f2be71] transition-colors rounded-sm"
              >
                <span>Apply for Distribution Partnership</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SPECIFIER DOWNLOADS STRIP & CERTIFICATION BADGES */}
      <section className="w-full bg-[#090A0C] py-6 border-b border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-4 flex-wrap text-[#9c8f7f]">
            <span className="text-[#F8F9FA] font-semibold uppercase tracking-wider">ENGINEERING ASSETS:</span>
            <Link to="/downloads" className="hover:text-[#F8F9FA] transition-colors flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#E5B86E]" />
              Master Catalog 2026 (PDF, 42MB)
            </Link>
            <span className="text-[#27272A]">|</span>
            <Link to="/downloads" className="hover:text-[#F8F9FA] transition-colors flex items-center gap-1.5">
              <FolderArchive className="w-3.5 h-3.5 text-[#E5B86E]" />
              IES / LDT Photometric Archive
            </Link>
            <span className="text-[#27272A]">|</span>
            <Link to="/downloads" className="hover:text-[#F8F9FA] transition-colors flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#E5B86E]" />
              BIM Revit Library (2024–2026)
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#9c8f7f] tracking-wider border border-[#27272A] px-2 py-1">EN 60598-1</span>
            <span className="text-[10px] text-[#9c8f7f] tracking-wider border border-[#27272A] px-2 py-1">ENEC 303</span>
            <span className="text-[10px] text-[#9c8f7f] tracking-wider border border-[#27272A] px-2 py-1">ISO 14001</span>
          </div>
        </div>
      </section>
    </div>
  );
};
