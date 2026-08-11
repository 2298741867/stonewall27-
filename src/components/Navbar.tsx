import React from 'react';
import { Camera, Layers, BookOpen, Plus, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'history' | 'methodology';
  setActiveTab: (tab: 'dashboard' | 'history' | 'methodology') => void;
  onNewScan: () => void;
  totalScansCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewScan,
  totalScansCount,
}) => {
  return (
    <nav className="h-[80px] border-b border-black flex items-center px-4 md:px-10 justify-between shrink-0 bg-[#FDFCFB] sticky top-0 z-30">
      <div className="flex items-baseline gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
        <span className="text-2xl font-bold tracking-tighter uppercase font-editorial">
          Clutterless
        </span>
        <span className="text-[10px] font-mono-code opacity-60 tracking-wider">
          VER. 2.0.4
        </span>
      </div>

      <div className="hidden md:flex gap-8 font-mono-code text-[11px] uppercase tracking-widest">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-1 transition-all flex items-center gap-1.5 ${
            activeTab === 'dashboard'
              ? 'border-b-2 border-black font-bold text-black'
              : 'opacity-50 hover:opacity-100 text-black'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-1 transition-all flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'border-b-2 border-black font-bold text-black'
              : 'opacity-50 hover:opacity-100 text-black'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          Scan History ({totalScansCount})
        </button>
        <button
          onClick={() => setActiveTab('methodology')}
          className={`pb-1 transition-all flex items-center gap-1.5 ${
            activeTab === 'methodology'
              ? 'border-b-2 border-black font-bold text-black'
              : 'opacity-50 hover:opacity-100 text-black'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Methodology
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onNewScan}
          className="bg-black text-white px-5 py-2.5 text-[11px] font-mono-code uppercase tracking-widest font-bold hover:bg-[#FF5F00] transition-colors flex items-center gap-2 shadow-[3px_3px_0px_#1A1A1A]"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>
    </nav>
  );
};
