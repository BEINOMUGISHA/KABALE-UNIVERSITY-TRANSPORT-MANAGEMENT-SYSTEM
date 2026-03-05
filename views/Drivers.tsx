
import React, { useState, useEffect } from 'react';
import { kutsStore } from '../services/store';
import { ICONS, SCHEDULES, ROUTES, BUSES, ASSET_PATHS } from '../constants';
import { Driver } from '../types';

const Drivers: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>(kutsStore.getDrivers());

  useEffect(() => {
    const sync = () => setDrivers([...kutsStore.getDrivers()]);
    window.addEventListener('kuts-store-update', sync);
    return () => window.removeEventListener('kuts-store-update', sync);
  }, []);

  const toggleAvailability = async (driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    if (driver) {
      const nextStatus: Driver['status'] = driver.status === 'ACTIVE' ? 'OFF_DUTY' : 'ACTIVE';
      await kutsStore.updateDriverStatus(driverId, nextStatus);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">University Drivers</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage and monitor the team ensuring safe transportation across all campuses.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <button className="flex-1 md:flex-none px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-2">
            <ICONS.FileText /> Shift Roster
          </button>
          <button className="flex-1 md:flex-none px-5 py-3 bg-green-700 text-white rounded-2xl font-bold shadow-lg shadow-green-900/10 hover:bg-green-800 transition-all text-sm flex items-center justify-center gap-2">
            Register New Driver
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map(driver => {
          const assignments = SCHEDULES.filter(s => s.driverId === driver.id);
          const isAvailable = driver.status === 'ACTIVE';
          
          return (
            <div key={driver.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="flex items-start justify-between mb-8">
                <div className="flex gap-5">
                  <div className="relative">
                    <img 
                      src={driver.avatarUrl} 
                      alt={driver.name} 
                      className="w-20 h-20 rounded-[1.5rem] object-cover border-4 border-slate-50 shadow-inner"
                      onError={(e) => {
                        e.currentTarget.src = `https://i.pravatar.cc/150?u=${driver.id}`;
                      }}
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white shadow-sm ${isAvailable ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 leading-tight">{driver.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex text-yellow-500">
                        <ICONS.Star />
                      </div>
                      <span className="text-sm font-black text-slate-700">{driver.rating}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">• Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Toggle Section */}
              <div className="bg-slate-50 p-4 rounded-3xl mb-6 flex items-center justify-between border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</span>
                  <span className={`text-xs font-black uppercase tracking-tighter ${isAvailable ? 'text-green-700' : 'text-slate-500'}`}>
                    {isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}
                  </span>
                </div>
                
                {/* Admin Toggle Switch */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">OFF</span>
                  <button 
                    onClick={() => toggleAvailability(driver.id)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                      isAvailable ? 'bg-green-600' : 'bg-slate-300'
                    }`}
                  >
                    <span className="sr-only">Toggle Availability</span>
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                        isAvailable ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">ON</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">License</p>
                  <p className="text-sm font-black text-slate-800">{driver.licenseNumber}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Phone</p>
                  <p className="text-sm font-black text-slate-800">{driver.phoneNumber.split(' ')[1]}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live Assignment</p>
                {assignments.length > 0 ? (
                  <div className="space-y-3">
                    {assignments.slice(0, 1).map(s => {
                      const route = ROUTES.find(r => r.id === s.routeId);
                      const bus = BUSES.find(b => b.id === s.busId);
                      return (
                        <div key={s.id} className="bg-green-50/50 p-4 rounded-2xl flex items-center justify-between border border-green-100 group-hover:bg-green-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 text-green-700 rounded-xl">
                               <ICONS.Bus />
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-800">{route?.name.split('-')[0]}</p>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{bus?.plateNumber} • {s.departureTime}</p>
                            </div>
                          </div>
                          <div className="p-2 text-green-700 group-hover:translate-x-1 transition-transform">
                             <ICONS.ArrowRight />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                     <p className="text-xs italic text-slate-400 font-medium">Standing by for next shift</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                  <ICONS.Phone /> Call
                </button>
                <button className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                  Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dispatch Log - Accessible to Admins */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-800">Real-time Dispatch Log</h3>
              <p className="text-sm text-slate-500 font-medium">Full view of active driver and vehicle pairings.</p>
            </div>
            <button className="text-green-700 font-black text-sm px-5 py-2.5 bg-green-50 rounded-xl hover:bg-green-100 transition-all">
              Export Log
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest">Route</th>
                  <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest">Bus Info</th>
                  <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest">Driver</th>
                  <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest">Scheduled</th>
                  <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {SCHEDULES.map(schedule => {
                  const route = ROUTES.find(r => r.id === schedule.routeId);
                  const driver = drivers.find(d => d.id === schedule.driverId);
                  const bus = BUSES.find(b => b.id === schedule.busId);
                  return (
                    <tr key={schedule.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-6 pr-4">
                        <p className="text-sm font-black text-slate-800">{route?.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{route?.type}</p>
                      </td>
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-black text-green-700">{bus?.plateNumber}</span>
                           <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">{bus?.model}</span>
                        </div>
                      </td>
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={driver?.avatarUrl} 
                            className="w-8 h-8 rounded-full border border-slate-200" 
                            alt="" 
                            onError={(e) => {
                                e.currentTarget.src = `https://i.pravatar.cc/150?u=${driver?.id}`;
                            }}
                          />
                          <div>
                            <p className="text-sm font-black text-slate-700 leading-none">{driver?.name}</p>
                            <p className={`text-[10px] font-bold uppercase mt-1 ${driver?.status === 'ACTIVE' ? 'text-green-600' : 'text-slate-400'}`}>
                              {driver?.status === 'ACTIVE' ? 'Online' : 'Offline'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4">
                        <p className="text-sm font-black text-slate-900 tabular-nums">{schedule.departureTime}</p>
                      </td>
                      <td className="py-6 pl-4 text-right">
                        <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white rounded-lg hover:bg-green-700 transition-all">
                          Manage
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
