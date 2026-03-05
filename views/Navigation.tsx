
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';
import { searchNearbyPlaces } from '../services/geminiService';
import Markdown from 'react-markdown';

const Navigation: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ text: string | undefined, grounding: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Geolocation failed, using default Kabale coordinates.");
        }
      );
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    const response = await searchNearbyPlaces(query, location || undefined);
    setResults(response);
    setIsLoading(false);
  };

  const quickSearches = [
    "Restaurants near Kabale University",
    "Bus stops in Kabale town",
    "Hospitals near Makanga campus",
    "Hotels in Kabale for visiting staff"
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Smart Navigation</h1>
        <p className="text-slate-500 font-medium">Find essential services and locations around Kabale University campuses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <ICONS.Search />
              Explore Nearby
            </h3>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 pr-12 text-sm outline-none focus:ring-2 focus:ring-green-600 transition-all"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50"
                >
                  {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <ICONS.ArrowRight />}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Search</p>
              <div className="flex flex-wrap gap-2">
                {quickSearches.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(s)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold text-slate-600 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-green-700 text-white p-8 rounded-[2.5rem] shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h3 className="font-black text-lg mb-2 relative z-10">Location Services</h3>
            <p className="text-green-100 text-sm mb-6 relative z-10">Using real-time Google Maps grounding to provide accurate local information.</p>
            <div className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/10">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <ICONS.Map />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Current Region</p>
                <p className="text-sm font-bold">Kabale, Uganda</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {results ? (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-fadeIn">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-xl font-black text-slate-800">Search Results</h3>
              </div>
              
              <div className="p-8">
                <div className="prose prose-slate max-w-none mb-10">
                  <Markdown>{results.text || ""}</Markdown>
                </div>

                {results.grounding && results.grounding.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Locations (Google Maps)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.grounding.map((chunk: any, i: number) => {
                        if (chunk.maps) {
                          return (
                            <a 
                              key={i}
                              href={chunk.maps.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-green-50 hover:border-green-100 transition-all group"
                            >
                              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                <ICONS.Map />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-slate-800 truncate">{chunk.maps.title}</p>
                                <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest">View on Maps</p>
                              </div>
                              <ICONS.ArrowRight />
                            </a>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <ICONS.Map />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Ready to Navigate</h3>
              <p className="max-w-xs text-sm font-medium">Search for places around Kabale to see detailed information and map links.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
