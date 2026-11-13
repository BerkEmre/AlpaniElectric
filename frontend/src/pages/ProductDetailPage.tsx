import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuote } from '../context/QuoteContext';
import {
  FileDown,
  Check,
  Plus,
  Minus,
  Sliders,
  Share2,
  GitCompare,
  ArrowLeft,
  ShieldCheck,
  ZoomIn,
  Maximize2
} from 'lucide-react';
import { api } from '../services/api';
import { ProductDetail } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { addItem } = useQuote();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Viewport mode: 'studio' | 'cad' | 'polar'
  const [viewMode, setViewMode] = useState<'studio' | 'cad' | 'polar'>('studio');

  // Configurator state
  const [selectedWattage, setSelectedWattage] = useState('');
  const [selectedCct, setSelectedCct] = useState('');
  const [selectedBeam, setSelectedBeam] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');
  const [selectedControl, setSelectedControl] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [zoneNote, setZoneNote] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const [activeTab, setActiveTab] = useState<'specs' | 'electrical' | 'mechanical' | 'downloads'>('specs');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getProductBySlug(slug)
      .then(data => {
        setProduct(data);

        const defaultVar = data.variants.find(v => v.isDefault) || data.variants[0];
        if (defaultVar) {
          setSelectedWattage(defaultVar.wattage);
          setSelectedCct(defaultVar.cct);
          setSelectedBeam(defaultVar.beamAngle);
          setSelectedFinish(defaultVar.bodyColor);
          setSelectedControl(defaultVar.controlType);
        } else {
          setSelectedWattage('24W');
          setSelectedCct('3000K');
          setSelectedBeam('24°');
          setSelectedFinish('Matte Black');
          setSelectedControl('DALI-2');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Luminaire not found or inactive.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121316] text-[#e3e2e6] flex items-center justify-center font-mono">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#f2be71] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-[#9c8f7f]">Loading architectural specifications...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#121316] text-[#e3e2e6] flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-xl font-headline text-[#F8F9FA]">Specification Not Found</h2>
          <p className="text-xs text-[#9c8f7f]">{error || 'Requested specification could not be located.'}</p>
          <Link
            to="/products"
            className="inline-flex px-6 py-2.5 rounded bg-[#F8F9FA] text-[#0D0E11] font-mono font-semibold text-xs uppercase tracking-wider"
          >
            Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const uniqueWattages = Array.from(new Set(product.variants.map(v => v.wattage))).filter(Boolean);
  const uniqueCcts = Array.from(new Set(product.variants.map(v => v.cct))).filter(Boolean);
  const uniqueBeams = Array.from(new Set(product.variants.map(v => v.beamAngle))).filter(Boolean);
  const uniqueFinishes = Array.from(new Set(product.variants.map(v => v.bodyColor))).filter(Boolean);
  const uniqueControls = Array.from(new Set(product.variants.map(v => v.controlType))).filter(Boolean);

  const handleAddToQuote = () => {
    addItem({
      productId: product.id,
      productCode: product.code,
      productName: product.name,
      productImageUrl: product.mainImageUrl,
      wattage: selectedWattage,
      cct: selectedCct,
      beamAngle: selectedBeam,
      bodyColor: selectedFinish,
      controlType: selectedControl,
      quantity: quantity > 0 ? quantity : 1,
      itemNote: zoneNote.trim() || undefined,
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  return (
    <div className="w-full bg-[#121316] text-[#e3e2e6] font-sans">
      {/* 1. Breadcrumb & Specifier Utilities Strip */}
      <section className="w-full bg-[#0D0E11] px-4 sm:px-6 lg:px-8 py-4 border-b border-[#27272A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#9c8f7f]">
            <Link to="/" className="hover:text-[#F8F9FA] transition-colors">HOME</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#F8F9FA] transition-colors">PRODUCTS</Link>
            <span>/</span>
            <Link to={`/products?category=${product.categorySlug}`} className="hover:text-[#F8F9FA] transition-colors uppercase">
              {product.categoryName}
            </Link>
            <span>/</span>
            <span className="text-[#f2be71] font-medium">{product.code}</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Specification sheet link copied to clipboard!');
                }
              }}
              className="inline-flex items-center gap-1.5 text-[#d3c4b3] hover:text-[#F8F9FA] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-[#f2be71]" />
              <span>SHARE SPEC SHEET</span>
            </button>
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-[#f2be71] hover:text-[#F8F9FA] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO CATALOG</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Split View: Technical Viewport & B2B Specification Configurator */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT 6 COLS: Optical & CAD Viewport */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Main Stage Card */}
            <div className="relative w-full aspect-square bg-[#0D0E11] rounded-xl overflow-hidden shadow-2xl border border-[#27272A] flex items-center justify-center p-8 group">
              {/* Ambient Photonic Glow */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-[#f2be71]/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* View 1: Studio Shot */}
              {viewMode === 'studio' && (
                <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-300">
                  <img
                    src={product.mainImageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain filter contrast-105"
                  />
                </div>
              )}

              {/* View 2: CAD Isometric Projection */}
              {viewMode === 'cad' && (
                <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between font-mono text-xs text-[#9c8f7f] animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-[#94A3B8]">
                    <span>SCALE: 1:1 REVISED</span>
                    <span className="text-[#f2be71]">ISOMETRIC MECHANICAL PROJECTION</span>
                  </div>
                  <div className="w-full flex-1 flex items-center justify-center">
                    <svg className="w-full max-h-72 text-[#d3c4b3]" fill="none" stroke="currentColor" viewBox="0 0 400 320">
                      {/* Magnetic Track Base */}
                      <rect className="text-[#9c8f7f]" height="24" rx="2" strokeDasharray="3 2" strokeWidth="1.5" width="120" x="140" y="20"></rect>
                      <text fill="currentColor" fontSize="10" textAnchor="middle" x="200" y="14">48V ADAPTER RAIL (45mm)</text>
                      {/* Rotational Joint */}
                      <circle className="text-[#f2be71]" cx="200" cy="44" r="8" strokeWidth="1.5"></circle>
                      <path className="text-[#f2be71]" d="M190 44 C190 38 210 38 210 44" strokeDasharray="2 2" strokeWidth="1"></path>
                      <text fill="#D4A359" fontSize="9" x="220" y="47">355° ROTATION</text>
                      {/* Swivel Arm */}
                      <rect height="38" strokeWidth="1.5" width="12" x="194" y="44"></rect>
                      <circle className="text-[#f2be71]" cx="200" cy="82" r="5" strokeWidth="1.5"></circle>
                      <text fill="#D4A359" fontSize="9" x="216" y="86">90° TILT PIVOT</text>
                      {/* Luminaire Body */}
                      <g transform="rotate(-30 200 90)">
                        <rect className="text-[#F8F9FA]" height="150" rx="3" strokeWidth="2" width="80" x="160" y="90"></rect>
                        <rect className="text-[#f2be71]" height="12" strokeDasharray="2 2" strokeWidth="1.2" width="72" x="164" y="228"></rect>
                        <line strokeDasharray="4 2" strokeWidth="1" x1="168" x2="232" y1="234" y2="234"></line>
                        <line className="text-[#9c8f7f]" strokeWidth="1" x1="145" x2="145" y1="90" y2="240"></line>
                        <text fill="currentColor" fontSize="10" textAnchor="end" x="135" y="168">140mm</text>
                        <line className="text-[#9c8f7f]" strokeWidth="1" x1="160" x2="240" y1="255" y2="255"></line>
                        <text fill="currentColor" fontSize="10" textAnchor="middle" x="200" y="270">Ø 55mm</text>
                      </g>
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-[#9c8f7f] text-[11px]">
                    <span>TOLERANCE ±0.15mm</span>
                    <span>AL6063-T6 CNC HOUSING</span>
                  </div>
                </div>
              )}

              {/* View 3: Polar Photometrics */}
              {viewMode === 'polar' && (
                <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between font-mono text-xs animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[#f2be71]">POLAR CANDELA DISTRIBUTION</span>
                    <span className="text-[#94A3B8]">FWHM: {selectedBeam || '24°'} ACCENT</span>
                  </div>
                  <div className="w-full flex-1 flex items-center justify-center">
                    <svg className="w-full max-h-72" fill="none" viewBox="0 0 320 320">
                      <circle cx="160" cy="160" r="130" stroke="#27272A" strokeWidth="1"></circle>
                      <circle cx="160" cy="160" r="95" stroke="#27272A" strokeDasharray="2 2" strokeWidth="1"></circle>
                      <circle cx="160" cy="160" r="60" stroke="#27272A" strokeWidth="1"></circle>
                      <circle cx="160" cy="160" r="25" stroke="#27272A" strokeDasharray="2 2" strokeWidth="1"></circle>
                      <line stroke="#27272A" strokeWidth="1" x1="160" x2="160" y1="30" y2="290"></line>
                      <line stroke="#27272A" strokeWidth="1" x1="30" x2="290" y1="160" y2="160"></line>
                      <polygon fill="rgba(212, 163, 89, 0.22)" points="160,160 148,220 152,272 160,285 168,272 172,220" stroke="#D4A359" strokeWidth="2"></polygon>
                      <line stroke="#E5B86E" strokeDasharray="2 2" strokeWidth="1" x1="160" x2="135" y1="160" y2="280"></line>
                      <line stroke="#E5B86E" strokeDasharray="2 2" strokeWidth="1" x1="160" x2="185" y1="160" y2="280"></line>
                      <text fill="#F8F9FA" fontSize="10" textAnchor="middle" x="160" y="306">I_max = 11,840 cd @ 0°</text>
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-[#9c8f7f] text-[11px]">
                    <span>LOR: 92.4%</span>
                    <span>UGR: &lt; 15.6 (WITH HONEYCOMB)</span>
                  </div>
                </div>
              )}

              {/* Viewport Badges */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 font-mono text-[10px]">
                <span className="bg-[#292a2d]/90 backdrop-blur-sm text-[#F8F9FA] px-2.5 py-1 rounded">
                  {viewMode === 'studio' ? 'STUDIO 360°' : viewMode === 'cad' ? 'CAD PROJECTION' : 'PHOTOMETRIC IES'}
                </span>
                <span className="bg-[#f2be71]/20 text-[#f2be71] px-2.5 py-1 rounded">
                  COLLECTION 2026
                </span>
              </div>
            </div>

            {/* 3 Interactive Switcher Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setViewMode('studio')}
                className={`p-3 rounded-lg text-left transition-all font-mono border ${
                  viewMode === 'studio'
                    ? 'bg-[#292a2d] border-[#f2be71]'
                    : 'bg-[#1b1b1f] border-[#27272A] hover:bg-[#1f1f23]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#f2be71] font-semibold">VIEW 01</span>
                  {viewMode === 'studio' && <span className="w-1.5 h-1.5 rounded-full bg-[#f2be71]"></span>}
                </div>
                <div className="text-xs font-semibold text-[#F8F9FA]">STUDIO RENDER</div>
                <div className="text-[10px] text-[#94A3B8]">Materiality & Finish</div>
              </button>

              <button
                onClick={() => setViewMode('cad')}
                className={`p-3 rounded-lg text-left transition-all font-mono border ${
                  viewMode === 'cad'
                    ? 'bg-[#292a2d] border-[#f2be71]'
                    : 'bg-[#1b1b1f] border-[#27272A] hover:bg-[#1f1f23]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#9c8f7f]">VIEW 02</span>
                  {viewMode === 'cad' && <span className="w-1.5 h-1.5 rounded-full bg-[#f2be71]"></span>}
                </div>
                <div className="text-xs font-semibold text-[#F8F9FA]">CAD DRAWING</div>
                <div className="text-[10px] text-[#94A3B8]">Cutouts & Dimensions</div>
              </button>

              <button
                onClick={() => setViewMode('polar')}
                className={`p-3 rounded-lg text-left transition-all font-mono border ${
                  viewMode === 'polar'
                    ? 'bg-[#292a2d] border-[#f2be71]'
                    : 'bg-[#1b1b1f] border-[#27272A] hover:bg-[#1f1f23]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#9c8f7f]">VIEW 03</span>
                  {viewMode === 'polar' && <span className="w-1.5 h-1.5 rounded-full bg-[#f2be71]"></span>}
                </div>
                <div className="text-xs font-semibold text-[#F8F9FA]">PHOTOMETRICS</div>
                <div className="text-[10px] text-[#94A3B8]">Polar Candela Curve</div>
              </button>
            </div>
          </div>

          {/* RIGHT 6 COLS: CONFIGURATOR */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded bg-[#f2be71]/20 text-[#f2be71] font-mono text-[10px] uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <span className="text-xs font-mono text-[#9c8f7f]">
                  ENEC • CE • DALI-2 CERTIFIED
                </span>
              </div>
              <h1 className="font-headline text-3xl sm:text-4xl text-[#F8F9FA] mt-3 font-light tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-[#d3c4b3] mt-2 leading-relaxed font-light">
                {product.shortDescription}
              </p>
            </div>

            {/* Quick Engineering Attributes */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#0D0E11] border border-[#27272A] font-mono text-xs">
              <div>
                <span className="text-[#9c8f7f] block text-[10px] uppercase">COLOR FIDELITY</span>
                <strong className="text-[#F8F9FA] text-sm font-semibold">{product.cri}</strong>
              </div>
              <div>
                <span className="text-[#9c8f7f] block text-[10px] uppercase">GLARE INDEX</span>
                <strong className="text-[#F8F9FA] text-sm font-semibold">UGR {product.ugr}</strong>
              </div>
              <div>
                <span className="text-[#9c8f7f] block text-[10px] uppercase">TOLERANCE</span>
                <strong className="text-[#F8F9FA] text-sm font-semibold">{product.macAdam}</strong>
              </div>
            </div>

            {/* CONFIGURATOR BOX */}
            <div className="p-6 rounded-2xl bg-[#0D0E11] border border-[#27272A] space-y-5 shadow-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider font-mono text-[#F8F9FA] flex items-center justify-between pb-3 border-b border-[#27272A]">
                <span className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-[#f2be71]" />
                  <span>Interactive Technical Configurator</span>
                </span>
                <span className="text-[10px] text-[#9c8f7f]">SKU: {product.code}</span>
              </div>

              {/* 1. Wattage */}
              {uniqueWattages.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#9c8f7f] uppercase tracking-wider block">
                    1. Wattage & Luminous Package
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {uniqueWattages.map(w => (
                      <button
                        key={w}
                        onClick={() => setSelectedWattage(w)}
                        className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all border ${
                          selectedWattage === w
                            ? 'bg-[#292a2d] text-[#f2be71] border-[#f2be71] font-semibold'
                            : 'bg-[#1b1b1f] border-[#27272A] text-[#d3c4b3] hover:text-white hover:border-[#9c8f7f]'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. CCT Color Temperature */}
              {uniqueCcts.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#9c8f7f] uppercase tracking-wider block">
                    2. Color Temperature (CCT)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {uniqueCcts.map(cct => (
                      <button
                        key={cct}
                        onClick={() => setSelectedCct(cct)}
                        className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all border flex items-center gap-2 ${
                          selectedCct === cct
                            ? 'bg-[#292a2d] text-[#f2be71] border-[#f2be71] font-semibold'
                            : 'bg-[#1b1b1f] border-[#27272A] text-[#d3c4b3] hover:text-white hover:border-[#9c8f7f]'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full border border-black/30"
                          style={{
                            backgroundColor:
                              cct.includes('2700K') ? '#fed7aa' :
                              cct.includes('3000K') ? '#ffedd5' :
                              cct.includes('4000K') ? '#ffffff' : '#fef08a'
                          }}
                        ></span>
                        <span>{cct}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Beam Angle */}
              {uniqueBeams.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#9c8f7f] uppercase tracking-wider block">
                    3. Optical Beam Angle (FWHM)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {uniqueBeams.map(beam => (
                      <button
                        key={beam}
                        onClick={() => setSelectedBeam(beam)}
                        className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all border ${
                          selectedBeam === beam
                            ? 'bg-[#292a2d] text-[#f2be71] border-[#f2be71] font-semibold'
                            : 'bg-[#1b1b1f] border-[#27272A] text-[#d3c4b3] hover:text-white hover:border-[#9c8f7f]'
                        }`}
                      >
                        {beam}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Body Color Finish */}
              {uniqueFinishes.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#9c8f7f] uppercase tracking-wider block">
                    4. Architectural Body Finish
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {uniqueFinishes.map(finish => (
                      <button
                        key={finish}
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all border ${
                          selectedFinish === finish
                            ? 'bg-[#292a2d] text-[#f2be71] border-[#f2be71] font-semibold'
                            : 'bg-[#1b1b1f] border-[#27272A] text-[#d3c4b3] hover:text-white hover:border-[#9c8f7f]'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Control Protocol */}
              {uniqueControls.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#9c8f7f] uppercase tracking-wider block">
                    5. Dimming & Control Protocol
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {uniqueControls.map(ctrl => (
                      <button
                        key={ctrl}
                        onClick={() => setSelectedControl(ctrl)}
                        className={`px-3.5 py-1.5 rounded text-xs font-mono transition-all border ${
                          selectedControl === ctrl
                            ? 'bg-[#292a2d] text-[#f2be71] border-[#f2be71] font-semibold'
                            : 'bg-[#1b1b1f] border-[#27272A] text-[#d3c4b3] hover:text-white hover:border-[#9c8f7f]'
                        }`}
                      >
                        {ctrl}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Room Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#27272A]">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#9c8f7f] block">
                    Quantity (pcs)
                  </label>
                  <div className="flex items-center rounded border border-[#27272A] bg-[#121316] p-1 w-full max-w-[130px]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 text-[#9c8f7f] hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-center bg-transparent font-mono text-xs font-bold text-white focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 text-[#9c8f7f] hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#9c8f7f] block">
                    Specifier Zone / Room Note
                  </label>
                  <input
                    type="text"
                    value={zoneNote}
                    onChange={e => setZoneNote(e.target.value)}
                    placeholder="e.g. Gallery Room 102"
                    className="w-full bg-[#121316] border border-[#27272A] rounded px-3 py-2 text-xs text-[#F8F9FA] placeholder-zinc-600 focus:outline-none focus:border-[#f2be71] font-mono"
                  />
                </div>
              </div>

              {/* Add to Schedule Action */}
              <div className="pt-2">
                <button
                  onClick={handleAddToQuote}
                  className={`w-full py-4 rounded font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-xl ${
                    addedSuccess
                      ? 'bg-emerald-500 text-black'
                      : 'bg-[#f2be71] hover:bg-[#ffddb1] text-[#0D0E11]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Luminaire Schedule</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>+ Add to Specification Schedule</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tabbed Technical Data & Downloads Bar */}
      <section className="w-full bg-[#0D0E11] border-t border-[#27272A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Tabs Navigation */}
          <div className="flex border-b border-[#27272A] gap-8 font-mono text-xs">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 border-b-2 uppercase tracking-wider transition-colors ${
                activeTab === 'specs'
                  ? 'border-[#f2be71] text-[#f2be71] font-semibold'
                  : 'border-transparent text-[#9c8f7f] hover:text-[#F8F9FA]'
              }`}
            >
              Photometric Characteristics
            </button>
            <button
              onClick={() => setActiveTab('electrical')}
              className={`pb-3 border-b-2 uppercase tracking-wider transition-colors ${
                activeTab === 'electrical'
                  ? 'border-[#f2be71] text-[#f2be71] font-semibold'
                  : 'border-transparent text-[#9c8f7f] hover:text-[#F8F9FA]'
              }`}
            >
              Electrical & Thermal
            </button>
            <button
              onClick={() => setActiveTab('mechanical')}
              className={`pb-3 border-b-2 uppercase tracking-wider transition-colors ${
                activeTab === 'mechanical'
                  ? 'border-[#f2be71] text-[#f2be71] font-semibold'
                  : 'border-transparent text-[#9c8f7f] hover:text-[#F8F9FA]'
              }`}
            >
              Mechanical Dimensions
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`pb-3 border-b-2 uppercase tracking-wider transition-colors ${
                activeTab === 'downloads'
                  ? 'border-[#f2be71] text-[#f2be71] font-semibold'
                  : 'border-transparent text-[#9c8f7f] hover:text-[#F8F9FA]'
              }`}
            >
              Specifier Downloads
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 rounded-xl bg-[#121316] border border-[#27272A] font-mono text-xs">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">LED Package</span>
                  <span className="text-[#F8F9FA]">{product.ledChipBrand}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Color Rendering Index</span>
                  <span className="text-[#F8F9FA]">{product.cri} (R9 &gt; 90)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">MacAdam Step</span>
                  <span className="text-[#F8F9FA]">{product.macAdam}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Unified Glare Rating</span>
                  <span className="text-[#F8F9FA]">UGR &lt; {product.ugr}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Luminous Flux Efficacy</span>
                  <span className="text-[#F8F9FA]">Up to 115 lm/W</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Rated Lifetime</span>
                  <span className="text-[#F8F9FA]">{product.lifetime}</span>
                </div>
              </div>
            )}

            {activeTab === 'electrical' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Control Driver Brand</span>
                  <span className="text-[#F8F9FA]">{product.driverBrand}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Operating Voltage</span>
                  <span className="text-[#F8F9FA]">48V DC Class III SELV</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Dimming Resolution</span>
                  <span className="text-[#F8F9FA]">0.1% – 100% Flicker-Free</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Ambient Temp Range</span>
                  <span className="text-[#F8F9FA]">-20°C to +45°C</span>
                </div>
              </div>
            )}

            {activeTab === 'mechanical' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Housing Material</span>
                  <span className="text-[#F8F9FA]">{product.material}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Ingress Protection</span>
                  <span className="text-[#F8F9FA]">{product.ipRating}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Impact Protection</span>
                  <span className="text-[#F8F9FA]">{product.ikRating}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#27272A]">
                  <span className="text-[#9c8f7f]">Rotation / Pivot</span>
                  <span className="text-[#F8F9FA]">355° Pan / 90° Tilt</span>
                </div>
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <a
                  href={product.datasheetPdfUrl || '#'}
                  className="p-4 rounded bg-[#1f1f23] border border-[#27272A] hover:border-[#f2be71] flex flex-col gap-2 transition-colors"
                >
                  <FileDown className="w-5 h-5 text-[#E5B86E]" />
                  <span className="text-[#F8F9FA] font-medium">Datasheet .PDF</span>
                  <span className="text-[10px] text-[#9c8f7f]">Full technical spec</span>
                </a>
                <a
                  href={product.iesFileUrl || '#'}
                  className="p-4 rounded bg-[#1f1f23] border border-[#27272A] hover:border-[#f2be71] flex flex-col gap-2 transition-colors"
                >
                  <FileDown className="w-5 h-5 text-[#E5B86E]" />
                  <span className="text-[#F8F9FA] font-medium">Photometric .IES</span>
                  <span className="text-[10px] text-[#9c8f7f]">DIALux & Relux dataset</span>
                </a>
                <a
                  href={product.cadFileUrl || '#'}
                  className="p-4 rounded bg-[#1f1f23] border border-[#27272A] hover:border-[#f2be71] flex flex-col gap-2 transition-colors"
                >
                  <FileDown className="w-5 h-5 text-[#E5B86E]" />
                  <span className="text-[#F8F9FA] font-medium">Revit / BIM .RVT</span>
                  <span className="text-[10px] text-[#9c8f7f]">3D Architectural model</span>
                </a>
                <a
                  href={product.manualPdfUrl || '#'}
                  className="p-4 rounded bg-[#1f1f23] border border-[#27272A] hover:border-[#f2be71] flex flex-col gap-2 transition-colors"
                >
                  <FileDown className="w-5 h-5 text-[#E5B86E]" />
                  <span className="text-[#F8F9FA] font-medium">Manual .PDF</span>
                  <span className="text-[10px] text-[#9c8f7f]">Wiring & installation guide</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
