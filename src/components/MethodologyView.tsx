import React from 'react';
import { BookOpen, Check, Layers, Sliders, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface MethodologyViewProps {
  onNewScanClick: () => void;
}

export const MethodologyView: React.FC<MethodologyViewProps> = ({ onNewScanClick }) => {
  return (
    <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-[#FDFCFB]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b-2 border-black pb-8">
          <p className="font-mono-code text-[10px] text-[#FF5F00] font-bold uppercase tracking-[0.3em] mb-2">
            Clutterless Framework — Method 2.0
          </p>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter font-editorial mb-4">
            The Spatial Serenity Formula
          </h1>
          <p className="text-lg opacity-80 max-w-2xl leading-snug">
            Clutterless applies computer vision and architectural proportion rules to eliminate visual noise and restore spatial balance.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-black p-6 bg-white shadow-[6px_6px_0px_#1A1A1A]">
            <span className="font-mono-code text-xs bg-black text-white px-2 py-1 uppercase font-bold mb-3 inline-block">
              Pillar 01
            </span>
            <h3 className="text-xl font-bold uppercase font-editorial mb-2">
              Spatial Geometry Assessment
            </h3>
            <p className="text-xs opacity-80 leading-relaxed mb-4">
              AI evaluates surface area ratios vs open negative space. Rooms with over 60% surface coverage trigger immediate visual fatigue.
            </p>
            <div className="font-mono-code text-[10px] uppercase text-[#FF5F00] font-bold border-t border-black/10 pt-2">
              Rule: Retain 40% Minimum Clear Surface Buffer
            </div>
          </div>

          <div className="border-2 border-black p-6 bg-white shadow-[6px_6px_0px_#1A1A1A]">
            <span className="font-mono-code text-xs bg-black text-white px-2 py-1 uppercase font-bold mb-3 inline-block">
              Pillar 02
            </span>
            <h3 className="text-xl font-bold uppercase font-editorial mb-2">
              Cluster Categorization
            </h3>
            <p className="text-xs opacity-80 leading-relaxed mb-4">
              Visual noise stems from micro-scatter: unrouted power lines, loose paper stacks, and orphan accessories. We group items into actionable clusters.
            </p>
            <div className="font-mono-code text-[10px] uppercase text-[#FF5F00] font-bold border-t border-black/10 pt-2">
              Rule: Single Tray / Container Rule for Surfaces
            </div>
          </div>

          <div className="border-2 border-black p-6 bg-white shadow-[6px_6px_0px_#1A1A1A]">
            <span className="font-mono-code text-xs bg-black text-white px-2 py-1 uppercase font-bold mb-3 inline-block">
              Pillar 03
            </span>
            <h3 className="text-xl font-bold uppercase font-editorial mb-2">
              Zonal Displacement Sequence
            </h3>
            <p className="text-xs opacity-80 leading-relaxed mb-4">
              Order must be restored in strict sequence: start with floor-level obstacles, progress to primary work horizons, then finish with vertical display shelves.
            </p>
            <div className="font-mono-code text-[10px] uppercase text-[#FF5F00] font-bold border-t border-black/10 pt-2">
              Rule: Top-Down Vertical Hierarchy
            </div>
          </div>

          <div className="border-2 border-black p-6 bg-white shadow-[6px_6px_0px_#1A1A1A]">
            <span className="font-mono-code text-xs bg-black text-white px-2 py-1 uppercase font-bold mb-3 inline-block">
              Pillar 04
            </span>
            <h3 className="text-xl font-bold uppercase font-editorial mb-2">
              Atmospheric Maintenance
            </h3>
            <p className="text-xs opacity-80 leading-relaxed mb-4">
              Sustainability is guaranteed by creating designated drop zones for high-velocity daily items (keys, wallet, mail) to prevent relapse.
            </p>
            <div className="font-mono-code text-[10px] uppercase text-[#FF5F00] font-bold border-t border-black/10 pt-2">
              Rule: 5-Minute Evening Horizon Sweep
            </div>
          </div>
        </div>

        {/* Cheatsheet Banner */}
        <div className="border-2 border-black bg-black text-white p-8 md:p-10 shadow-[10px_10px_0px_#FF5F00] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <span className="font-mono-code text-[10px] text-[#FF5F00] uppercase tracking-widest font-bold">
              Ready to Transform Your Room?
            </span>
            <h2 className="text-3xl font-bold uppercase font-editorial">
              Apply Design Intelligence Today
            </h2>
            <p className="text-xs opacity-70">
              Upload any room photo to receive your instant spatial score, cluster analysis, and custom step-by-step decluttering plan.
            </p>
          </div>

          <button
            onClick={onNewScanClick}
            className="bg-[#FF5F00] text-white px-8 py-4 text-[11px] font-mono-code uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-colors flex items-center gap-2 shrink-0 border border-white/20"
          >
            <span>Scan Room Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
