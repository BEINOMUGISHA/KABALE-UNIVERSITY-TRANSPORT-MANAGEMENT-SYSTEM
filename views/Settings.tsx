
import React from 'react';
import { ICONS } from '../constants';
import { useTheme } from '../services/themeContext';

const Settings: React.FC = () => {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Customize your KUTS experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6 flex items-center gap-2">
            <ICONS.Sparkles />
            Appearance
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 dark:text-white">Theme Mode</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Switch between light and dark themes.</p>
              </div>
              <button 
                onClick={toggleTheme}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-green-600 transition-colors focus:outline-none"
              >
                <span className={`${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setTheme('light')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${theme === 'light' ? 'border-green-600 bg-green-50 dark:bg-green-900/20' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'}`}
              >
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${theme === 'light' ? 'text-green-700 dark:text-green-400' : 'text-slate-400'}`}>Light</span>
              </button>

              <button 
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${theme === 'dark' ? 'border-green-600 bg-green-50 dark:bg-green-900/20' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'}`}
              >
                <div className="w-10 h-10 bg-slate-900 rounded-xl shadow-sm flex items-center justify-center text-blue-400">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-green-700 dark:text-green-400' : 'text-slate-400'}`}>Dark</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
