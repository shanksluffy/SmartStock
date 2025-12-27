
import React from 'react';
import { SECTORS } from '../constants';
import { Sector } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSectorId: string;
  onSelectSector: (sector: Sector) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSectorId, onSelectSector }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            SmartStock AI
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Intelligence Dashboard</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {SECTORS.map((sector) => (
            <button
              key={sector.id}
              onClick={() => onSelectSector(sector)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeSectorId === sector.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className="mr-3 text-lg">{sector.icon}</span>
              {sector.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-xl p-4 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">AI</div>
            <div>
              <p className="text-xs font-medium">Gemini 3 Pro</p>
              <p className="text-[10px] text-slate-500">Analysis Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[#0a0f1c]">
        {/* Top Header for Mobile */}
        <div className="md:hidden p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold text-blue-400">SmartStock AI</h1>
          <div className="flex space-x-2 overflow-x-auto">
            {SECTORS.map((s) => (
               <button 
                 key={s.id}
                 onClick={() => onSelectSector(s)}
                 className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${activeSectorId === s.id ? 'bg-blue-600' : 'bg-slate-800'}`}
               >
                 {s.name}
               </button>
            ))}
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
