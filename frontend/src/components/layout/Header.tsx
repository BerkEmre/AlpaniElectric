import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuote } from '../../context/QuoteContext';
import {
  Search,
  ChevronDown,
  Layers,
  ArrowRight,
  Phone,
  Lock,
  Menu,
  X,
  FileText
} from 'lucide-react';
import { Category } from '../../types';
import { api } from '../../services/api';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { t, i18n } = useTranslation();
  const { totalQuantity, toggleDrawer } = useQuote();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsProductsMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <>
      {/* Top Engineering Micro Bar */}
      <div className="hidden lg:block bg-[#090A0C] border-b border-[#27272A] py-1.5 px-6 text-[11px] text-[#9c8f7f] font-mono">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[#d3c4b3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B86E]"></span>
              Alpani Dış Ticaret Ltd. Şti. | Istanbul Architectural Manufacturing
            </span>
            <span className="text-[#343538] hidden xl:inline">•</span>
            <span className="text-[#9c8f7f] hidden xl:inline">
              ISO 9001 • CE • RoHS • ENEC Standards
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+905425158785" className="hover:text-[#F8F9FA] transition-colors flex items-center gap-1.5 text-[#d3c4b3]">
              <Phone className="w-3 h-3 text-[#E5B86E]" />
              <span>+90 542 515 87 85</span>
            </a>
            <span className="text-[#27272A]">/</span>
            <Link to="/become-distributor" className="hover:text-[#F8F9FA] transition-colors text-[#9c8f7f]">
              Global Partner Network
            </Link>
            <span className="text-[#27272A]">/</span>
            <Link to="/admin/login" className="hover:text-[#F8F9FA] transition-colors flex items-center gap-1 text-[#9c8f7f] hover:text-[#d3c4b3]">
              <Lock className="w-3 h-3" />
              <span>Admin Console</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0D0E11]/95 backdrop-blur-md border-b border-[#27272A] shadow-2xl'
            : 'bg-[#0D0E11]/90 backdrop-blur-sm border-b border-[#27272A]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Minimalist Architectural Logo from Google Stitch */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-7 h-7 bg-[#F8F9FA] flex items-center justify-center p-1 transition-transform group-hover:scale-95 rounded-sm">
                <div className="w-full h-full border border-[#0D0E11] grid grid-cols-2">
                  <div className="bg-[#0D0E11]"></div>
                  <div></div>
                  <div></div>
                  <div className="bg-[#0D0E11]"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm uppercase font-semibold tracking-widest text-[#F8F9FA] leading-none">
                  ALPANI
                </span>
                <span className="font-mono text-[9px] text-[#9c8f7f] tracking-wider uppercase mt-1">
                  INSTRUMENTS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-8">
              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsProductsMenuOpen(true)}
                onMouseLeave={() => setIsProductsMenuOpen(false)}
              >
                <button
                  onClick={() => navigate('/products')}
                  className={`flex items-center gap-1 font-mono text-xs uppercase tracking-wider transition-colors py-2 ${
                    isProductsMenuOpen || location.pathname.startsWith('/product')
                      ? 'text-[#f2be71] border-b border-[#f2be71]'
                      : 'text-[#d3c4b3] hover:text-[#F8F9FA]'
                  }`}
                >
                  <span>PRODUCTS</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu Dropdown */}
                {isProductsMenuOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[#121316] border border-[#27272A] rounded shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="col-span-2">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#27272A]">
                        <span className="text-[11px] font-semibold text-[#9c8f7f] uppercase tracking-widest font-mono">
                          Technical & Architectural Systems
                        </span>
                        <Link
                          to="/products"
                          className="text-[11px] text-[#E5B86E] hover:underline flex items-center gap-1 font-mono"
                        >
                          <span>All Systems</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((c) => (
                          <Link
                            key={c.id}
                            to={`/products?category=${c.slug}`}
                            className="flex items-start gap-3 p-2 rounded hover:bg-[#1f1f23] transition-colors group"
                          >
                            <div className="w-8 h-8 rounded bg-[#1f1f23] border border-[#27272A] flex items-center justify-center text-[#d3c4b3] group-hover:text-[#f2be71] group-hover:border-[#f2be71]/40 transition-colors shrink-0">
                              <Layers className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-[#F8F9FA] group-hover:text-[#f2be71] transition-colors truncate">
                                {c.name}
                              </div>
                              <p className="text-[11px] text-[#9c8f7f] font-mono mt-0.5">
                                {c.productCount} models
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#1f1f23] rounded p-5 border border-[#27272A] flex flex-col justify-between">
                      <div>
                        <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest bg-[#f2be71]/20 text-[#f2be71] rounded">
                          FLAGSHIP
                        </span>
                        <h4 className="text-sm font-semibold text-[#F8F9FA] mt-3 leading-snug">
                          MagnaTrack 48V Ecosystem
                        </h4>
                        <p className="text-xs text-[#9c8f7f] mt-1.5 leading-relaxed font-light">
                          Low-voltage snap-in channels with darklight downlights, linear diffusers, and DALI-2 integration.
                        </p>
                      </div>
                      <Link
                        to="/products?category=48v-magnetic"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-[#f2be71] hover:underline"
                      >
                        <span>Configure System</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/#collections"
                className="font-mono text-xs uppercase tracking-wider text-[#d3c4b3] hover:text-[#F8F9FA] transition-colors py-2"
              >
                APPLICATIONS
              </Link>

              <Link
                to="/projects"
                className={`font-mono text-xs uppercase tracking-wider transition-colors py-2 ${
                  location.pathname.startsWith('/project') ? 'text-[#f2be71] border-b border-[#f2be71]' : 'text-[#d3c4b3] hover:text-[#F8F9FA]'
                }`}
              >
                PROJECTS
              </Link>

              <Link
                to="/custom-solutions"
                className={`font-mono text-xs uppercase tracking-wider transition-colors py-2 ${
                  location.pathname === '/custom-solutions' ? 'text-[#f2be71] border-b border-[#f2be71]' : 'text-[#d3c4b3] hover:text-[#F8F9FA]'
                }`}
              >
                R&D & CUSTOM
              </Link>

              <Link
                to="/downloads"
                className={`font-mono text-xs uppercase tracking-wider transition-colors py-2 ${
                  location.pathname === '/downloads' ? 'text-[#f2be71] border-b border-[#f2be71]' : 'text-[#d3c4b3] hover:text-[#F8F9FA]'
                }`}
              >
                DOWNLOADS
              </Link>

              <Link
                to="/company"
                className={`font-mono text-xs uppercase tracking-wider transition-colors py-2 ${
                  location.pathname === '/company' ? 'text-[#f2be71] border-b border-[#f2be71]' : 'text-[#d3c4b3] hover:text-[#F8F9FA]'
                }`}
              >
                COMPANY
              </Link>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                aria-label="Search Catalog"
                onClick={onOpenSearch}
                className="w-9 h-9 flex items-center justify-center text-[#d3c4b3] hover:text-[#F8F9FA] border border-[#27272A] bg-[#121316] transition-colors rounded-sm"
                type="button"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Language Switcher Bar */}
              <div className="hidden sm:flex items-center border border-[#27272A] bg-[#121316] px-2.5 py-1.5 font-mono text-xs rounded-sm">
                {languages.map((lng, idx) => (
                  <React.Fragment key={lng.code}>
                    <button
                      onClick={() => changeLanguage(lng.code)}
                      className={`cursor-pointer transition-colors ${
                        i18n.language.startsWith(lng.code)
                          ? 'text-[#F8F9FA] font-bold'
                          : 'text-[#9c8f7f] hover:text-[#F8F9FA]'
                      }`}
                    >
                      {lng.label}
                    </button>
                    {idx < languages.length - 1 && (
                      <span className="text-[#4f4538] mx-1.5">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Quote List Button */}
              <button
                onClick={toggleDrawer}
                className="hidden md:flex items-center gap-1.5 border border-[#27272A] bg-[#121316] px-3.5 py-2 text-[#d3c4b3] hover:border-[#9c8f7f] transition-colors rounded-sm"
              >
                <FileText className="w-4 h-4 text-[#E5B86E]" />
                <span className="font-mono text-xs text-[#F8F9FA]">QUOTE LIST</span>
                <span className="bg-[#292a2d] text-[#E5B86E] font-mono text-xs px-1.5 py-0.5 ml-1 rounded-sm">
                  ({totalQuantity})
                </span>
              </button>

              {/* Solid White / Primary CTA Button */}
              <Link
                to="/quote-request"
                className="hidden lg:inline-flex items-center justify-center bg-[#F8F9FA] text-[#0D0E11] font-mono text-xs uppercase tracking-wider font-semibold px-5 py-2.5 hover:bg-[#f2be71] transition-colors rounded-sm"
              >
                Request Quote
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded bg-[#121316] border border-[#27272A] text-[#d3c4b3] hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-[#0D0E11] border-b border-[#27272A] px-4 pt-2 pb-6 space-y-3 font-mono">
            <Link
              to="/products"
              className="block py-2 text-xs uppercase tracking-wider font-medium text-[#F8F9FA] border-b border-[#27272A]"
            >
              PRODUCTS
            </Link>
            <Link
              to="/projects"
              className="block py-2 text-xs uppercase tracking-wider font-medium text-[#F8F9FA] border-b border-[#27272A]"
            >
              PROJECTS
            </Link>
            <Link
              to="/custom-solutions"
              className="block py-2 text-xs uppercase tracking-wider font-medium text-[#F8F9FA] border-b border-[#27272A]"
            >
              R&D & CUSTOM
            </Link>
            <Link
              to="/downloads"
              className="block py-2 text-xs uppercase tracking-wider font-medium text-[#F8F9FA] border-b border-[#27272A]"
            >
              DOWNLOADS
            </Link>
            <Link
              to="/company"
              className="block py-2 text-xs uppercase tracking-wider font-medium text-[#F8F9FA] border-b border-[#27272A]"
            >
              COMPANY
            </Link>
            <Link
              to="/quote-request"
              className="block py-2 text-xs uppercase tracking-wider font-medium text-[#f2be71]"
            >
              REQUEST QUOTE ({totalQuantity})
            </Link>
          </div>
        )}
      </header>
    </>
  );
};
