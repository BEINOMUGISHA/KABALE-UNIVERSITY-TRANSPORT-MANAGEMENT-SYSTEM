
import React, { useState } from 'react';
import { generateTransportImage } from '../services/geminiService';
import { ICONS } from '../constants';

const AIVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsLoading(true);
    const result = await generateTransportImage(prompt);
    setImage(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2 flex items-center gap-3">
          <ICONS.Image className="text-green-600" />
          AI Transport Visualizer
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Generate conceptual designs for future university transport solutions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Vision Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A futuristic electric shuttle bus for Kabale University with solar panels and ergonomic seating..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-green-600 min-h-[150px] transition-all"
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-green-700 text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-green-800 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <ICONS.Sparkles />
                  Generate Vision
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          {image ? (
            <div className="w-full h-full animate-fadeIn">
              <img src={image} alt="AI Generated Vision" className="w-full h-full object-cover rounded-3xl shadow-2xl" />
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <ICONS.Image size={40} />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Your vision will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIVisualizer;
