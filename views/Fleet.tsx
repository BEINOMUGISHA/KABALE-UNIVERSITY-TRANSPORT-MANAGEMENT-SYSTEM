
import React, { useState, useEffect } from 'react';
import { kutsStore } from '../services/store';
import { ICONS } from '../constants';
import { Bus } from '../types';

const Fleet: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>(kutsStore.getBuses());
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const sync = () => setBuses([...kutsStore.getBuses()]);
    window.addEventListener('kuts-store-update', sync);
    return () => window.removeEventListener('kuts-store-update', sync);
  }, []);

  const handleUpdateStatus = async (id: string, currentStatus: Bus['status']) => {
    const next: Record<Bus['status'], Bus['status']> = {
      'OPERATIONAL': 'MAINTENANCE',
      'MAINTENANCE': 'BREAKDOWN',
      'BREAKDOWN': 'OPERATIONAL'
    };
    await kutsStore.updateBusStatus(id, next[currentStatus]);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Fleet Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Monitoring {buses.length} university vehicles. Data is persisted to backend.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-3 bg-green-700 text-white rounded-2xl font-bold shadow-lg hover:bg-green-800 transition-all text-sm flex items-center gap-2">
            <ICONS.Settings /> Add Vehicle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {buses.map(bus => (
          <div key={bus.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-2 h-full transition-colors ${
              bus.status === 'OPERATIONAL' ? 'bg-green-500' : bus.status === 'MAINTENANCE' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-50 rounded-2xl text-slate-700">
                <ICONS.Bus />
              </div>
              <button 
                onClick={() => handleUpdateStatus(bus.id, bus.status)}
                className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase transition-colors ${
                  bus.status === 'OPERATIONAL' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                }`}
              >
                {bus.status}
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-800 leading-none">{bus.plateNumber}</h3>
              <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">{bus.model}</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-400 uppercase tracking-widest">Fuel Level</span>
                  <span className={`${bus.fuelLevel < 30 ? 'text-red-600' : 'text-slate-700'}`}>{bus.fuelLevel}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      bus.fuelLevel < 30 ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${bus.fuelLevel}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="text-center px-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Seats</p>
                  <p className="text-sm font-black text-slate-800">{bus.capacity}</p>
                </div>
                <div className="text-center px-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Health</p>
                  <p className="text-sm font-black text-slate-800">{bus.status === 'OPERATIONAL' ? 'Good' : 'Critical'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
