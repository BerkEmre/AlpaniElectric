import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { QuoteDetail } from '../../types';
import {
  FileSpreadsheet,
  Download,
  ArrowLeft,
  Paperclip,
  CheckCircle,
  Save,
  Building,
  Layers,
  MessageSquare
} from 'lucide-react';

export const AdminQuoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<QuoteDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('New');
  const [internalNotes, setInternalNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getAdminQuoteById(parseInt(id))
      .then(data => {
        setQuote(data);
        setStatus(data.status);
        setInternalNotes(data.internalAdminNotes || '');
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdateStatus = async () => {
    if (!quote) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      await api.updateAdminQuoteStatus(quote.id, status, internalNotes);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const parseSpecs = (json: string): Record<string, string> => {
    try {
      return JSON.parse(json) || {};
    } catch {
      return {};
    }
  };

  if (loading || !quote) {
    return (
      <div className="py-20 text-center text-xs font-mono text-zinc-400">
        Loading luminaire schedule...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <Link
          to="/admin/quotes"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Quotes</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Export to Excel CSV Button */}
          <button
            onClick={() => api.downloadQuoteCsv(quote.id, quote.referenceNumber)}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-zinc-200 text-xs font-medium flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>Export to Excel (CSV)</span>
          </button>
        </div>
      </div>

      {/* Main Reference Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0d11] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-light font-mono text-white tracking-wider">
              {quote.referenceNumber}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 font-mono text-xs text-zinc-300">
              Status: <strong className="text-white font-medium">{quote.status}</strong>
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-2 font-mono">
            Submitted on {new Date(quote.createdAt).toLocaleString()} • {quote.totalLuminaires} total luminaires scheduled
          </p>
        </div>

        {/* Attached Plan Downloader */}
        {quote.attachmentPath && (
          <div className="p-4 rounded-2xl bg-[#121217] border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Paperclip className="w-4 h-4 text-zinc-300 shrink-0" />
              <div className="min-w-0">
                <div className="text-xs font-medium text-white truncate max-w-[200px]">
                  {quote.attachmentFileName || 'Architectural Plan'}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  {quote.attachmentSizeBytes ? `${(quote.attachmentSizeBytes / (1024 * 1024)).toFixed(2)} MB` : 'Project File'}
                </div>
              </div>
            </div>
            <button
              onClick={() => api.downloadQuoteAttachment(quote.id, quote.attachmentFileName || 'plan.dwg')}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-semibold tracking-wider uppercase transition-colors shrink-0"
            >
              Download
            </button>
          </div>
        )}
      </div>

      {/* Customer & Project Metadata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information Card */}
        <div className="p-6 rounded-2xl bg-[#0d0d11] border border-white/[0.08] space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Building className="w-4 h-4 text-zinc-500" />
            <span>Client & Firm Coordinates</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/[0.05]">
              <span className="text-zinc-500">Company Name:</span>
              <strong className="text-white font-medium">{quote.companyName}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.05]">
              <span className="text-zinc-500">Contact Person:</span>
              <strong className="text-white font-medium">{quote.fullName}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.05]">
              <span className="text-zinc-500">Work Email:</span>
              <a href={`mailto:${quote.email}`} className="text-zinc-200 hover:text-white font-mono">{quote.email}</a>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.05]">
              <span className="text-zinc-500">Phone / WhatsApp:</span>
              <a href={`tel:${quote.phone}`} className="text-zinc-200 hover:text-white font-mono">{quote.phone || '—'}</a>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-500">Destination Country:</span>
              <strong className="text-white font-medium">{quote.country}</strong>
            </div>
          </div>
        </div>

        {/* Project Details Card */}
        <div className="p-6 rounded-2xl bg-[#0d0d11] border border-white/[0.08] space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-500" />
            <span>Project Scope & Schedule</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/[0.05]">
              <span className="text-zinc-500">Project Name:</span>
              <strong className="text-white font-medium">{quote.projectName || '—'}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.05]">
              <span className="text-zinc-500">Application Type:</span>
              <strong className="text-white font-medium">{quote.projectType || '—'}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.05]">
              <span className="text-zinc-500">Estimated Delivery:</span>
              <strong className="text-white font-medium">
                {quote.estimatedDeliveryDate ? new Date(quote.estimatedDeliveryDate).toLocaleDateString() : 'Not specified'}
              </strong>
            </div>
            <div className="py-1.5">
              <span className="text-zinc-500 block mb-1">Customer Scope Notes:</span>
              <p className="text-zinc-300 bg-[#121217] p-3 rounded-xl border border-white/5 font-mono text-[11px] leading-relaxed">
                {quote.customerNotes || 'No specific notes provided.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Itemized Luminaire Schedule Table */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-400 flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-zinc-500" />
          <span>Itemized Luminaire Schedule ({quote.items.length} Positions)</span>
        </h3>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d11] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#121217] text-zinc-400 uppercase tracking-wider text-[10px] border-b border-white/[0.08]">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Luminaire</th>
                  <th className="px-4 py-3">Configured Technical Specifications</th>
                  <th className="px-4 py-3 text-center">Qty (pcs)</th>
                  <th className="px-4 py-3">Zone / Room Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {quote.items.map((item, idx) => {
                  const specs = parseSpecs(item.selectedSpecsJson);
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-4 text-zinc-600 font-bold">{idx + 1}</td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-white font-sans text-sm">{item.productName}</div>
                        <div className="text-[11px] text-zinc-500 font-mono">{item.productCode}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1.5 text-[10px]">
                          {specs.Wattage && (
                            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-200 border border-white/10">
                              {specs.Wattage}
                            </span>
                          )}
                          {specs.Cct && (
                            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-200 border border-white/10">
                              {specs.Cct}
                            </span>
                          )}
                          {specs.BeamAngle && (
                            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-200 border border-white/10">
                              {specs.BeamAngle}
                            </span>
                          )}
                          {specs.BodyColor && (
                            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                              {specs.BodyColor}
                            </span>
                          )}
                          {specs.ControlType && (
                            <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 font-semibold">
                              {specs.ControlType}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center font-light text-base text-white">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-4 text-zinc-300 font-sans">
                        {item.itemNote || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Status & Internal Team Notes Editor */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0d11] border border-white/[0.08] space-y-4">
        <h3 className="text-xs uppercase tracking-wider font-mono text-zinc-400 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-zinc-500" />
          <span>Internal Engineering Workflow & Pricing Notes</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
              Workflow Status
            </label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full bg-[#121217] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
            >
              <option value="New">New (Unreviewed)</option>
              <option value="InReview">In Review (DIALux calculation in progress)</option>
              <option value="Quoted">Quoted (Trade pricing dispatched)</option>
              <option value="Closed">Closed (PO Confirmed / Archived)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
              Internal Team Comments (Visible only to Alpani Staff)
            </label>
            <textarea
              rows={3}
              value={internalNotes}
              onChange={e => setInternalNotes(e.target.value)}
              placeholder="e.g. Sent sample case to Munich studio. 35% standard distributor discount applied on VECTA-LIN series."
              className="w-full bg-[#121217] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white resize-none font-mono"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {saveSuccess && (
            <span className="text-xs font-mono text-zinc-300 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Saved successfully</span>
            </span>
          )}

          <button
            onClick={handleUpdateStatus}
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-white hover:bg-zinc-200 disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Updating...' : 'Save Notes & Status'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
