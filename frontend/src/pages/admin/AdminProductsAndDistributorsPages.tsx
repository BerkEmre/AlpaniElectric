import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { ProductListItem, Category, DistributorApplication } from '../../types';
import {
  Plus,
  Trash2,
  Search,
  X
} from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New product form
  const [newProd, setNewProd] = useState({
    categoryId: 1,
    code: '',
    name: '',
    shortDescription: '',
    technicalDescription: '',
    mainImageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    ledChipBrand: 'Citizen / Nichia',
    driverBrand: 'Tridonic / Osram DALI-2',
    material: 'Die-Cast AL6063 Aluminum',
    ipRating: 'IP20',
    ikRating: 'IK06',
    cri: 'Ra > 95',
    macAdam: 'SDCM < 3',
    ugr: '< 16',
    isFeatured: false,
    wattage: '24W',
    cct: '3000K',
    beamAngle: '24°',
    bodyColor: 'Matte Black (RAL 9005)',
    controlType: 'DALI-2',
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [prodsData, catsData] = await Promise.all([
        api.getAdminProducts(),
        api.getCategories(),
      ]);
      setProducts(prodsData);
      setCategories(catsData);
      if (catsData.length > 0) {
        setNewProd(prev => ({ ...prev, categoryId: catsData[0].id }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        categoryId: newProd.categoryId,
        code: newProd.code,
        name: newProd.name,
        shortDescription: newProd.shortDescription,
        technicalDescription: newProd.technicalDescription,
        mainImageUrl: newProd.mainImageUrl,
        ledChipBrand: newProd.ledChipBrand,
        driverBrand: newProd.driverBrand,
        material: newProd.material,
        ipRating: newProd.ipRating,
        ikRating: newProd.ikRating,
        cri: newProd.cri,
        macAdam: newProd.macAdam,
        ugr: newProd.ugr,
        isFeatured: newProd.isFeatured,
        variants: [
          {
            skuCode: `${newProd.code}-${newProd.wattage}-${newProd.cct}`,
            wattage: newProd.wattage,
            lumenOutput: '2400 lm',
            cct: newProd.cct,
            beamAngle: newProd.beamAngle,
            bodyColor: newProd.bodyColor,
            controlType: newProd.controlType,
            dimensions: 'Standard Form Factor',
            isDefault: true,
          }
        ]
      };

      await api.createAdminProduct(payload);
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to deactivate this luminaire?')) return;
    try {
      await api.deleteAdminProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-white tracking-tight">Product Catalog Management</h1>
          <p className="text-xs text-zinc-400 font-mono">
            {products.length} technical luminaire models registered in MSSQL database.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Luminaire</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0d0d11] border border-white/[0.08] flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by SKU, series name, or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 pl-9 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white font-mono"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d11] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#121217] text-zinc-400 uppercase tracking-wider text-[10px] border-b border-white/[0.08]">
              <tr>
                <th className="px-5 py-3.5">SKU / Code</th>
                <th className="px-5 py-3.5">Model Name</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Optical Specs</th>
                <th className="px-5 py-3.5">Variants</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-zinc-400">Loading catalog...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-zinc-400">No products found.</td>
                </tr>
              ) : (
                filtered.map(p => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-bold text-white">{p.code}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-white font-sans text-sm">{p.name}</div>
                      <div className="text-zinc-500 line-clamp-1 text-[11px] font-sans">{p.shortDescription}</div>
                    </td>
                    <td className="px-5 py-4 text-zinc-300 font-sans">{p.categoryName}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">{p.cri}</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">{p.ipRating}</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">UGR {p.ugr}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-zinc-400">
                      {p.wattages.length} specs
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 border border-white/10 transition-colors inline-block"
                        title="Deactivate"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#0d0d11] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-lg font-light text-white">Create Architectural Luminaire</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">SKU / Model Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ALP-M48-SLIM60"
                    value={newProd.code}
                    onChange={e => setNewProd({ ...newProd, code: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Category *</label>
                  <select
                    value={newProd.categoryId}
                    onChange={e => setNewProd({ ...newProd, categoryId: parseInt(e.target.value) })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VECTA Micro Accent Spot"
                  value={newProd.name}
                  onChange={e => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newProd.shortDescription}
                  onChange={e => setNewProd({ ...newProd, shortDescription: e.target.value })}
                  className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white resize-none font-sans"
                  placeholder="Architectural executive summary..."
                ></textarea>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Wattage</label>
                  <input
                    type="text"
                    value={newProd.wattage}
                    onChange={e => setNewProd({ ...newProd, wattage: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">CCT</label>
                  <input
                    type="text"
                    value={newProd.cct}
                    onChange={e => setNewProd({ ...newProd, cct: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Beam Angle</label>
                  <input
                    type="text"
                    value={newProd.beamAngle}
                    onChange={e => setNewProd({ ...newProd, beamAngle: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">CRI</label>
                  <input
                    type="text"
                    value={newProd.cri}
                    onChange={e => setNewProd({ ...newProd, cri: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">IP Rating</label>
                  <input
                    type="text"
                    value={newProd.ipRating}
                    onChange={e => setNewProd({ ...newProd, ipRating: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Glare UGR</label>
                  <input
                    type="text"
                    value={newProd.ugr}
                    onChange={e => setNewProd({ ...newProd, ugr: e.target.value })}
                    className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Main Image URL</label>
                <input
                  type="text"
                  value={newProd.mainImageUrl}
                  onChange={e => setNewProd({ ...newProd, mainImageUrl: e.target.value })}
                  className="w-full bg-[#121217] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 font-sans">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider"
                >
                  Save Luminaire
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const AdminDistributorsPage: React.FC = () => {
  const [apps, setApps] = useState<DistributorApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminDistributors();
      setApps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await api.updateDistributorStatus(id, status);
      fetchApps();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-light text-white tracking-tight">International Distributor Inquiries</h1>
        <p className="text-xs text-zinc-400 font-mono">
          Review partnership applications from global architectural lighting distributors.
        </p>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d11] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#121217] text-zinc-400 uppercase tracking-wider text-[10px] border-b border-white/[0.08]">
              <tr>
                <th className="px-5 py-3.5">Company & Contact</th>
                <th className="px-5 py-3.5">Country / City</th>
                <th className="px-5 py-3.5">Turnover</th>
                <th className="px-5 py-3.5">Represented Brands</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-zinc-400">Loading applications...</td>
                </tr>
              ) : apps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-zinc-400">No applications received yet.</td>
                </tr>
              ) : (
                apps.map(app => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-white font-sans text-sm">{app.companyName}</div>
                      <div className="text-zinc-500 text-[11px] font-sans">{app.contactPerson} • {app.email}</div>
                    </td>
                    <td className="px-5 py-4 text-zinc-300 font-sans">
                      {app.country} {app.city ? `(${app.city})` : ''}
                    </td>
                    <td className="px-5 py-4 text-zinc-200">{app.annualTurnover || '—'}</td>
                    <td className="px-5 py-4 text-zinc-400 max-w-xs truncate">{app.currentBrands || '—'}</td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[10px]">
                        {app.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-zinc-500 whitespace-nowrap text-[11px]">
                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <select
                        value={app.status}
                        onChange={e => app.id && handleStatusChange(app.id, e.target.value)}
                        className="bg-[#121217] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-white font-mono"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
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
