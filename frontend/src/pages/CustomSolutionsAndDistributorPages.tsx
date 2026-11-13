import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import {
  Cpu,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Send,
  Sparkles,
  Globe2,
  Award,
  ArrowRight
} from 'lucide-react';

export const CustomSolutionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            <span>Dedicated Architectural R&D Division</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
            Custom Solutions & Bespoke Engineering
          </h1>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            When standard catalog luminaires cannot fulfill the daring geometries of your architecture, Alpani's engineering team designs, tools, tests, and manufactures bespoke luminaires tailored strictly to your project specification.
          </p>
        </div>

        {/* 4 Pillars of R&D */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 rounded-2xl bg-[#0d0d11] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-zinc-300 flex items-center justify-center font-mono text-sm">
              01
            </div>
            <h3 className="text-base font-medium text-white">Custom Profile Extrusion</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              In-house aluminum die manufacturing for unique architectural profiles, curved drywall reveals, and integrated acoustic ceiling baffles.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0d0d11] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-zinc-300 flex items-center justify-center font-mono text-sm">
              02
            </div>
            <h3 className="text-base font-medium text-white">Optical Simulation & TIR</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Custom PMMA and polycarbonate lens tooling. Asymmetric wallwashing, narrow 6° pinspots, and Batwing distributions simulated in TracePro.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0d0d11] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-zinc-300 flex items-center justify-center font-mono text-sm">
              03
            </div>
            <h3 className="text-base font-medium text-white">Advanced Control Integration</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              DALI-2 certified DT8 (Tunable White), DMX512 dynamic RGBW, 0-10V, and wireless Casambi mesh integration calibrated to site requirements.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0d0d11] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-zinc-300 flex items-center justify-center font-mono text-sm">
              04
            </div>
            <h3 className="text-base font-medium text-white">Thermal & Environmental Testing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Thermal shock chambers, salt-spray corrosion tests for marine IP65 applications, and goniophotometric IES validation under one roof.
            </p>
          </div>
        </div>

        {/* Process Flow */}
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0d0d11] border border-white/[0.08] space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">Engineering Discipline</span>
            <h2 className="text-2xl sm:text-3xl font-light text-white">Bespoke Production Workflow</h2>
            <p className="text-xs text-zinc-400 font-light">
              From architectural sketch to accredited batch delivery in 4–6 weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">STAGE 01</div>
              <h4 className="text-sm font-medium text-white">CAD & Optical Review</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">Architectural geometry analysis, thermal simulation, and optical ray tracing.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">STAGE 02</div>
              <h4 className="text-sm font-medium text-white">Rapid 3D Prototyping</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">Working physical sample produced within 7 working days for design team approval.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">STAGE 03</div>
              <h4 className="text-sm font-medium text-white">Lab Goniophotometry</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">Generation of dedicated IES files and thermal degradation test reports.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">STAGE 04</div>
              <h4 className="text-sm font-medium text-white">Batch Precision Assembly</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">100% burn-in testing and secure international palletized dispatch from Istanbul.</p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/quote-request"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-colors"
            >
              <span>Submit Custom Lighting Brief</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BecomeDistributorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    website: '',
    annualTurnover: '$1M - $5M',
    currentBrands: '',
    targetMarkets: 'Architectural Projects & Lighting Design',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.submitDistributorApplication(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono tracking-wider">
            <Globe2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>International Partner Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Authorized Distributor Partnership
          </h1>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Represent Alpani Lighting in your exclusive territory. Gain priority production slots, project registration price protection, full DIALux engineering support, and showroom demo systems.
          </p>
        </div>

        {success ? (
          <div className="p-10 sm:p-14 rounded-3xl bg-[#0d0d11] border border-white/[0.08] text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-light text-white">Application Received</h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto font-light leading-relaxed">
              Our International Export Director will review your company profile and contact you within 2 business days to schedule an introduction meeting.
            </p>
            <div className="pt-2">
              <Link
                to="/"
                className="inline-block px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0d0d11] border border-white/[0.08]">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs font-mono">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lumix Distribution GmbH"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name & title"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="partner@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+49 89 2311 4400"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Germany"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                    City & Headquarters
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Munich"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Company Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.company.com"
                    value={formData.website}
                    onChange={e => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Approximate Annual Lighting Turnover
                  </label>
                  <select
                    value={formData.annualTurnover}
                    onChange={e => setFormData({ ...formData, annualTurnover: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  >
                    <option value="Under $1M">Under $1M</option>
                    <option value="$1M - $5M">$1M - $5M</option>
                    <option value="$5M - $20M">$5M - $20M</option>
                    <option value="Over $20M">Over $20M</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Current Architectural Brands Represented (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flos, iGuzzini, ERCO, Delta Light"
                  value={formData.currentBrands}
                  onChange={e => setFormData({ ...formData, currentBrands: e.target.value })}
                  className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Partnership Intent & Target Market
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your current distribution coverage, architectural specifier relationships, and showroom facilities..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#121217] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-white hover:bg-zinc-200 disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Submitting Application...' : 'Submit Partnership Application'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
