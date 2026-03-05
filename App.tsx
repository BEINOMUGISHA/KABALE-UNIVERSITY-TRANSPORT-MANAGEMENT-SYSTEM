
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Booking from './views/Booking';
import Drivers from './views/Drivers';
import Fleet from './views/Fleet';
import Schedules from './views/Schedules';
import Enrollment from './views/Enrollment';
import AdminApplications from './views/AdminApplications';
import Attendance from './views/Attendance';
import Navigation from './views/Navigation';
import AIVisualizer from './views/AIVisualizer';
import Settings from './views/Settings';
import { MOCK_USER, ASSET_PATHS } from './constants';
import { UserRole } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(MOCK_USER);

  // Helper for demo: Role Switching
  const handleRoleSwitch = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'enrollment':
        return <Enrollment />;
      case 'applications':
        return <AdminApplications />;
      case 'booking':
        return <Booking />;
      case 'attendance':
        return <Attendance />;
      case 'drivers':
        return <Drivers />;
      case 'fleet':
        return <Fleet />;
      case 'schedules':
        return <Schedules />;
      case 'navigation':
        return <Navigation />;
      case 'visualizer':
        return <AIVisualizer />;
      case 'settings':
        return <Settings />;
      case 'history':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-black text-slate-800">Your Booking History</h2>
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-6">Date</th>
                      <th className="px-8 py-6">Route</th>
                      <th className="px-8 py-6">Bus</th>
                      <th className="px-8 py-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    <tr>
                      <td className="px-8 py-6 font-bold text-slate-800">May 12, 2024</td>
                      <td className="px-8 py-6 text-slate-600 font-medium">Town → Main Campus</td>
                      <td className="px-8 py-6 font-black text-green-700">UBA 123X</td>
                      <td className="px-8 py-6">
                        <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-8 py-6 font-bold text-slate-800">May 11, 2024</td>
                      <td className="px-8 py-6 text-slate-600 font-medium">Campus → Medical</td>
                      <td className="px-8 py-6 font-black text-green-700">UBB 456Y</td>
                      <td className="px-8 py-6">
                        <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Completed</span>
                      </td>
                    </tr>
                  </tbody>
               </table>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-xl mx-auto glass-card rounded-[3rem] overflow-hidden animate-fadeIn border-none shadow-2xl relative">
            {/* Role Switcher for Demo Purposes */}
            <div className="absolute top-4 right-4 z-20">
               <div className="flex gap-1 bg-white/20 p-1 rounded-xl backdrop-blur-md border border-white/30">
                 {[UserRole.STUDENT, UserRole.ADMIN, UserRole.SECURITY].map(r => (
                   <button 
                    key={r}
                    onClick={() => handleRoleSwitch(r)}
                    className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${currentUser.role === r ? 'bg-white text-slate-900' : 'text-white hover:bg-white/10'}`}
                   >
                     {r.split('_')[0]}
                   </button>
                 ))}
               </div>
            </div>

            <div className="h-40 bg-slate-900 relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
               <div className="absolute -bottom-16 left-12 w-32 h-32 rounded-[2.5rem] border-8 border-slate-50 bg-white shadow-2xl overflow-hidden">
                  <img src={ASSET_PATHS.USER_PROFILE} alt="Profile" className="w-full h-full object-cover" onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/${currentUser.name}/200/200`;
                  }} />
               </div>
            </div>
            <div className="pt-20 px-12 pb-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-800 leading-none">{currentUser.name}</h2>
                  <p className="text-slate-400 font-bold mt-2">{currentUser.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-inner p-1">
                      {/* Dynamic mock QR code based on user ID */}
                      <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full">
                        {Array.from({length: 16}).map((_, i) => (
                          <div key={i} className={`rounded-[1px] ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                        ))}
                      </div>
                   </div>
                   <p className="text-[10px] font-black text-slate-400 text-center mt-2 uppercase">Boarding ID</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</p>
                  <p className="text-lg font-black text-slate-800 uppercase tracking-tighter">{currentUser.role.replace('_', ' ')}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-lg font-black text-slate-800">Verified</p>
                  </div>
                </div>
                {currentUser.registrationNumber && (
                  <div className="space-y-1 col-span-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</p>
                    <p className="text-lg font-black text-slate-800">{currentUser.department}</p>
                  </div>
                )}
              </div>
              
              {currentUser.role === UserRole.STUDENT && (
                <div className="mt-12 p-6 bg-green-50 border border-green-100 rounded-[2rem] text-center shadow-inner">
                  <p className="text-xs font-black text-green-800 uppercase tracking-widest mb-1">Transport Eligibility</p>
                  <p className="text-xl font-black text-green-700">{currentUser.enrollmentStatus === 'APPROVED' ? 'Access Granted' : 'Approval Pending'}</p>
                  <p className="text-[10px] text-green-600 font-bold uppercase tracking-tighter mt-2">Check enrollment tab for details</p>
                </div>
              )}

              <button className="w-full mt-8 py-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100">
                Sign Out
              </button>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} userName={currentUser.name} userRole={currentUser.role}>
      {renderContent()}
    </Layout>
  );
};

export default App;
