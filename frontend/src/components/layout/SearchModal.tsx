import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Layers } from 'lucide-react';
import { api } from '../../services/api';
import { ProductListItem, Category } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [term, setTerm] = useState('');
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      setTerm('');
      setProducts([]);
      return;
    }
    api.getCategories().then(setCategories).catch(() => {});
  }, [isOpen]);

  useEffect(() => {
    if (!term.trim()) {
      setProducts([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.getProducts({ search: term, pageSize: 6 });
        setProducts(res.items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [term]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#0c0c10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative flex items-center px-4 py-3.5 border-b border-white/5">
          <Search className="w-4 h-4 text-zinc-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="Search by luminaire series, SKU (e.g. ALP-M48), or system..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-xs font-mono focus:outline-none"
          />
          {term && (
            <button onClick={() => setTerm('')} className="p-1 hover:text-white text-zinc-400 mr-2">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-zinc-800 text-zinc-400 rounded border border-white/5">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {loading && (
            <div className="text-center py-6 text-xs font-mono text-zinc-400">
              Searching technical catalog...
            </div>
          )}

          {!loading && products.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                Products & Systems
              </div>
              <div className="space-y-1.5">
                {products.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors group text-left border border-transparent hover:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.mainImageUrl}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover bg-zinc-950 border border-white/5"
                      />
                      <div>
                        <div className="text-xs font-medium text-zinc-200 group-hover:text-white transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-500">
                          {p.code} • {p.categoryName}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!term && categories.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                Browse by Category
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      navigate(`/products?category=${c.slug}`);
                      onClose();
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 text-left text-xs font-medium text-zinc-300 hover:text-white transition-colors border border-transparent hover:border-white/5"
                  >
                    <Layers className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!loading && term && products.length === 0 && (
            <div className="text-center py-8 text-xs text-zinc-500 font-mono">
              No matching luminaires found for "{term}".
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex justify-between items-center text-[11px] text-zinc-500 font-mono">
          <span>Alpani Architectural Database</span>
          <button
            onClick={() => {
              navigate('/products');
              onClose();
            }}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
