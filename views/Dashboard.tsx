
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ICONS, ASSET_PATHS } from '../constants';
import { kutsStore } from '../services/store';
import { getTravelAdvice } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [stats, setStats] = useState(kutsStore.getStats());

  useEffect(() => {
    const sync = () => setStats(kutsStore.getStats());
    window.addEventListener('kuts-store-update', sync);
    return () => window.removeEventListener('kuts-store-update', sync);
  }, []);

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsAiLoading(true);
    const contextStr = `Store State: ${JSON.stringify({ 
      fleet: kutsStore.getBuses().length, 
      activeBookings: kutsStore.getBookings().length 
    })}`;
    const response = await getTravelAdvice(`${contextStr}\n\nUser Question: ${query}`);
    setAiResponse(response || "I couldn't generate a response.");
    setIsAiLoading(false);
  };

  const occupancyData = [
    { route: 'Town', load: Math.floor(Math.random() * 30) + 60 },
    { route: 'Medical', load: Math.floor(Math.random() * 20) + 40 },
    { route: 'Hostel', load: Math.floor(Math.random() * 10) + 85 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 dark:bg-green-900/10 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 relative z-10">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-white dark:bg-slate-800 p-2 md:p-3 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-green-900/10 border border-slate-50 dark:border-slate-700 flex items-center justify-center">
            <img src={ASSET_PATHS.LOGO} alt="Logo" className="w-full object-contain" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">KUTS <span className="text-green-700 dark:text-green-400">Central</span></h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 md:mt-2 font-medium text-sm md:text-base">Real-time Backend Synchronized Dashboard for Commuters and Ops.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Fleet', val: stats.totalBuses, icon: ICONS.Bus, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'System Health', val: `${stats.totalBuses > 0 ? Math.round((stats.operationalBuses / stats.totalBuses) * 100) : 0}%`, icon: ICONS.Sparkles, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Total Bookings', val: stats.totalBookings, icon: ICONS.History, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Avg Fuel', val: `${Math.round(stats.avgFuel)}%`, icon: ICONS.Settings, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] flex items-center gap-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} dark:bg-opacity-10`}>
              <stat.icon />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white tabular-nums">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-slate-800 dark:text-white">Route Efficiency</h3>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Live Feed</span>
            </div>
          </div>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="route" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: 'rgba(26, 95, 43, 0.05)', radius: 8}} />
                  <Bar dataKey="load" radius={[12, 12, 12, 12]} barSize={60}>
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.load > 85 ? '#ef4444' : '#1a5f2b'} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full blur-3xl -mr-16 -mt-16 opacity-20"></div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 bg-green-500 text-slate-900 rounded-xl flex items-center justify-center">
              <ICONS.Sparkles />
            </div>
            <h3 className="font-black text-lg">Backend Assistant</h3>
          </div>
          
          <div className="flex-1 min-h-[120px] mb-6 relative z-10 text-sm leading-relaxed text-slate-300">
            {aiResponse ? (
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 animate-fadeIn">
                {aiResponse}
              </div>
            ) : (
              <p className="italic text-slate-500">How can I help you manage the transport system today?</p>
            )}
          </div>

          <form onSubmit={handleAiAsk} className="relative z-10">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="System status report..."
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-5 pr-14 text-sm text-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
            <button 
              type="submit"
              disabled={isAiLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-green-500 text-slate-900 rounded-xl hover:bg-green-400 transition-all disabled:opacity-50"
            >
              {isAiLoading ? <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div> : <ICONS.ArrowRight />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
