import {
  Category,
  ProductListItem,
  ProductDetail,
  PagedResult,
  Project,
  Catalogue,
  ApplicationArea,
  QuoteDetail,
  QuoteStats,
  DistributorApplication,
  User,
  QuoteItem
} from '../types';

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('alpani_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Public Catalog & Content
  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to load categories');
    return res.json();
  },

  async getProducts(params?: Record<string, string | number | boolean | undefined>): Promise<PagedResult<ProductListItem>> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          query.append(k, String(v));
        }
      });
    }
    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  },

  async getProductBySlug(slug: string): Promise<ProductDetail> {
    const res = await fetch(`${API_BASE}/products/${slug}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  async getProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to load projects');
    return res.json();
  },

  async getProjectBySlug(slug: string): Promise<Project> {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    if (!res.ok) throw new Error('Project not found');
    return res.json();
  },

  async getApplications(): Promise<ApplicationArea[]> {
    const res = await fetch(`${API_BASE}/applications`);
    if (!res.ok) throw new Error('Failed to load application areas');
    return res.json();
  },

  async getCatalogues(): Promise<Catalogue[]> {
    const res = await fetch(`${API_BASE}/catalogues`);
    if (!res.ok) throw new Error('Failed to load catalogues');
    return res.json();
  },

  // Quotes submission
  async submitQuote(formData: FormData): Promise<{ referenceNumber: string; message: string; totalLuminaires: number }> {
    const res = await fetch(`${API_BASE}/quotes`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to submit quote request' }));
      throw new Error(err.message || 'Failed to submit quote request');
    }
    return res.json();
  },

  // Distributor application
  async submitDistributorApplication(data: DistributorApplication): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/distributors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to submit application' }));
      throw new Error(err.message || 'Failed to submit application');
    }
    return res.json();
  },

  // Admin Auth
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Invalid credentials' }));
      throw new Error(err.message || 'Invalid credentials');
    }
    return res.json();
  },

  // Admin Quotes
  async getAdminQuoteStats(): Promise<QuoteStats> {
    const res = await fetch(`${API_BASE}/admin/quotes/stats`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to load quote statistics');
    return res.json();
  },

  async getAdminQuotes(params?: { search?: string; status?: string; page?: number; pageSize?: number }): Promise<PagedResult<QuoteDetail>> {
    const query = new URLSearchParams();
    if (params) {
      if (params.search) query.append('search', params.search);
      if (params.status) query.append('status', params.status);
      if (params.page) query.append('page', String(params.page));
      if (params.pageSize) query.append('pageSize', String(params.pageSize));
    }
    const res = await fetch(`${API_BASE}/admin/quotes?${query.toString()}`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to load quotes');
    return res.json();
  },

  async getAdminQuoteById(id: number): Promise<QuoteDetail> {
    const res = await fetch(`${API_BASE}/admin/quotes/${id}`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to load quote details');
    return res.json();
  },

  async updateAdminQuoteStatus(id: number, status: string, internalAdminNotes?: string): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/admin/quotes/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ status, internalAdminNotes }),
    });
    if (!res.ok) throw new Error('Failed to update quote status');
    return res.json();
  },

  async downloadQuoteCsv(id: number, referenceNumber: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/quotes/${id}/export-csv`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to export CSV');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Alpani_Schedule_${referenceNumber}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  async downloadQuoteAttachment(id: number, fileName: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/quotes/${id}/attachment`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to download project file');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  // Admin Products
  async getAdminProducts(): Promise<ProductListItem[]> {
    const res = await fetch(`${API_BASE}/admin/products`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  },

  async createAdminProduct(data: any): Promise<ProductDetail> {
    const res = await fetch(`${API_BASE}/admin/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  async updateAdminProduct(id: number, data: any): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  async deleteAdminProduct(id: number): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return res.json();
  },

  // Admin Distributors
  async getAdminDistributors(): Promise<DistributorApplication[]> {
    const res = await fetch(`${API_BASE}/admin/distributors`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to load distributors');
    return res.json();
  },

  async updateDistributorStatus(id: number, status: string): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/admin/distributors/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(status),
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  }
};
