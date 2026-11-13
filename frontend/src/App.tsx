import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuoteProvider } from './context/QuoteContext';
import { AuthProvider } from './context/AuthContext';
import './i18n';

// Public Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { QuoteDrawer } from './components/layout/QuoteDrawer';
import { SearchModal } from './components/layout/SearchModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { QuoteRequestPage } from './pages/QuoteRequestPage';
import { ProjectsPage, ProjectDetailPage } from './pages/ProjectsPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { CustomSolutionsPage, BecomeDistributorPage } from './pages/CustomSolutionsAndDistributorPages';
import { CompanyPage, ContactPage } from './pages/CompanyAndContactPages';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminQuotesPage } from './pages/admin/AdminQuotesPage';
import { AdminQuoteDetailPage } from './pages/admin/AdminQuoteDetailPage';
import { AdminProductsPage, AdminDistributorsPage } from './pages/admin/AdminProductsAndDistributorsPages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 mins
    },
  },
});

const AppLayout: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0d11]">
      {!isAdminRoute && (
        <>
          <Header onOpenSearch={() => setIsSearchOpen(true)} />
          <QuoteDrawer />
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
      )}

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:categorySlug" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/quote-request" element={<QuoteRequestPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/custom-solutions" element={<CustomSolutionsPage />} />
          <Route path="/become-distributor" element={<BecomeDistributorPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Console */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminQuotesPage />} />
            <Route path="quotes" element={<AdminQuotesPage />} />
            <Route path="quotes/:id" element={<AdminQuoteDetailPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="distributors" element={<AdminDistributorsPage />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <QuoteProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </QuoteProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
