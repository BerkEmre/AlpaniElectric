import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuote } from '../../context/QuoteContext';
import { X, Trash2, Plus, Minus, FileText, ArrowRight, ShieldCheck, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const QuoteDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    removeItem,
    updateQuantity,
    updateItemNote,
    clearQuote,
    totalQuantity,
  } = useQuote();

  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D0E11] border-l border-[#27272A] shadow-2xl flex flex-col">
          {/* Header from Google Stitch design */}
          <div className="p-6 border-b border-[#27272A] flex items-center justify-between bg-[#121316]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-[#1f1f23] border border-[#27272A] text-[#E5B86E]">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F8F9FA] tracking-wider uppercase font-mono">
                  SPECIFICATION SCHEDULE
                </h3>
                <p className="text-[11px] text-[#9c8f7f] font-mono mt-0.5">
                  Itemized Luminaire BoQ ({totalQuantity} units)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded text-[#9c8f7f] hover:text-white hover:bg-[#1f1f23] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#121316] border border-[#27272A] flex items-center justify-center text-[#9c8f7f]">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-semibold text-[#F8F9FA] uppercase tracking-wider font-mono">
                  Schedule is empty
                </h4>
                <p className="text-xs text-[#9c8f7f] max-w-xs font-light leading-relaxed">
                  Configure architectural luminaires from our catalog and add them to your schedule for a formal B2B quotation.
                </p>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/products');
                  }}
                  className="mt-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F8F9FA] bg-[#1f1f23] border border-[#27272A] hover:bg-[#292a2d] transition-colors font-mono rounded"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.productId}-${idx}`}
                  className="p-4 rounded bg-[#121316] border border-[#27272A] hover:border-[#d4a359]/60 transition-all space-y-3"
                >
                  <div className="flex gap-3.5 items-start">
                    <img
                      src={item.productImageUrl || 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80'}
                      alt={item.productName}
                      className="w-16 h-16 rounded object-cover bg-[#0D0E11] border border-[#27272A] shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-mono text-xs text-[#F8F9FA] font-semibold leading-tight truncate">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeItem(idx)}
                          className="text-[#9c8f7f] hover:text-red-400 p-0.5 transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-[#9c8f7f]">
                        SKU: <span className="text-[#F8F9FA] font-medium">{item.productCode}</span>
                      </div>

                      {/* Specs badges from Stitch */}
                      <div className="flex flex-wrap gap-1 pt-1 font-mono">
                        {item.wattage && (
                          <span className="bg-[#292a2d] text-[#f2be71] text-[10px] px-1.5 py-0.5 rounded">
                            {item.wattage}
                          </span>
                        )}
                        {item.cct && (
                          <span className="bg-[#292a2d] text-[#F8F9FA] text-[10px] px-1.5 py-0.5 rounded">
                            {item.cct}
                          </span>
                        )}
                        {item.beamAngle && (
                          <span className="bg-[#292a2d] text-[#F8F9FA] text-[10px] px-1.5 py-0.5 rounded">
                            {item.beamAngle}
                          </span>
                        )}
                        {item.controlType && (
                          <span className="bg-[#292a2d] text-[#F8F9FA] text-[10px] px-1.5 py-0.5 rounded">
                            {item.controlType}
                          </span>
                        )}
                        {item.bodyColor && (
                          <span className="bg-[#292a2d] text-[#d3c4b3] text-[10px] px-1.5 py-0.5 rounded">
                            {item.bodyColor}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Specifier Zone / Room Note Box */}
                  <div className="bg-[#0D0E11] border border-[#27272A] rounded p-2.5 flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase text-[#9c8f7f] tracking-wider flex items-center justify-between">
                      <span>Specifier Zone / Room Note</span>
                      <span className="text-[#f2be71] text-[10px]">Editable</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Boardroom Table Cove or Reception Spot..."
                      value={item.itemNote || ''}
                      onChange={e => updateItemNote(idx, e.target.value)}
                      className="bg-transparent text-[#F8F9FA] text-xs focus:outline-none w-full border-b border-transparent focus:border-[#f2be71]/50 transition-colors font-mono"
                    />
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center bg-[#292a2d] rounded px-1.5 py-0.5">
                      <button
                        onClick={() => updateQuantity(idx, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#9c8f7f] hover:text-[#F8F9FA] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs text-[#F8F9FA] font-semibold px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(idx, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#9c8f7f] hover:text-[#F8F9FA] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-mono text-[11px] text-[#94A3B8]">
                      Luminaire Position #{idx + 1}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Bar */}
          {items.length > 0 && (
            <div className="border-t border-[#27272A] p-6 bg-[#0D0E11] flex flex-col gap-4">
              <div className="flex items-center justify-between text-[#9c8f7f] font-mono text-xs pb-1">
                <span className="text-[#F8F9FA] font-medium">Total Specified Units:</span>
                <span className="text-[#f2be71] font-semibold">{totalQuantity} Luminaires & Rails</span>
              </div>

              <div className="bg-[#121316] border border-[#27272A] rounded p-3 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#f2be71] mt-0.5 shrink-0" />
                <p className="text-[11px] text-[#9c8f7f] leading-snug font-light">
                  No upfront payment required. Alpani engineering team provides certified photometric calculation verification and formal B2B tender proposal within 24 hours.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/quote-request');
                }}
                className="w-full py-3.5 px-6 rounded bg-[#f2be71] hover:bg-[#ffddb1] text-[#0D0E11] font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Proceed to Quote & Upload Plans</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/quote-request');
                  }}
                  className="text-[#d3c4b3] hover:text-[#f2be71] transition-colors"
                >
                  Review Schedule
                </button>
                <button
                  onClick={clearQuote}
                  className="text-[#9c8f7f] hover:text-red-400 transition-colors"
                >
                  Clear List
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
