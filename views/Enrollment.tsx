
import React, { useState } from 'react';
import { ROUTES, ICONS, MOCK_USER } from '../constants';

const Enrollment: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 animate-fadeIn">
        <div className="w-24 h-24 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <ICONS.FileCheck />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-4">Application Submitted!</h2>
        <p className="text-slate-500 mb-8">Your transport enrollment request is being reviewed by the Transport Office. You will receive a notification once approved.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
        >
          View Status
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-800">Transport Enrollment</h1>
        <p className="text-slate-500 mt-2 font-medium">Apply for a semester transport permit. Approval is based on residency and academic schedule.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleApply} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Select Preferred Route</label>
              <div className="grid grid-cols-1 gap-4">
                {ROUTES.map(route => (
                  <label key={route.id} className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedRoute === route.id ? 'border-green-600 bg-green-50 shadow-md' : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                  }`}>
                    <input 
                      type="radio" 
                      name="route" 
                      value={route.id} 
                      className="hidden" 
                      onChange={() => setSelectedRoute(route.id)}
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedRoute === route.id ? 'border-green-600 bg-green-600' : 'border-slate-300'
                    }`}>
                      {selectedRoute === route.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <div>
                       <p className="font-bold text-slate-800">{route.name}</p>
                       <p className="text-xs text-slate-500">{route.origin} to {route.destination}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Priority Justification</label>
              <textarea 
                placeholder="e.g., I reside in Kabale Town and have early 8 AM classes daily."
                className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm focus:ring-2 focus:ring-green-600 transition-all min-h-[120px]"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={!selectedRoute}
              className="w-full py-5 bg-green-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-900/20 hover:bg-green-800 transition-all disabled:opacity-50"
            >
              Submit Application
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h3 className="text-xl font-black mb-6 relative z-10">Application Status</h3>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 text-slate-900 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                  <ICONS.FileCheck />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Standing</p>
                  <p className="font-bold">{MOCK_USER.enrollmentStatus || 'NONE'}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">You must be enrolled to book seats on the university shuttle. Applications are processed within 48 hours.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <h3 className="text-lg font-black text-slate-800 mb-4">Waitlist Info</h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Town Route</span>
                  <span className="text-orange-600 font-black">High Demand</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Medical Shuttle</span>
                  <span className="text-green-600 font-black">Low Demand</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;
