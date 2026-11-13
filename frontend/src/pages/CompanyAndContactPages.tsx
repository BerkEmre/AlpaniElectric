import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Building,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const CompanyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono tracking-wider">
            <Building className="w-3.5 h-3.5 text-zinc-400" />
            <span>Alpani Dış Ticaret Ltd. Şti.</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
            10+ Years of Manufacturing Excellence
          </h1>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Founded in Istanbul, Alpani Lighting combines aerospace-grade metal forming, advanced thermodynamic engineering, and pure European minimalist aesthetics to engineer architectural luminaires for global commercial and cultural projects.
          </p>
        </div>

        {/* Factory Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 rounded-3xl bg-[#0d0d11] border border-white/[0.08]">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-light font-mono text-white">10+</div>
            <div className="text-xs text-zinc-400 font-light">Years R&D Expertise</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-light font-mono text-white">45+</div>
            <div className="text-xs text-zinc-400 font-light">Export Countries</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-light font-mono text-white">100%</div>
            <div className="text-xs text-zinc-400 font-light">Goniophotometric Validation</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-light font-mono text-white">&gt; 50k hrs</div>
            <div className="text-xs text-zinc-400 font-light">L90B10 Component Lifetime</div>
          </div>
        </div>

        {/* Manufacturing Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0d0d11] border border-white/[0.08] hover:border-white/20 transition-all space-y-4">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Discipline 01</div>
            <h3 className="text-base font-medium text-white">Cold-Forged Metal Forming</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              We machine and extrude pure 6063-T5 aluminum with zero surface porosity. Our precision anodizing and fluorocarbon powder coatings withstand harsh industrial and coastal atmospheres.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-[#0d0d11] border border-white/[0.08] hover:border-white/20 transition-all space-y-4">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Discipline 02</div>
            <h3 className="text-base font-medium text-white">Zero-Compromise Optics</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              We exclusively utilize high-fidelity Citizen and Nichia top-bin chips with MacAdam SDCM &lt; 2 and high R9 saturated red values, coupled with vacuum-metalized specular reflectors.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-[#0d0d11] border border-white/[0.08] hover:border-white/20 transition-all space-y-4">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Discipline 03</div>
            <h3 className="text-base font-medium text-white">Architectural Interoperability</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              All systems are fully compliant with DALI-2 (IEC 62386), DMX-RDM, 0-10V, and wireless Casambi mesh networks, ensuring plug-and-play BMS integration worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Direct Commercial & Technical Coordination
          </div>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
            Contact Alpani Headquarters
          </h1>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Our international project team is ready to assist architects, lighting designers, and contractors with photometric calculations, sample units, and quotation schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0d0d11] border border-white/[0.08] space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 shrink-0">
                    <MapPin className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Headquarters & Manufacturing Plant</h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-light">
                      Sinanoba Mah. Ibrahimzade Cad. No: 1B/35<br />
                      34535 Buyukcekmece, Istanbul - Turkey
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 shrink-0">
                    <Phone className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Phone & WhatsApp Direct</h4>
                    <a href="tel:+905425158785" className="text-xs text-zinc-300 hover:text-white font-mono block mt-1 transition-colors">
                      +90 542 515 87 85
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 shrink-0">
                    <Mail className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Official Correspondence</h4>
                    <a href="mailto:info@alpani.com" className="text-xs text-zinc-300 hover:text-white font-mono block mt-1 transition-colors">
                      info@alpani.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 shrink-0">
                    <svg className="w-5 h-5 fill-zinc-400" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Corporate Network</h4>
                    <a
                      href="https://www.linkedin.com/company/alpanilighting/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-zinc-300 hover:text-white font-mono block mt-1 transition-colors"
                    >
                      linkedin.com/company/alpanilighting
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0d0d11] border border-white/[0.08] space-y-6">
              <h2 className="text-lg font-light text-white">Direct Technical Inquiry</h2>
              {submitted ? (
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-3">
                  <CheckCircle className="w-8 h-8 text-white mx-auto" />
                  <h4 className="text-sm font-medium text-white">Inquiry Dispatched</h4>
                  <p className="text-xs text-zinc-400 font-light">Our engineering desk will respond within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">Company</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                        placeholder="Architectural studio / Company"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">Phone</label>
                      <input
                        type="tel"
                        className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                        placeholder="+90 ..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      required
                      className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white resize-none"
                      placeholder="Project details, product inquiries, sample requests..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider transition-colors"
                  >
                    Submit Technical Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
