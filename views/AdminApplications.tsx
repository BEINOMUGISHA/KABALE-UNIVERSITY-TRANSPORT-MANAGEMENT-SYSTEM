
import React, { useState } from 'react';
import { MOCK_ENROLLMENTS, ROUTES, ICONS } from '../constants';

const AdminApplications: React.FC = () => {
  const [apps, setApps] = useState(MOCK_ENROLLMENTS);

  const handleAction = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Enrollment Applications</h1>
          <p className="text-slate-500 mt-1 font-medium">Review and approve student requests for the current semester transport package.</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
           <button className="px-4 py-2 bg-white text-green-700 rounded-xl text-xs font-black shadow-sm uppercase tracking-widest">Pending ({apps.filter(a => a.status === 'PENDING').length})</button>
           <button className="px-4 py-2 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest">All History</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {apps.filter(a => a.status === 'PENDING').map(app => {
          const route = ROUTES.find(r => r.id === app.routeId);
          return (
            <div key={app.id} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-10 hover:shadow-xl transition-all group">
               <div className="flex items-center gap-8 flex-1">
                 <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-green-50 group-hover:text-green-700 group-hover:border-green-100 transition-colors">
                    <ICONS.User />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-800 leading-tight">Student ID: {app.userId}</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Applied on {app.appliedDate}</p>
                    <div className="mt-4 flex items-center gap-3">
                       <span className="p-1.5 bg-blue-50 text-blue-700 rounded-lg"><ICONS.Route /></span>
                       <span className="text-sm font-black text-slate-700">{route?.name}</span>
                    </div>
                 </div>
               </div>

               <div className="flex-1 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Priority Justification</p>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed italic">"{app.priorityReason}"</p>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <button 
                    onClick={() => handleAction(app.id, 'REJECTED')}
                    className="flex-1 px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => handleAction(app.id, 'APPROVED')}
                    className="flex-1 px-8 py-4 bg-green-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-900/10 hover:bg-green-800 transition-all"
                  >
                    Approve
                  </button>
               </div>
            </div>
          );
        })}
        {apps.filter(a => a.status === 'PENDING').length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
             <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <ICONS.FileCheck />
             </div>
             <p className="text-slate-500 font-bold">No pending applications to review.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
