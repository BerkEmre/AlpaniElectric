import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuote } from '../context/QuoteContext';
import {
  Filter,
  Search,
  RotateCcw,
  SlidersHorizontal,
  ArrowRight,
  Plus,
  Check
} from 'lucide-react';
import { api } from '../services/api';
import { ProductListItem, Category } from '../types';

export const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useQuote();

  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [addedSku, setAddedSku] = useState<string | null>(null);

  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const wattageParam = searchParams.get('wattage') || '';
  const cctParam = searchParams.get('cct') || '';
  const beamParam = searchParams.get('beamAngle') || '';
  const ipParam = searchParams.get('ipRating') || '';
  const controlParam = searchParams.get('controlType') || '';

  const [searchInput, setSearchInput] = useState(searchParam);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const res = await api.getProducts({
          category: categoryParam || undefined,
          search: searchParam || undefined,
          wattage: wattageParam || undefined,
          cct: cctParam || undefined,
          beamAngle: beamParam || undefined,
          ipRating: ipParam || undefined,
          controlType: controlParam || undefined,
          pageSize: 24,
        });
        setProducts(res.items);
        setTotalCount(res.totalCount);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
  }, [categoryParam, searchParam, wattageParam, cctParam, beamParam, ipParam, controlParam]);

  const updateFilter = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams);
  };

  const resetAllFilters = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams());
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('search', searchInput);
  };

  const handleQuickAdd = (product: ProductListItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      productCode: product.code,
      productName: product.name,
      productImageUrl: product.mainImageUrl,
      wattage: product.wattages[0] || 'Standard',
      cct: product.ccts[0] || '3000K',
      beamAngle: product.beamAngles[0] || 'Medium',
      bodyColor: product.bodyColors[0] || 'Matte Black',
      controlType: product.controlTypes[0] || 'DALI-2',
      quantity: 1,
      itemNote: 'Standard Specification',
    });

    setAddedSku(product.code);
    setTimeout(() => setAddedSku(null), 1800);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-10 border-b border-white/5 pb-8">
          <div className="text-xs font-mono text-zinc-500 mb-2 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-300">Architectural Catalog</span>
            {categoryParam && (
              <>
                <span>/</span>
                <span className="text-white capitalize">{categoryParam.replace('-', ' ')}</span>
              </>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Architectural Luminaires & Systems
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
                {t('catalog.showingProducts', { count: totalCount })}
              </p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs font-semibold text-zinc-200"
            >
              <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
              <span>{isMobileFilterOpen ? 'Hide Filters' : 'Filter Specifications'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* LEFT SIDEBAR: TECHNICAL FILTERS */}
          <aside className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} space-y-6`}>
            <div className="p-5 rounded-2xl bg-[#0d0d11] border border-white/5 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-300 flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{t('catalog.filterBy')}</span>
                </span>
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors font-mono"
                  title="Clear all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Keyword Search */}
              <div>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder={t('catalog.searchPlaceholder')}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 pl-9 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 font-mono"
                  />
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                </form>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest font-mono block">
                  Category System
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => updateFilter('category', '')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      !categoryParam ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>All Systems</span>
                    <span className="font-mono text-[10px] opacity-75">{totalCount}</span>
                  </button>
                  {categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => updateFilter('category', c.slug)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        categoryParam === c.slug ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{c.name}</span>
                      <span className="font-mono text-[10px] opacity-75">{c.productCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CCT / Kelvin Filter */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest font-mono block">
                  {t('catalog.cct')}
                </label>
                <div className="grid grid-cols-2 gap-1.5 font-mono">
                  {['2700K', '3000K', '4000K', 'Tunable White'].map(cct => (
                    <button
                      key={cct}
                      onClick={() => updateFilter('cct', cctParam === cct ? '' : cct)}
                      className={`px-2.5 py-1.5 text-xs rounded-xl border text-center transition-all truncate ${
                        cctParam === cct
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-zinc-950 border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {cct}
                    </button>
                  ))}
                </div>
              </div>

              {/* Beam Angle Filter */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest font-mono block">
                  {t('catalog.beamAngle')}
                </label>
                <div className="grid grid-cols-2 gap-1.5 font-mono">
                  {['15°', '24°', '36°', '85°', '110° Diffuse'].map(angle => (
                    <button
                      key={angle}
                      onClick={() => updateFilter('beamAngle', beamParam === angle ? '' : angle)}
                      className={`px-2.5 py-1.5 text-xs rounded-xl border text-center transition-all truncate ${
                        beamParam === angle
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-zinc-950 border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {angle}
                    </button>
                  ))}
                </div>
              </div>

              {/* IP Rating Filter */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest font-mono block">
                  {t('catalog.ipRating')}
                </label>
                <div className="grid grid-cols-3 gap-1.5 font-mono">
                  {['IP20', 'IP44', 'IP54', 'IP65'].map(ip => (
                    <button
                      key={ip}
                      onClick={() => updateFilter('ipRating', ipParam === ip ? '' : ip)}
                      className={`px-2 py-1.5 text-xs rounded-xl border text-center transition-all ${
                        ipParam === ip
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-zinc-950 border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {ip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control / Dimming Protocol */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest font-mono block">
                  {t('catalog.control')}
                </label>
                <div className="space-y-1 font-mono">
                  {['DALI-2', 'Casambi Bluetooth', 'On-Off', '0-10V'].map(ctrl => (
                    <button
                      key={ctrl}
                      onClick={() => updateFilter('controlType', controlParam === ctrl ? '' : ctrl)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        controlParam === ctrl
                          ? 'bg-white text-black font-semibold'
                          : 'bg-zinc-950 text-zinc-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{ctrl}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT PRODUCT GRID */}
          <main className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-96 rounded-2xl bg-zinc-900/50 animate-pulse border border-white/5"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 p-8 rounded-2xl bg-[#0d0d11] border border-white/5 space-y-4">
                <p className="text-xs font-mono text-zinc-400">{t('catalog.noProducts')}</p>
                <button
                  onClick={resetAllFilters}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 font-mono"
                >
                  {t('catalog.resetFilters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(product => (
                  <div
                    key={product.id}
                    className="group rounded-2xl overflow-hidden bg-[#0d0d11] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between surface-card"
                  >
                    <div>
                      {/* Product Image */}
                      <Link to={`/product/${product.slug}`} className="block relative h-60 overflow-hidden bg-black">
                        <img
                          src={product.mainImageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale contrast-125 brightness-90 group-hover:brightness-100"
                        />
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                          {product.categoryName}
                        </div>
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-400">
                          {product.ipRating}
                        </div>
                      </Link>

                      {/* Info & Specs */}
                      <div className="p-5 space-y-2.5">
                        <div className="text-[11px] font-mono text-zinc-500">
                          {product.code}
                        </div>
                        <Link to={`/product/${product.slug}`}>
                          <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-light">
                          {product.shortDescription}
                        </p>

                        {/* Engineering Pills */}
                        <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-zinc-950 border border-white/5 text-zinc-300">
                            {product.cri}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-zinc-950 border border-white/5 text-zinc-300">
                            UGR {product.ugr}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-zinc-950 border border-white/5 text-zinc-400">
                            {product.macAdam}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between gap-2 mt-2">
                      <Link
                        to={`/product/${product.slug}`}
                        className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white hover:text-black text-zinc-200 text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5 font-mono"
                      >
                        <span>{t('catalog.viewSpecs')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`p-2 rounded-xl border transition-all ${
                          addedSku === product.code
                            ? 'bg-white border-white text-black'
                            : 'bg-zinc-950 border-white/10 hover:border-white/30 text-zinc-300 hover:text-white'
                        }`}
                        title="Add to schedule"
                      >
                        {addedSku === product.code ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
