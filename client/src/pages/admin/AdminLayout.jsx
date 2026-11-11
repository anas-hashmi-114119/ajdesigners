import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { adminUser, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center text-white text-sm font-medium">
        Validating administrative session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Inquiries Manager', path: '/admin/inquiries', icon: Inbox },
    { name: 'Portfolio Projects', path: '/admin/portfolio', icon: Briefcase },
    { name: 'Blog & Insights', path: '/admin/blog', icon: FileText },
    { name: 'Pricing & Retainers', path: '/admin/pricing', icon: DollarSign },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-surface-light flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-navy-900 text-white px-4 py-3 flex items-center justify-between border-b border-white/10 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-electric-500 flex items-center justify-center font-bold text-xs">
            AJ
          </div>
          <span className="font-display font-bold text-sm">AJDesigners Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-charcoal-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy-900 text-white flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-electric-500 to-purple-brand flex items-center justify-center shadow-glow-blue">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-base block text-white">AJDesigners</span>
                <span className="text-[10px] text-charcoal-400 uppercase tracking-widest block">Staff Console</span>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-electric-500 text-white shadow-sm'
                        : 'text-charcoal-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="p-3 rounded-xl bg-navy-800 border border-white/5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-electric-500/20 text-electric-400 flex items-center justify-center font-bold text-xs shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{adminUser?.name || 'Administrator'}</div>
              <div className="text-[10px] text-charcoal-400 truncate">{adminUser?.email}</div>
            </div>
          </div>

          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs text-charcoal-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </span>
            <span className="text-[10px] font-mono text-charcoal-500">live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="hidden lg:flex items-center justify-between bg-white border-b border-charcoal-200/80 px-8 py-4">
          <div className="text-xs text-charcoal-500">
            AJDesigners Administrative Gateway • Connected to Local Database
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-charcoal-700 bg-surface-light border border-charcoal-200 hover:text-navy-900 hover:bg-charcoal-100 transition-colors"
            >
              <span>View Public Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

