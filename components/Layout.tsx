
import React from 'react';
import { ICONS, UNIVERSITY_COLORS } from '../constants';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userName: string;
  userRole: UserRole;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userName, userRole }) => {
  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.Dashboard, roles: [UserRole.STUDENT, UserRole.STAFF, UserRole.ADMIN, UserRole.TRANSPORT_MANAGER, UserRole.SECURITY] },
    { id: 'enrollment', label: 'Enrollment', icon: ICONS.FileCheck, roles: [UserRole.STUDENT, UserRole.STAFF] },
    { id: 'applications', label: 'Applications', icon: ICONS.FileText, roles: [UserRole.ADMIN, UserRole.TRANSPORT_MANAGER] },
    { id: 'fleet', label: 'Fleet Mgmt', icon: ICONS.Bus, roles: [UserRole.ADMIN, UserRole.TRANSPORT_MANAGER] },
    { id: 'booking', label: 'Book Ride', icon: ICONS.Route, roles: [UserRole.STUDENT, UserRole.STAFF] },
    { id: 'attendance', label: 'Boarding Logs', icon: ICONS.Scanner, roles: [UserRole.ADMIN, UserRole.TRANSPORT_MANAGER, UserRole.SECURITY] },
    { id: 'drivers', label: 'Drivers', icon: ICONS.Users, roles: [UserRole.ADMIN, UserRole.TRANSPORT_MANAGER] },
    { id: 'schedules', label: 'Schedules', icon: ICONS.Calendar, roles: [UserRole.STUDENT, UserRole.STAFF, UserRole.ADMIN, UserRole.TRANSPORT_MANAGER, UserRole.SECURITY] },
    { id: 'history', label: 'My Bookings', icon: ICONS.History, roles: [UserRole.STUDENT, UserRole.STAFF] },
    { id: 'profile', label: 'Profile', icon: ICONS.User, roles: [UserRole.STUDENT, UserRole.STAFF, UserRole.ADMIN, UserRole.TRANSPORT_MANAGER, UserRole.SECURITY] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(userRole));

  const KAB_LOGO = "https://www.kab.ac.ug/wp-content/uploads/2021/08/kab-logo.png";

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-inner">
              <img src={KAB_LOGO} alt="Kabale University Logo" className="object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-white tracking-tight">KUTS</h1>
              <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mt-1">
                {userRole.replace('_', ' ')}
              </p>
            </div>
          </div>
          
          <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-green-700 text-white shadow-lg shadow-green-900/40 translate-x-1' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className={`${activeTab === item.id ? 'text-yellow-400' : ''}`}>
                  <item.icon />
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-green-600 overflow-hidden shadow-lg">
               <img src={`https://picsum.photos/seed/${userName}/40/40`} alt="Avatar" />
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{userName}</p>
              <p className="text-[10px] text-slate-400 truncate uppercase tracking-widest">{userRole}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto scroll-smooth">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md bg-white/90">
          <div className="flex items-center gap-4">
             {/* Mobile Logo */}
             <div className="md:hidden w-10 h-10 bg-white rounded-lg p-1 border border-slate-200">
               <img src={KAB_LOGO} alt="KAB Logo" className="object-contain" />
             </div>
             <h2 className="text-xl font-extrabold text-slate-800 capitalize tracking-tight">{activeTab.replace('-', ' ')}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <ICONS.Search />
              </span>
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-green-600 w-48 xl:w-72 transition-all outline-none"
              />
            </div>
            
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors">
              <ICONS.Bell />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-green-700 font-bold uppercase leading-none mb-1">Session</p>
                <p className="text-xs font-black text-slate-800">Verified</p>
              </div>
              <div className="p-2 bg-green-50 text-green-700 rounded-xl border border-green-100 shadow-sm">
                <ICONS.Sparkles />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      
      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 flex justify-around p-3 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {navItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${
              activeTab === item.id ? 'text-green-700 scale-110' : 'text-slate-400'
            }`}
          >
            <item.icon />
            <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Layout;
