
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Booking from './views/Booking';
import Drivers from './views/Drivers';
import Fleet from './views/Fleet';
import Settings from './views/Settings';
import Navigation from './views/Navigation';
import AIVisualizer from './views/AIVisualizer';
import { MOCK_USER } from './constants';
import { UserRole } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'booking':
        return <Booking />;
      case 'navigation':
        return <Navigation />;
      case 'visualizer':
        return <AIVisualizer />;
      case 'drivers':
        return <Drivers />;
      case 'fleet':
        return <Fleet />;
      case 'settings':
        return <Settings />;
      case 'enrollment':
        return (
          <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-4">Enrollment</h2>
            <p className="text-slate-500 dark:text-slate-400">Enrollment management coming soon.</p>
          </div>
        );
      case 'history':
        return (
          <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-4">My Bookings</h2>
            <p className="text-slate-500 dark:text-slate-400">Booking history coming soon.</p>
          </div>
        );
      case 'profile':
        return (
          <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-4">Profile</h2>
            <p className="text-slate-500 dark:text-slate-400">User profile management coming soon.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      userName={MOCK_USER.name} 
      userRole={MOCK_USER.role}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
