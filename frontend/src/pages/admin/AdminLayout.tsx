import React from 'react';
import { Link, Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FileSpreadsheet,
  Layers,
  Building2,
  LogOut,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    {
      label: 'Quotes & Schedules',
      path: '/admin/quotes',
      icon: FileSpreadsheet,
    },
    {
      label: 'Product Catalog',
      path: '/admin/products',
      icon: Layers,
    },
    {
      label: 'Distributors',
      path: '/admin/distributors',
      icon: Building2,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0d0d11] border-r border-white/[0.08] p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo & Portal Identity */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black text-sm tracking-tight">
              A
            </div>
            <div>
              <span className="text-sm font-medium text-white tracking-wider block">
                ALPANI
              </span>
              <span className="block text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                B2B Console
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-6 border-t border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white font-mono text-xs">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-zinc-200 truncate">
                {user?.fullName || 'Administrator'}
              </div>
              <div className="text-[10px] font-mono text-zinc-400 truncate">
                {user?.email}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Storefront</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden p-6 sm:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};
