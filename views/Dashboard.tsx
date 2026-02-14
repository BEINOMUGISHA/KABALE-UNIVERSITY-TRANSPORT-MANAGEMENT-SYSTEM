
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ICONS, ROUTES, MOCK_USER } from '../constants';
import { getTravelAdvice } from '../services/geminiService';

const data = [
  { name: 'Mon', trips: 2 },
  { name: 'Tue', trips: 4 },
  { name: 'Wed', trips: 3 },
  { name: 'Thu', trips: 5 },
  { name: 'Fri', trips: 2 },
  { name: 'Sat', trips: 1 },
  { name: 'Sun', trips: 0 },
];

const occupancyData = [
  { route: 'Express', load: 85 },
  { route: 'Medical', load: 45 },
  { route: 'Hostel', load: 92 },
  { route: 'Town', load: 60 },
];

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsAiLoading(true);
    const response = await getTravelAdvice(query);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  const KAB_LOGO = "https://www.kab.ac.ug/wp-content/uploads/2021/08/kab-logo.png";

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome & Quick Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white p-3 rounded-[2rem] shadow-xl shadow-green-900/10 border border-slate-50">
            <img src={KAB_LOGO} alt="Kabale University Crest" className="w-full h-full object-contain" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Welcome, <span className="text-green-700">{MOCK_USER.name.split(' ')[0]}</span>! 👋</h1>
            <p className="text-slate-500 mt-2 font-medium max-w-md">KUTS is a free university-wide service. Secure your commute with zero cost.</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
          <button className="px-8 py-4 bg-green-700 text-white rounded-[1.5rem] font-black shadow-2xl shadow-green-900/30 hover:bg-green-800 hover:-translate-y-1 transition-all flex items-center gap-3">
            <ICONS.Bus />
            Book a Ride
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Total Trips', val: '42', icon: ICONS.History, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Upcoming', val: '1 Ride', icon: ICONS.Calendar, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Loyalty Points', val: '1,250', icon: ICONS.Sparkles, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-[2rem] flex items-center gap-4 group hover:shadow-lg transition-all border-none">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border-none">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-slate-800">Commute Analytics</h3>
            <select className="bg-slate-100 border-none rounded-xl text-xs font-bold px-4 py-2 focus:ring-0 cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a5f2b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1a5f2b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}} 
                />
                <Area type="monotone" dataKey="trips" stroke="#1a5f2b" strokeWidth={4} fillOpacity={1} fill="url(#colorTrips)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Assistant Card */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] flex-1 flex flex-col shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full blur-3xl -mr-16 -mt-16 opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-green-500 text-slate-900 rounded-xl flex items-center justify-center">
                <ICONS.Sparkles />
              </div>
              <div>
                <h3 className="font-black text-lg leading-none">KUTS-AI</h3>
                <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest mt-1">Smart Advisor</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-6 space-y-4 max-h-[160px] custom-scrollbar pr-2 relative z-10">
              {aiResponse ? (
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl text-sm leading-relaxed text-slate-100 border border-white/5 shadow-inner">
                  {aiResponse}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-500">
                  <ICONS.Route />
                  <p className="text-xs font-bold italic">Ask me about any campus route...</p>
                </div>
              )}
            </div>

            <form onSubmit={handleAiAsk} className="relative mt-auto z-10">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="How do I get to Makanga?"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-4 px-5 pr-14 text-sm focus:ring-2 focus:ring-green-500 focus:bg-slate-800 text-white placeholder:text-slate-500 transition-all outline-none"
              />
              <button 
                type="submit"
                disabled={isAiLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-green-500 text-slate-900 rounded-xl hover:bg-green-400 transition-all disabled:opacity-50 shadow-lg shadow-green-500/20"
              >
                {isAiLoading ? (
                   <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                ) : (
                  <ICONS.ArrowRight />
                )}
              </button>
            </form>
          </div>

          <div className="glass-card p-8 rounded-[2.5rem] border-none">
            <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
              <ICONS.Bus /> Rush Hour Load
            </h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <Bar dataKey="load" radius={[8, 8, 8, 8]} barSize={40}>
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.load > 80 ? '#ef4444' : '#1a5f2b'} />
                    ))}
                  </Bar>
                  <XAxis dataKey="route" hide />
                  <Tooltip cursor={{fill: 'rgba(26, 95, 43, 0.05)', radius: 8}} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-400 font-bold text-center mt-4">Live capacity metrics updated every 5 mins</p>
          </div>
        </div>
      </div>

      {/* Featured Routes */}
      <div>
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="text-2xl font-black text-slate-800">Featured Campus Routes</h3>
          <button className="text-green-700 font-black text-sm hover:underline flex items-center gap-1 transition-all hover:gap-2">
            Explore All Routes <ICONS.ArrowRight />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROUTES.map((route) => (
            <div key={route.id} className="bg-white rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group border border-slate-50">
              <div className="h-44 bg-slate-200 relative overflow-hidden">
                <img src={`https://picsum.photos/seed/${route.id}/400/300`} alt={route.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                   <div className="bg-green-700 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      FREE SERVICE
                   </div>
                </div>
                <div className="absolute top-4 right-6 bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30 text-white">
                   <ICONS.Bus />
                </div>
              </div>
              <div className="p-8">
                <h4 className="font-black text-xl text-slate-800 mb-3 group-hover:text-green-700 transition-colors">{route.name}</h4>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="truncate">{route.origin} → {route.destination}</p>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-wider">
                     <ICONS.Calendar />
                     <span>Daily Schedules Available</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Duration</p>
                    <p className="text-sm font-black text-slate-700">{route.durationMinutes} mins</p>
                  </div>
                  <button className="p-4 bg-slate-50 text-slate-700 rounded-2xl group-hover:bg-green-700 group-hover:text-white transition-all shadow-sm group-hover:shadow-green-900/20 group-hover:rotate-45">
                    <ICONS.ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
