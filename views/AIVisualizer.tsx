
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { generateTransportImage } from '../services/geminiService';

const AIVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = await generateTransportImage(prompt);
      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        setError("Failed to generate image. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during generation.");
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "A futuristic Kabale University bus driving through green hills",
    "A modern bus stop at Kikungiri campus with students",
    "A high-tech transport control room for university fleet",
    "A scenic view of Kabale town with a university shuttle"
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl font-black text-slate-800 mb-2">AI Transport Visualizer</h1>
        <p className="text-slate-500 font-medium">Use Gemini to visualize the future of Kabale University transportation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <ICONS.Sparkles />
              Generate Concept
            </h3>
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe a transport concept (e.g., 'A solar-powered university bus at Makanga campus')..."
                className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-green-600 transition-all resize-none"
              />
              
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <ICONS.Image />
                    Generate Image
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-sm">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Quick Suggestions</h3>
            <div className="space-y-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(s)}
                  className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium transition-all border border-white/5"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[400px] flex items-center justify-center relative overflow-hidden">
          {generatedImage ? (
            <div className="w-full h-full animate-fadeIn">
              <img 
                src={generatedImage} 
                alt="Generated Concept" 
                className="w-full h-full object-cover rounded-[2rem]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 left-8 right-8 p-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Concept Visualization</p>
                <p className="text-sm font-medium line-clamp-2">{prompt}</p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 p-8">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <ICONS.Image />
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No image generated yet</p>
                <p className="text-slate-300 text-sm mt-1">Enter a prompt and click generate to see the AI's vision.</p>
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-600/30 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-green-700 font-black uppercase tracking-widest text-xs">Gemini is dreaming...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIVisualizer;
