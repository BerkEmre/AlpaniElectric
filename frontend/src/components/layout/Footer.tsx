import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0D0E11] border-t border-[#27272A] pt-16 pb-8 text-[#9c8f7f] text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-[#27272A]">
          {/* Column 1: Brand & Certifications */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#F8F9FA] flex items-center justify-center p-0.5 rounded-sm">
                <div className="w-full h-full border border-[#0D0E11] grid grid-cols-2">
                  <div className="bg-[#0D0E11]"></div>
                  <div></div>
                  <div></div>
                  <div className="bg-[#0D0E11]"></div>
                </div>
              </div>
              <span className="font-mono text-sm uppercase font-semibold text-[#F8F9FA] tracking-widest">
                ALPANI
              </span>
            </div>
            <p className="text-xs text-[#9c8f7f] leading-relaxed max-w-sm font-light">
              Precision luminaires engineered in Istanbul for international architecture and commercial spaces. Advanced optical darkroom control and minimalist integration.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="font-mono text-[10px] text-[#9c8f7f] border border-[#27272A] px-2 py-0.5 rounded-sm">
                ISO 9001
              </span>
              <span className="font-mono text-[10px] text-[#9c8f7f] border border-[#27272A] px-2 py-0.5 rounded-sm">
                CE
              </span>
              <span className="font-mono text-[10px] text-[#9c8f7f] border border-[#27272A] px-2 py-0.5 rounded-sm">
                ENEC
              </span>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F8F9FA] font-semibold">
              SOLUTIONS
            </span>
            <ul className="flex flex-col gap-2 font-mono text-xs text-[#9c8f7f]">
              <li>
                <Link to="/products?category=48v-magnetic" className="hover:text-[#F8F9FA] transition-colors">
                  48V Magnetic Systems
                </Link>
              </li>
              <li>
                <Link to="/products?category=tracklight" className="hover:text-[#F8F9FA] transition-colors">
                  Tracklights
                </Link>
              </li>
              <li>
                <Link to="/products?category=recessed" className="hover:text-[#F8F9FA] transition-colors">
                  Downlights
                </Link>
              </li>
              <li>
                <Link to="/products?category=profile" className="hover:text-[#F8F9FA] transition-colors">
                  Linear Profiles
                </Link>
              </li>
              <li>
                <Link to="/products?category=surface-pendant" className="hover:text-[#F8F9FA] transition-colors">
                  Outdoor & Façade
                </Link>
              </li>
              <li>
                <Link to="/custom-solutions" className="hover:text-[#f2be71] transition-colors text-[#E5B86E]">
                  Custom Optical Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools & Specifiers */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F8F9FA] font-semibold">
              TOOLS & SPECIFIERS
            </span>
            <ul className="flex flex-col gap-2 font-mono text-xs text-[#9c8f7f]">
              <li className="flex items-center justify-between">
                <Link to="/downloads" className="hover:text-[#F8F9FA] transition-colors">
                  DIALux Plugin
                </Link>
                <span className="text-[#E5B86E] font-mono text-[10px]">.DLX</span>
              </li>
              <li className="flex items-center justify-between">
                <Link to="/downloads" className="hover:text-[#F8F9FA] transition-colors">
                  BIM / Revit Files
                </Link>
                <span className="text-[#94A3B8] font-mono text-[10px]">.RVT</span>
              </li>
              <li className="flex items-center justify-between">
                <Link to="/downloads" className="hover:text-[#F8F9FA] transition-colors">
                  IES & LDT Photometric Data
                </Link>
                <span className="text-[#94A3B8] font-mono text-[10px]">.IES</span>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-[#F8F9FA] transition-colors">
                  Master Catalog 2026
                </Link>
              </li>
              <li>
                <Link to="/company" className="hover:text-[#F8F9FA] transition-colors">
                  Warranty & Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global HQ & Contact */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F8F9FA] font-semibold">
              GLOBAL HQ & CONTACT
            </span>
            <div className="flex flex-col gap-1 text-xs text-[#9c8f7f] font-light">
              <p>Sinanoba Mah. Ibrahimzade Cad. No: 1B/35</p>
              <p>Büyükçekmece, Istanbul, Turkey</p>
              <p className="font-mono text-[#F8F9FA] pt-1">Tel: +90 542 515 87 85</p>
              <p className="font-mono text-[#E5B86E]">info@alpani.com</p>
            </div>
            <div className="border-t border-[#27272A] pt-3 font-mono text-[11px]">
              <p className="text-[#9c8f7f] uppercase">Regional Liaison Hubs:</p>
              <p className="text-[#d3c4b3]">Frankfurt, Germany | Dubai, UAE</p>
            </div>
            <div className="flex items-center gap-3 pt-1 font-mono text-xs">
              <a
                href="https://www.linkedin.com/company/alpanilighting/"
                target="_blank"
                rel="noreferrer"
                className="text-[#9c8f7f] hover:text-[#F8F9FA] transition-colors uppercase"
              >
                LinkedIn
              </a>
              <span className="text-[#27272A]">/</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#9c8f7f] hover:text-[#F8F9FA] transition-colors uppercase"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9c8f7f]">
          <div>© 2026 Alpani Lighting Instruments. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link to="/company" className="hover:text-[#F8F9FA] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/company" className="hover:text-[#F8F9FA] transition-colors">
              Imprint
            </Link>
            <Link to="/company" className="hover:text-[#F8F9FA] transition-colors">
              ESG Sustainability
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
