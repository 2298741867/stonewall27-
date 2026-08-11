import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="h-8 bg-black text-white flex items-center px-4 md:px-10 justify-between shrink-0 font-mono-code text-[9px] uppercase tracking-[0.2em] border-t border-black">
      <span>Studio Design Intelligence ©2026</span>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F00] inline-block animate-pulse"></span>
        <span>System: ONLINE / Cloud: READY</span>
      </div>
    </footer>
  );
};
