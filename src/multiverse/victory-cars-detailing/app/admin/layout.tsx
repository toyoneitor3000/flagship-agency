'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  BarChart3, 
  Users, 
  Image as ImageIcon, 
  Megaphone, 
  Lock, 
  LogOut, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Menu,
  X,
  Sparkles,
  KanbanSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Target
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to false for mobile
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [isMetaConnected, setIsMetaConnected] = useState(false);

  // Check auth and connection states on mount
  useEffect(() => {
    const token = localStorage.getItem('victory_admin_token');
    
    // Call validation check API or simulate
    const checkState = async () => {
      // Check Firebase
      const fbConfigured = !!(
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      );
      setIsFirebaseConnected(fbConfigured);

      // Check Meta Ads (Mock or Real)
      try {
        const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};
        const res = await fetch('/api/meta/insights', { headers });
        
        if (res.status === 401) {
          setIsAuthenticated(false);
          // If the page isn't loading due to auth, let's keep login gate active
        } else {
          setIsAuthenticated(true);
          // Determine if Meta is fully configured based on response headers or local check
          const resData = await res.json();
          setIsMetaConnected(!resData.isMock);
        }
      } catch (err) {
        // Fallback to true if server doesn't respond or no password is set
        setIsAuthenticated(true);
      }
    };

    checkState();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    try {
      const res = await fetch('/api/meta/insights', {
        headers: { 'Authorization': `Bearer ${password}` }
      });

      if (res.ok) {
        localStorage.setItem('victory_admin_token', password);
        setIsAuthenticated(true);
        const data = await res.json();
        setIsMetaConnected(!data.isMock);
      } else {
        setAuthError('Contraseña incorrecta. Inténtalo de nuevo.');
      }
    } catch (err) {
      setAuthError('Error conectando con el servidor.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('victory_admin_token');
    setIsAuthenticated(false);
    router.push('/admin');
  };

  const navItems = [
    { name: 'Dashboard Único', path: '/admin', icon: BarChart3 },
    { name: 'Plan de Marketing', path: '/admin/marketing-plan', icon: KanbanSquare },
    { name: 'Estudio y KPIs', path: '/admin/market-study', icon: Target },
    { name: 'Clientes & Kanban', path: '/admin/leads', icon: Users },
  ];

  // Auth Gate UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-apple-bg flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Glow effect background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent-blue/10 rounded-full blur-3xl" />

        <div className="w-full max-w-md bg-white shadow-sm border border-apple-border p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-apple-blue to-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-apple-blue/20 mb-4">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-apple-text tracking-wide">Victory Cars Detailing</h1>
            <p className="text-apple-subtext text-sm mt-1">Panel de Administración & CRM</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-apple-subtext text-sm font-medium mb-2">Contraseña de Administrador</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce la contraseña"
                  className="w-full bg-apple-bg border border-apple-border text-apple-text placeholder-brand-slate px-4 py-3 pl-11 rounded-full focus:border-apple-blue focus:ring-1 focus:ring-apple-blue outline-none transition-all"
                  required
                />
                <Lock className="w-5 h-5 text-apple-subtext absolute left-4 top-3.5" />
              </div>
              {authError && (
                <p className="text-apple-blue text-xs mt-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-apple-blue to-blue-600 hover:from-apple-blue hover:to-blue-600 text-white font-semibold py-3 rounded-full shadow-lg shadow-apple-blue/10 active:scale-[0.98] transition-all"
            >
              Ingresar al Panel
            </button>
          </form>

          <p className="text-apple-subtext text-xs text-center mt-8">
            Si no has configurado una contraseña en tu archivo `.env`, introduce cualquier valor para ingresar en modo de simulación.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-apple-bg text-apple-text flex font-sans">
      {/* Sidebar navigation */}
      <aside 
        className={`bg-white border-r border-apple-border/80 fixed inset-y-0 left-0 z-30 transform transition-all duration-300 lg:static flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Brand Header */}
        <div className={`h-20 border-b border-apple-border/80 flex items-center relative ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between px-6'}`}>
          {!isSidebarCollapsed ? (
            <Link href="/admin" className="flex items-center">
              <div className="relative h-10 w-36">
                <Image 
                  src="/logo.png" 
                  alt="Victory Cars" 
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left' }}
                  className="brightness-0 opacity-90"
                  priority
                />
              </div>
            </Link>
          ) : (
            <Link href="/admin" className="flex items-center justify-center w-full" title="Victory Cars">
              <div className="w-10 h-10 bg-gradient-to-tr from-apple-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-apple-blue/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </Link>
          )}
          <button onClick={() => setIsSidebarOpen(false)} className={`lg:hidden text-apple-subtext hover:text-apple-text absolute ${isSidebarCollapsed ? 'right-2' : 'right-4'}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav className={`flex-1 py-6 space-y-1.5 overflow-y-auto ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.path}
                title={isSidebarCollapsed ? item.name : ''}
                className={`flex items-center py-3 rounded-xl text-sm font-medium transition-all group relative ${
                  isSidebarCollapsed ? 'justify-center px-0' : 'space-x-3 px-4'
                } ${
                  isActive 
                    ? `bg-gradient-to-r from-apple-blue/15 to-blue-600/5 text-apple-text border-l-2 border-apple-blue ${isSidebarCollapsed ? '' : 'pl-3.5'}` 
                    : 'text-apple-subtext hover:bg-white/50 hover:text-apple-text'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-apple-blue' : 'text-apple-subtext group-hover:text-apple-subtext'}`} />
                {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t border-apple-border/80 bg-white/50 flex flex-col space-y-4 ${isSidebarCollapsed ? 'items-center px-2' : ''}`}>
          {/* Service Connections statuses */}
          {!isSidebarCollapsed && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-apple-subtext truncate pr-2">Firebase DB</span>
                {isFirebaseConnected ? (
                  <span className="text-emerald-500 flex items-center font-medium whitespace-nowrap">
                    <CheckCircle className="w-3 h-3 mr-1" /> Conectado
                  </span>
                ) : (
                  <span className="text-amber-500 flex items-center font-medium whitespace-nowrap">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Mock Local
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-apple-subtext truncate pr-2">Meta API</span>
                {isMetaConnected ? (
                  <span className="text-emerald-500 flex items-center font-medium whitespace-nowrap">
                    <CheckCircle className="w-3 h-3 mr-1" /> Conectado
                  </span>
                ) : (
                  <span className="text-amber-500 flex items-center font-medium whitespace-nowrap">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Simulado
                  </span>
                )}
              </div>
            </div>
          )}

          <button 
            onClick={handleLogout}
            title={isSidebarCollapsed ? "Cerrar Sesión" : ""}
            className={`flex items-center justify-center bg-apple-bg hover:bg-red-950/20 text-apple-subtext hover:text-apple-blue py-2.5 rounded-xl border border-apple-border hover:border-red-900/30 font-semibold transition-all active:scale-[0.98] ${isSidebarCollapsed ? 'w-10 h-10 p-0' : 'w-full space-x-2 text-xs rounded-full'}`}
          >
            <LogOut className={`w-4 h-4 ${isSidebarCollapsed ? 'm-0' : ''}`} />
            {!isSidebarCollapsed && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Page Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden relative">
        {/* Top Navbar */}
        <header className="h-20 bg-white/40 backdrop-blur-2xl border-b border-apple-border/50 px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-apple-subtext hover:text-apple-text p-1 hover:bg-white rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex text-apple-subtext hover:text-apple-text p-1 hover:bg-white rounded-lg transition-colors"
              title={isSidebarCollapsed ? "Expandir Menú" : "Colapsar Menú"}
            >
              {isSidebarCollapsed ? <PanelLeftOpen className="w-6 h-6" /> : <PanelLeftClose className="w-6 h-6" />}
            </button>
            <h2 className="text-lg font-semibold text-apple-text tracking-wide">
              {navItems.find(item => item.path === pathname)?.name || 'Panel de Control'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Status alerts */}
            {(!isFirebaseConnected || !isMetaConnected) && (
              <div className="hidden sm:flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full text-amber-400 text-xs">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Simulador Activo: Guarda credenciales en `.env` para producción.</span>
              </div>
            )}
            
            <div className="w-10 h-10 rounded-full bg-white border border-apple-border flex items-center justify-center text-apple-subtext font-bold text-sm cursor-pointer hover:border-apple-border transition-colors">
              VC
            </div>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
