
import React, { useState } from 'react';
import { MOCK_BOARDING_LOGS, ICONS, SCHEDULES, BUSES } from '../constants';

const Attendance: React.FC = () => {
  const [logs, setLogs] = useState(MOCK_BOARDING_LOGS);
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newLog = {
        id: 'l' + (logs.length + 1),
        userId: 'u' + (logs.length + 10),
        scheduleId: 's1',
        boardingTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        location: 'Kikungiri Crossing'
      };
      setLogs([newLog, ...logs]);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Boarding & Attendance</h1>
          <p className="text-slate-500 mt-1 font-medium">Real-time check-in logs for university transport monitoring.</p>
        </div>
        <button 
          onClick={simulateScan}
          disabled={isScanning}
          className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          {isScanning ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <ICONS.Scanner />
          )}
          {isScanning ? 'Scanning...' : 'Open QR Scanner'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-800">Recent Boarding Logs</h3>
            <div className="flex items-center gap-2 text-xs font-black text-green-700 bg-green-50 px-3 py-1 rounded-full">
               <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
               Live Feed
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Student</th>
                  <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Time</th>
                  <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Location</th>
                  <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.map(log => (
                  <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors animate-fadeIn">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                           {log.userId}
                        </div>
                        <p className="text-sm font-black text-slate-800">Student ID {log.userId}</p>
                      </div>
                    </td>
                    <td className="py-5 text-sm font-bold text-slate-500 tabular-nums">{log.boardingTime}</td>
                    <td className="py-5 text-sm font-medium text-slate-600">{log.location}</td>
                    <td className="py-5">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-700 px-3 py-1 rounded-full">Validated</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-24 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h3 className="text-xl font-black mb-8 relative z-10">System Stats</h3>
            <div className="space-y-8 relative z-10">
              <div className="flex justify-between items-center">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Today's Boardings</p>
                 <p className="text-2xl font-black">1,402</p>
              </div>
              <div className="flex justify-between items-center">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Peak Load Time</p>
                 <p className="text-2xl font-black text-yellow-500">07:45 AM</p>
              </div>
              <div className="pt-8 border-t border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Load by Campus</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>Main Campus</span>
                    <span>72%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[72%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                <ICONS.Bus /> Active Shuttles
             </h3>
             <div className="space-y-4">
                {SCHEDULES.slice(0, 3).map(s => {
                  const bus = BUSES.find(b => b.id === s.busId);
                  return (
                    <div key={s.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                       <span className="text-xs font-black text-slate-800">{bus?.plateNumber}</span>
                       <span className="text-[10px] font-bold text-green-700 uppercase">{s.status}</span>
                    </div>
                  );
                })}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
