import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuote } from '../context/QuoteContext';
import {
  FileSpreadsheet,
  UploadCloud,
  FileCheck,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Printer,
  CheckCircle,
  Layers,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export const QuoteRequestPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    items,
    totalQuantity,
    removeItem,
    updateQuantity,
    updateItemNote,
    clearQuote,
  } = useQuote();

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Germany');
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('Commercial Office');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [submittedQuote, setSubmittedQuote] = useState<{
    referenceNumber: string;
    totalLuminaires: number;
    submittedAt: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.size > 25 * 1024 * 1024) {
        setErrorMessage('File size exceeds the 25MB maximum limit.');
        return;
      }
      setFile(selected);
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage('Your luminaire schedule is empty. Please add at least one product before submitting.');
      return;
    }

    if (!companyName.trim() || !fullName.trim() || !email.trim()) {
      setErrorMessage('Please fill in all mandatory contact information fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const quotePayload = {
        fullName,
        companyName,
        email,
        phone,
        country,
        projectName,
        projectType,
        estimatedDeliveryDate: deliveryDate ? new Date(deliveryDate).toISOString() : null,
        customerNotes,
        items: items.map(i => ({
          productId: i.productId,
          productVariantId: i.productVariantId || null,
          productCode: i.productCode,
          productName: i.productName,
          selectedSpecsJson: JSON.stringify({
            Wattage: i.wattage,
            Cct: i.cct,
            BeamAngle: i.beamAngle,
            BodyColor: i.bodyColor,
            ControlType: i.controlType,
          }),
          quantity: i.quantity,
          itemNote: i.itemNote || '',
        })),
      };

      const formData = new FormData();
      formData.append('quoteData', JSON.stringify(quotePayload));

      if (file) {
        formData.append('attachment', file);
      }

      const res = await api.submitQuote(formData);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#a1a1aa', '#52525b'],
      });

      setSubmittedQuote({
        referenceNumber: res.referenceNumber,
        totalLuminaires: res.totalLuminaires,
        submittedAt: new Date().toLocaleDateString(),
      });

      clearQuote();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An error occurred while submitting your quote request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedQuote) {
    return (
      <div className="min-h-screen bg-[#070709] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto print-container">
          <div className="bg-[#0d0d11] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Official B2B RFQ Registered
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                {t('quote.successTitle')}
              </h1>
              <p className="text-sm text-zinc-400 max-w-xl mx-auto mt-3 font-light leading-relaxed">
                {t('quote.successMessage')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/15 inline-block max-w-md w-full my-4">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {t('quote.referenceNumber')}
              </div>
              <div className="text-3xl font-extrabold font-mono text-white mt-1 tracking-wider">
                {submittedQuote.referenceNumber}
              </div>
              <div className="text-xs text-zinc-400 mt-2 font-mono">
                {submittedQuote.totalLuminaires} Luminaires Scheduled • Alpani Engineering Review
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 no-print">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-white/10 font-mono"
              >
                <Printer className="w-4 h-4 text-zinc-300" />
                <span>{t('quote.printSchedule')}</span>
              </button>

              <Link
                to="/products"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>{t('quote.continueBrowsing')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono mb-3">
            <FileSpreadsheet className="w-3.5 h-3.5 text-zinc-400" />
            <span>Formal Architectural RFQ Workflow</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('quote.title')}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-light leading-relaxed">
            {t('quote.subtitle')}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-zinc-900 border border-white/20 text-white text-xs font-mono">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT 7 COLS: LUMINAIRE SCHEDULE */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h2 className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-zinc-400" />
                <span>{t('quote.tableHeader')} ({items.length} Positions)</span>
              </h2>
              <span className="text-xs font-mono text-white">
                Total: <strong>{totalQuantity} pcs</strong>
              </span>
            </div>

            {items.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#0d0d11] border border-white/5 text-center space-y-4">
                <FileText className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-widest font-mono">
                  {t('quote.scheduleEmpty')}
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto font-light">
                  Select and configure luminaires with exact CCT, optics, and finishes to generate an official bill of quantities.
                </p>
                <Link
                  to="/products"
                  className="inline-flex px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  {t('quote.emptyAction')}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div
                    key={`${item.productId}-${idx}`}
                    className="p-4 rounded-2xl bg-[#0d0d11] border border-white/5 hover:border-white/15 transition-all space-y-3"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.productImageUrl || 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80'}
                        alt={item.productName}
                        className="w-18 h-18 rounded-xl object-cover bg-zinc-950 border border-white/5 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[11px] font-mono text-zinc-500 font-semibold">
                              {item.productCode}
                            </div>
                            <h3 className="text-sm font-semibold text-white truncate">
                              {item.productName}
                            </h3>
                          </div>
                          <button
                            onClick={() => removeItem(idx)}
                            className="text-zinc-500 hover:text-white p-1 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Specs Pills */}
                        <div className="flex flex-wrap gap-1.5 mt-2 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-white/5">
                            {item.wattage}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-white/5">
                            {item.cct}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-white/5">
                            {item.beamAngle}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                            {item.controlType}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-400">
                            {item.bodyColor}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Room Note & Stepper */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Zone / Room reference..."
                          value={item.itemNote || ''}
                          onChange={e => updateItemNote(idx, e.target.value)}
                          className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-white/30"
                        />
                      </div>

                      <div className="flex items-center rounded-lg border border-white/10 bg-zinc-950 p-0.5 shrink-0">
                        <button
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                          className="p-1.5 text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-bold text-white min-w-[32px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          className="p-1.5 text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT 5 COLS: PROJECT FORM */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0d11] border border-white/10 shadow-2xl space-y-6">
              <div>
                <h2 className="text-xs font-bold text-zinc-300 uppercase tracking-widest font-mono">
                  {t('quote.projectDetails')}
                </h2>
                <p className="text-xs text-zinc-500 mt-1 font-light">
                  All requests receive formal pricing with international CIF/FOB logistics terms.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    {t('quote.companyName')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Studio Architettura Milano"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                      {t('quote.contactPerson')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                      {t('quote.workEmail')} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                      {t('quote.phone')}
                    </label>
                    <input
                      type="tel"
                      placeholder="+49 89 2311 4400"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                      {t('quote.country')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Germany"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                      {t('quote.projectName')}
                    </label>
                    <input
                      type="text"
                      placeholder="Project name"
                      value={projectName}
                      onChange={e => setProjectName(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                      {t('quote.projectType')}
                    </label>
                    <select
                      value={projectType}
                      onChange={e => setProjectType(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/30"
                    >
                      <option value="Commercial Office">Commercial Office</option>
                      <option value="Retail & Hospitality">Retail & Hospitality</option>
                      <option value="Museums & Galleries">Museums & Galleries</option>
                      <option value="Luxury Residential">Luxury Residential</option>
                      <option value="Exterior Architectural">Exterior Architectural</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    {t('quote.deliveryDate')}
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={e => setDeliveryDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    {t('quote.customerNotes')}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specific requirements, dimming requirements, RAL custom finishes..."
                    value={customerNotes}
                    onChange={e => setCustomerNotes(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 resize-none font-light"
                  ></textarea>
                </div>

                {/* Plan file upload */}
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Architectural Plans / Lighting CAD (Optional)
                  </label>
                  <div className="relative border border-dashed border-white/15 hover:border-white/40 rounded-2xl p-5 text-center transition-colors bg-zinc-950/60 group">
                    <input
                      type="file"
                      id="planFile"
                      onChange={handleFileChange}
                      accept=".dwg,.dxf,.pdf,.xlsx,.xls,.zip,.ies"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors mx-auto mb-2" />
                    {file ? (
                      <div className="text-xs text-zinc-200 font-mono flex items-center justify-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-white" />
                        <span className="truncate max-w-xs">{file.name}</span>
                      </div>
                    ) : (
                      <>
                        <div className="text-xs font-medium text-zinc-300">
                          Click or drag CAD DWG, PDF, or ZIP schedule
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-1 font-mono">
                          Maximum file size: 25MB
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Submit RFQ Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 rounded-xl bg-white hover:bg-zinc-200 disabled:opacity-40 text-black font-semibold text-xs uppercase tracking-widest transition-all duration-200 shadow-sm flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <span>{t('quote.submitting')}</span>
                  ) : (
                    <>
                      <span>{t('quote.submitRfq')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 pt-2 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Confidentiality guaranteed. Official response in 24h.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
