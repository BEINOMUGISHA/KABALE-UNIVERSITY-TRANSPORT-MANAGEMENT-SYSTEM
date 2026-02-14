
import React from 'react';
import { BUSES, ICONS } from '../constants';

const Fleet: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Fleet Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Monitoring {BUSES.length} university vehicles across all campuses.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all text-sm flex items-center gap-2">
            <ICONS.FileText /> Maintenance Logs
          </button>
          <button className="px-5 py-3 bg-green-700 text-white rounded-2xl font-bold shadow-lg shadow-green-900/10 hover:bg-green-800 transition-all text-sm flex items-center gap-2">
            <ICONS.Settings /> Add Vehicle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BUSES.map(bus => (
          <div key={bus.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-2 h-full ${
              bus.status === 'OPERATIONAL' ? 'bg-green-500' : bus.status === 'MAINTENANCE' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-50 rounded-2xl text-slate-700 group-hover:bg-green-50 group-hover:text-green-700 transition-colors">
                <ICONS.Bus />
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                bus.status === 'OPERATIONAL' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
              }`}>
                {bus.status}
              </div>
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
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Service</p>
                  <p className="text-sm font-black text-slate-800">12d ago</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
              Manage Fleet
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
           <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
             <ICONS.Wrench /> Maintenance Schedule
           </h3>
           <div className="space-y-4">
             {[
               { plate: 'UBB 456Y', task: 'Engine Oil Replacement', date: 'In 2 days', type: 'ROUTINE' },
               { plate: 'UBA 123X', task: 'Tyre Rotation', date: 'In 5 days', type: 'URGENT' },
               { plate: 'UBC 789Z', task: 'Brake Pad Check', date: 'Next Week', type: 'ROUTINE' },
             ].map((task, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                 <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${task.type === 'URGENT' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      <ICONS.Settings />
                    </div>
                    <div>
                       <p className="text-sm font-black text-slate-800">{task.task}</p>
                       <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{task.plate} • {task.date}</p>
                    </div>
                 </div>
                 <button className="text-green-700 font-black text-sm hover:underline">Schedule</button>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-20 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <h3 className="text-xl font-black mb-6 relative z-10">Fuel Consumption Trends</h3>
          <div className="space-y-6 relative z-10">
            <div className="flex items-end gap-2">
               <span className="text-4xl font-black">2.4k</span>
               <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Litres / Month</span>
            </div>
            <div className="flex gap-2 h-32 items-end">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-green-500/20 rounded-t-lg relative group/bar">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-t-lg transition-all duration-1000"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fleet;
