import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Catalogue } from '../types';
import {
  Download,
  FileText,
  FileCheck,
  ShieldCheck,
  Compass,
  Archive,
  Search,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const DownloadsPage: React.FC = () => {
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.getCatalogues()
      .then(setCatalogues)
      .catch(console.error);
  }, []);

  const quickPackages = [
    {
      title: 'COMPLETE 2026 IES / LDT PHOTOMETRIC BUNDLE',
      desc: 'All luminaire candela distributions verified to CIE 115 / IES LM-79 standards for DIALux & Relux.',
      format: 'ZIP (IES / LDT)',
      size: '84.2 MB',
      updated: 'REV 2026.1',
      fileUrl: '/api/catalogues/bundle-ies'
    },
    {
      title: 'ARCHITECTURAL 2D DWG & 3D BIM REVIT LIBRARY',
      desc: 'Parametric Autodesk Revit families (LOD 300) and precision 2D CAD sectional blocks.',
      format: 'ZIP (RVT / DWG / IFC)',
      size: '215.0 MB',
      updated: 'REV 2026.2',
      fileUrl: '/api/catalogues/bundle-bim'
    },
    {
      title: 'ALPANI MASTER MONOGRAPH & SPECIFICATION GUIDE',
      desc: 'Complete 380-page hardback architectural monograph with optical polar graphs & finish guides.',
      format: 'PDF (Vector 300 DPI)',
      size: '142.5 MB',
      updated: 'ANNUAL EDITION',
      fileUrl: '/api/catalogues/monograph-pdf'
    }
  ];

  const certificates = [
    {
      id: 'cert-1',
      title: 'ISO 9001:2015 Quality Management System',
      category: 'certificates',
      authority: 'TÜV Rheinland Accredited',
      standard: 'ISO 9001:2015 // EN ISO 9001',
      format: 'PDF',
      size: '1.8 MB',
      fileUrl: '#'
    },
    {
      id: 'cert-2',
      title: 'CE Declaration of Conformity (LVD & EMC Directives)',
      category: 'certificates',
      authority: 'European Union Harmonized Standards',
      standard: 'EN 60598-1 / EN 60598-2-1 / EN 55015',
      format: 'PDF',
      size: '2.4 MB',
      fileUrl: '#'
    },
    {
      id: 'cert-3',
      title: 'RoHS 3 Compliance Directive 2015/863/EU',
      category: 'certificates',
      authority: 'SGS International Testing Labs',
      standard: 'IEC 62321 Hazardous Substances',
      format: 'PDF',
      size: '1.2 MB',
      fileUrl: '#'
    },
    {
      id: 'cert-4',
      title: 'ENEC European Electrical Safety Certification',
      category: 'certificates',
      authority: 'Electrosuisse Certification Body',
      standard: 'ENEC 3401 / Luminaires General',
      format: 'PDF',
      size: '3.1 MB',
      fileUrl: '#'
    },
    {
      id: 'cert-5',
      title: 'Photobiological Safety RG0 (Exempt) Certification',
      category: 'certificates',
      authority: 'TÜV SÜD Optical Testing Laboratories',
      standard: 'IEC 62471 Blue Light Hazard Exempt',
      format: 'PDF',
      size: '950 KB',
      fileUrl: '#'
    }
  ];

  const technicalAssets = [
    {
      id: 'ta-1',
      title: 'LUMENX 48V Magnetic Track Spotlight - IES Polar Curves',
      category: 'photometrics',
      standard: 'IES LM-79-19 / EULUMDAT',
      format: 'IES',
      size: '240 KB',
      sku: 'ALP-48M-24W',
      fileUrl: '#'
    },
    {
      id: 'ta-2',
      title: 'MAGNALINE-48 Recessed Linear Darklight - Revit BIM Family (LOD 300)',
      category: 'bim',
      standard: 'Revit 2022+ / IFC 4.0',
      format: 'RVT',
      size: '4.8 MB',
      sku: 'ALP-MOD-LIN-1200',
      fileUrl: '#'
    },
    {
      id: 'ta-3',
      title: 'AURA-R75 Trimless Architectural Downlight - 2D CAD DWG Cross-Section',
      category: 'cad',
      standard: 'AutoCAD 2018+ DWG/DXF',
      format: 'DWG',
      size: '880 KB',
      sku: 'ALP-DL-R75-18W',
      fileUrl: '#'
    },
    {
      id: 'ta-4',
      title: 'LUMENX 48V Magnetic Track System - Complete System Engineering Guide',
      category: 'manuals',
      standard: 'Installation, Track Joining & Busbar Wiring',
      format: 'PDF',
      size: '8.4 MB',
      sku: 'SYS-48V-MT',
      fileUrl: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-obsidian-base text-on-surface">
      {/* HEADER / CANONICAL HERO */}
      <section className="border-b border-border-hairline px-6 lg:px-16 pt-10 pb-12 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="max-w-[1720px] mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-text-muted font-mono text-[11px] uppercase tracking-wider mb-6">
            <Link to="/" className="hover:text-text-alabaster transition-colors">Home</Link>
            <span className="text-border-hairline">/</span>
            <span className="text-text-muted">Engineering</span>
            <span className="text-border-hairline">/</span>
            <span className="text-primary font-medium">Technical Downloads</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-border-hairline/60">
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-5xl font-light text-text-alabaster tracking-tight mb-3 uppercase font-sans">
                Technical Downloads &amp; Architectural Assets
              </h1>
              <p className="font-mono text-xs text-text-muted tracking-wider leading-relaxed">
                ACCESS CERTIFIED IES/LDT PHOTOMETRIC DATA, 2D CAD DWG, REVIT BIM FAMILIES (LOD 300), AND ARCHITECTURAL MONOGRAPHS // ALL ASSETS VERIFIED TO CIE / IES LM-79 STANDARDS
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/quote-request"
                className="bg-primary text-obsidian-base hover:bg-white font-mono text-xs uppercase px-5 py-3 font-medium transition-colors tracking-wider"
              >
                Submit Project Tender →
              </Link>
            </div>
          </div>

          {/* Quick SLA & Standards strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div className="border-l border-border-hairline pl-4">
              <div className="text-2xl font-light text-text-alabaster">IES LM-79-19</div>
              <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mt-1">Verified Candela Data</div>
            </div>
            <div className="border-l border-border-hairline pl-4">
              <div className="text-2xl font-light text-primary">LOD 300 BIM</div>
              <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mt-1">Parametric Revit Families</div>
            </div>
            <div className="border-l border-border-hairline pl-4">
              <div className="text-2xl font-light text-text-alabaster">DIALux / Relux</div>
              <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mt-1">Native Software Integration</div>
            </div>
            <div className="border-l border-border-hairline pl-4">
              <div className="text-2xl font-light text-kelvin-amber">CE / ENEC / RoHS</div>
              <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mt-1">Harmonized EU Directives</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: MASTER PACKAGES */}
      <section className="px-6 lg:px-16 py-12 border-b border-border-hairline">
        <div className="max-w-[1720px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              PRIMARY ASSET PACKAGES // 2026 EDITION
            </span>
            <span className="font-mono text-[10px] text-text-muted">DIRECT ARCHITECTURAL BUNDLES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-surface-raised border border-border-hairline p-6 flex flex-col justify-between hover:border-primary/60 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-text-muted mb-3">
                    <span className="border border-border-hairline px-2 py-0.5">{pkg.format}</span>
                    <span className="text-primary">{pkg.size}</span>
                  </div>
                  <h3 className="text-lg font-medium text-text-alabaster tracking-tight mb-2 uppercase group-hover:text-primary transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-light mb-6">
                    {pkg.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-hairline flex items-center justify-between">
                  <span className="font-mono text-[10px] text-neutral-500">{pkg.updated}</span>
                  <a
                    href={pkg.fileUrl}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase text-text-alabaster hover:text-primary transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-primary" />
                    <span>Download Package</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: MASTER CATALOGUES FROM API */}
      {catalogues.length > 0 && (
        <section className="px-6 lg:px-16 py-12 border-b border-border-hairline">
          <div className="max-w-[1720px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-primary uppercase tracking-widest">
                OFFICIAL CATALOGUES &amp; PRODUCT GUIDES
              </span>
              <span className="font-mono text-[10px] text-text-muted">{catalogues.length} DOCUMENT(S)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {catalogues.map(cat => (
                <div
                  key={cat.id}
                  className="bg-surface-raised border border-border-hairline flex flex-col justify-between hover:border-text-muted transition-colors group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-obsidian-base border-b border-border-hairline">
                    <img
                      src={cat.coverImageUrl}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale-[10%]"
                    />
                    <div className="absolute top-3 left-3 bg-obsidian-base/90 border border-border-hairline px-2 py-0.5 font-mono text-[9px] text-primary uppercase">
                      {cat.type}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-obsidian-base/90 border border-border-hairline px-2 py-0.5 font-mono text-[9px] text-text-alabaster">
                      {cat.versionYear}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <h4 className="text-sm font-medium text-text-alabaster uppercase">
                      {cat.title}
                    </h4>

                    <a
                      href={cat.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-obsidian-base border border-border-hairline hover:border-primary text-text-alabaster hover:text-primary font-mono text-xs uppercase flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-primary" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: HARMONIZED CERTIFICATIONS */}
      <section className="px-6 lg:px-16 py-12">
        <div className="max-w-[1720px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              EUROPEAN STANDARDS &amp; QUALITY CERTIFICATES
            </span>
            <span className="font-mono text-[10px] text-text-muted">ISO 9001 / CE / ENEC / RoHS / RG0</span>
          </div>

          <div className="space-y-3">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="bg-surface-raised border border-border-hairline p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 border border-border-hairline flex items-center justify-center shrink-0 text-primary">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-alabaster uppercase">
                      {cert.title}
                    </h4>
                    <p className="font-mono text-[11px] text-text-muted mt-0.5">
                      {cert.authority} // Standard: <span className="text-text-alabaster">{cert.standard}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-auto font-mono text-xs">
                  <span className="text-text-muted text-[11px]">{cert.size}</span>
                  <a
                    href={cert.fileUrl}
                    className="border border-border-hairline hover:border-primary px-3 py-1 text-text-alabaster hover:text-primary transition-colors flex items-center gap-1.5 uppercase text-[11px]"
                  >
                    <Download className="w-3 h-3 text-primary" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
