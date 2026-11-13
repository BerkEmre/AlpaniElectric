import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { QuoteDetail, QuoteStats } from '../../types';
import {
  Search,
  Download,
  Paperclip,
  ArrowRight
} from 'lucide-react';

export const AdminQuotesPage: React.FC = () => {
  const [stats, setStats] = useState<QuoteStats | null>(null);
  const [quotes, setQuotes] = useState<QuoteDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const [statsData, quotesData] = await Promise.all([
        api.getAdminQuoteStats(),
        api.getAdminQuotes({ search: search || undefined, status: statusFilter || undefined }),
      ]);
      setStats(statsData);
      setQuotes(quotesData.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchQuotes();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            New
          </span>
        );
      case 'InReview':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono text-[10px] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            In Review
          </span>
        );
      case 'Quoted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-black font-mono text-[10px] tracking-wider uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            Quoted
          </span>
        );
      case 'Closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
            Closed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-400 font-mono text-[10px]">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
          B2B Luminaire Quotes & Schedules
        </h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Review itemized RFQ specifications, download architectural plans, and export ERP spreadsheets.
        </p>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-[#0d0d11] border border-white/[0.08]">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Total RFQs</div>
            <div className="text-2xl font-light font-mono text-white mt-1">{stats.totalQuotes}</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0d0d11] border border-white/20">
            <div className="text-[11px] font-mono text-zinc-300 uppercase tracking-wider">New Inquiries</div>
            <div className="text-2xl font-light font-mono text-white mt-1">{stats.newQuotes}</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0d0d11] border border-white/[0.08]">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">In Review</div>
            <div className="text-2xl font-light font-mono text-zinc-300 mt-1">{stats.inReviewQuotes}</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0d0d11] border border-white/[0.08]">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Quoted</div>
            <div className="text-2xl font-light font-mono text-zinc-300 mt-1">{stats.quotedQuotes}</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0d0d11] border border-white/[0.08] col-span-2 md:col-span-1">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Total Luminaires</div>
            <div className="text-2xl font-light font-mono text-white mt-1">{stats.totalLuminairesRequested} <span className="text-xs text-zinc-400">pcs</span></div>
          </div>
        </div>
      )}

      {/* Controls Bar: Search & Status Filters */}
      <div className="p-4 rounded-2xl bg-[#0d0d11] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { label: 'All Statuses', value: '' },
            { label: 'New', value: 'New' },
            { label: 'In Review', value: 'InReview' },
            { label: 'Quoted', value: 'Quoted' },
            { label: 'Closed', value: 'Closed' },
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                statusFilter === tab.value
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search code, company, country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 pl-9 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white font-mono"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
        </form>
      </div>

      {/* Quotes Data Table */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d11] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#121217] text-zinc-400 uppercase tracking-wider text-[10px] border-b border-white/[0.08]">
              <tr>
                <th className="px-5 py-3.5">Reference #</th>
                <th className="px-5 py-3.5">Company & Contact</th>
                <th className="px-5 py-3.5">Country</th>
                <th className="px-5 py-3.5">Project Name</th>
                <th className="px-5 py-3.5 text-center">Items</th>
                <th className="px-5 py-3.5 text-center">Plan File</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-zinc-400">
                    Loading quotes...
                  </td>
                </tr>
              ) : quotes.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-zinc-400">
                    No quote requests match the current search / filter.
                  </td>
                </tr>
              ) : (
                quotes.map(q => (
                  <tr key={q.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-bold text-white whitespace-nowrap">
                      {q.referenceNumber}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-white font-sans text-sm">{q.companyName}</div>
                      <div className="text-zinc-400 text-[11px] font-sans">{q.fullName} • {q.email}</div>
                    </td>
                    <td className="px-5 py-4 text-zinc-300 font-sans">
                      {q.country}
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-zinc-200 font-sans">{q.projectName || '—'}</div>
                      <div className="text-zinc-500 text-[10px] uppercase font-mono">{q.projectType}</div>
                    </td>
                    <td className="px-5 py-4 text-center font-medium text-zinc-200">
                      {q.totalLuminaires} pcs
                    </td>
                    <td className="px-5 py-4 text-center">
                      {q.attachmentPath ? (
                        <span className="inline-flex items-center gap-1 text-white" title={q.attachmentFileName || 'Drawing'}>
                          <Paperclip className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-zinc-700">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {getStatusBadge(q.status)}
                    </td>
                    <td className="px-5 py-4 text-zinc-400 whitespace-nowrap text-[11px]">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => api.downloadQuoteCsv(q.id, q.referenceNumber)}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors inline-block"
                        title="Export to Excel CSV"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        to={`/admin/quotes/${q.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs font-sans transition-colors"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
