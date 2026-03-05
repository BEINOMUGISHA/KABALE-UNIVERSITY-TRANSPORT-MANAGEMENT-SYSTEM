
import React, { useState, useEffect } from 'react';
import { searchNearbyPlaces } from '../services/geminiService';
import { ICONS } from '../constants';

const Navigation: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ text: string, places: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn('Geolocation error:', err)
      );
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    const result = await searchNearbyPlaces(query, location?.lat, location?.lng);
    setResults(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2 flex items-center gap-3">
          <ICONS.Map className="text-blue-600" />
          Smart Navigation
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Find nearby facilities, medical centers, and transport hubs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm sticky top-24">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Search Query</label>
                <div className="relative">
                  <ICONS.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., Hospitals near Kabale..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-green-600 transition-all"
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <ICONS.Search size={18} />
                    Search Places
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {results ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-black text-slate-800 dark:text-white mb-4">AI Recommendations</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{results.text}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.places.map((place, i) => (
                  <a 
                    key={i} 
                    href={place.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                          <ICONS.Map size={20} />
                        </div>
                        <span className="font-black text-slate-800 dark:text-white">{place.title}</span>
                      </div>
                      <ICONS.ArrowRight className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" size={18} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-300">
                <ICONS.Map size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">Ready to Navigate?</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs">Enter a search query to find locations and get verified Google Maps links.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
