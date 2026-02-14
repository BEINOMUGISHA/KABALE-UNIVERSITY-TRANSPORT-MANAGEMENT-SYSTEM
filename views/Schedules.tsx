
import React, { useState, useEffect } from 'react';
import { SCHEDULES as INITIAL_SCHEDULES, ROUTES, ICONS, DRIVERS, BUSES } from '../constants';
import { Schedule } from '../types';

const Schedules: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'MORNING' | 'EVENING' | 'CIRCULAR'>('ALL');
  const [liveSchedules, setLiveSchedules] = useState<Schedule[]>(INITIAL_SCHEDULES);

  // Simulation effect for "real-time" updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSchedules(prev => prev.map(schedule => {
        // Randomly simulate seat filling
        let newSeats = schedule.availableSeats;
        if (Math.random() > 0.85 && newSeats > 0) {
          newSeats -= 1;
        }

        // Randomly simulate delays or departures
        let newStatus = schedule.status;
        if (Math.random() > 0.95 && newStatus === 'ON_TIME') {
          // This is a simple sim, in reality it would be time-based
          newStatus = Math.random() > 0.5 ? 'DELAYED' : 'DEPARTED';
        }

        return {
          ...schedule,
          availableSeats: newSeats,
          status: newStatus
        };
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredRoutes = filter === 'ALL' 
    ? ROUTES 
    : ROUTES.filter(r => r.type === filter);

  // Helper to determine "Live" progress for a bus
  const getLiveProgress = (schedule: Schedule) => {
    if (schedule.status !== 'DEPARTED') return null;
    // For simulation, we'll just say it's at a random stop or "En Route"
    const route = ROUTES.find(r => r.id === schedule.routeId);
    if (!route) return null;
    return "En Route - Approaching " + route.stops[1].name;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <h1 className="text-3xl font-black text-slate-800">Route Timetables</h1>
             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-100 text-green-700 rounded-md">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-wider">Live</span>
             </div>
          </div>
          <p className="text-slate-500 font-medium">Semester-based transport schedules for all Kabale University campuses.</p>
        </div>
        <div className="flex p-1 bg-slate-100 rounded-2xl">
          {['ALL', 'MORNING', 'EVENING', 'CIRCULAR'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all uppercase tracking-widest ${
                filter === f ? 'bg-white text-green-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        {filteredRoutes.map((route) => (
          <div key={route.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 text-green-700 rounded-2xl">
                  <ICONS.Route />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 leading-none">{route.name}</h3>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{route.type} • {route.origin} to {route.destination}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-slate-700 font-black text-sm px-4 py-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2">
                   <ICONS.FileText /> Route Map
                </button>
                <button className="text-green-700 font-black text-sm px-6 py-2 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  Download PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Route Stops Timeline */}
              <div className="space-y-6">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">Pickup Points</h4>
                <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {route.stops.map((stop, i) => (
                    <div key={stop.id} className="relative group">
                      <div className={`absolute -left-8 w-6 h-6 rounded-full border-4 border-white shadow-md z-10 transition-all duration-500 ${
                        i === 0 ? 'bg-green-500' : i === route.stops.length - 1 ? 'bg-red-500' : 'bg-slate-300'
                      }`}></div>
                      <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform">
                        <div>
                          <p className="font-black text-slate-800">{stop.name}</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Stop {i + 1}</p>
                        </div>
                        <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg tabular-nums">
                          {stop.estimatedArrivalTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Active Schedules */}
              <div className="space-y-6">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">Active Trips Today</h4>
                <div className="space-y-4">
                  {liveSchedules.filter(s => s.routeId === route.id).map(s => {
                    const driver = DRIVERS.find(d => d.id === s.driverId);
                    const bus = BUSES.find(b => b.id === s.busId);
                    const progress = getLiveProgress(s);
                    
                    return (
                      <div key={s.id} className="p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="text-center bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm min-w-[64px]">
                                <p className="text-lg font-black text-slate-800 leading-none tabular-nums">{s.departureTime}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Dep</p>
                             </div>
                             <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-black text-slate-800">{bus?.plateNumber}</p>
                                  {s.status === 'DEPARTED' && (
                                    <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 font-medium">{driver?.name} • <span className="tabular-nums font-bold text-slate-700">{s.availableSeats}</span> seats left</p>
                             </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase transition-colors duration-500 ${
                            s.status === 'ON_TIME' ? 'bg-green-100 text-green-700' : 
                            s.status === 'DELAYED' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {s.status.replace('_', ' ')}
                          </div>
                        </div>
                        
                        {progress && (
                          <div className="pt-3 border-t border-slate-200/50 flex flex-col gap-2 animate-pulse">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                               <span className="text-blue-600">Live Tracker</span>
                               <span className="text-slate-400">{progress}</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                               <div className="h-full bg-blue-500 w-1/3 rounded-full"></div>
                            </div>
                          </div>
                        )}

                        {s.status === 'ON_TIME' && s.availableSeats < 10 && (
                          <div className="text-[10px] font-bold text-red-500 bg-red-50 px-3 py-1 rounded-lg flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                             Hurry! Seats are filling fast.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedules;
