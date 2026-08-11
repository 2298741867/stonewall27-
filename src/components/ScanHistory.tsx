import React from 'react';
import { RoomScan } from '../types';
import { Camera, Calendar, ArrowRight, Trash2, Layers } from 'lucide-react';

interface ScanHistoryProps {
  scans: RoomScan[];
  onSelectScan: (scan: RoomScan) => void;
  onDeleteScan: (id: string) => void;
  onNewScanClick: () => void;
}

export const ScanHistory: React.FC<ScanHistoryProps> = ({
  scans,
  onSelectScan,
  onDeleteScan,
  onNewScanClick,
}) => {
  return (
    <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-[#FDFCFB]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-black pb-6">
          <div>
            <p className="font-mono-code text-[10px] text-[#FF5F00] font-bold uppercase tracking-[0.3em] mb-1">
              Historical Spatial Log
            </p>
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter font-editorial">
              Scan History & Projects
            </h1>
          </div>

          <button
            onClick={onNewScanClick}
            className="bg-black text-white px-6 py-3 text-[11px] font-mono-code uppercase tracking-widest font-bold hover:bg-[#FF5F00] transition-colors shadow-[4px_4px_0px_#1A1A1A] flex items-center gap-2 self-start md:self-auto"
          >
            <Camera className="w-4 h-4" />
            <span>Scan New Room</span>
          </button>
        </div>

        {scans.length === 0 ? (
          <div className="border-2 border-dashed border-black p-12 text-center bg-[#F0EFED]">
            <Layers className="w-12 h-12 mx-auto text-neutral-400 mb-3" />
            <h3 className="font-bold text-xl uppercase font-editorial mb-1">
              No Saved Room Scans Found
            </h3>
            <p className="text-xs opacity-70 mb-6">
              Upload a photo of your room to get started with AI spatial analysis and organization plans.
            </p>
            <button
              onClick={onNewScanClick}
              className="bg-black text-white px-6 py-3 text-[11px] font-mono-code uppercase tracking-widest font-bold hover:bg-[#FF5F00] transition-colors"
            >
              Start First Scan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scans.map((scan) => (
              <div
                key={scan.id}
                className="border-2 border-black bg-white flex flex-col justify-between shadow-[8px_8px_0px_#1A1A1A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#FF5F00] transition-all"
              >
                <div className="p-2 border-b border-black bg-neutral-900 relative">
                  <span className="absolute top-4 left-4 bg-black text-white px-2 py-0.5 text-[9px] font-mono-code uppercase z-10 border border-white/20">
                    {scan.roomType}
                  </span>
                  <img
                    src={scan.imageUrl}
                    alt={scan.roomName}
                    className="w-full h-48 object-cover border border-white/10"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono-code opacity-60 mb-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {scan.timestamp}
                      </span>
                      <span>{scan.suggestions.length} Tips</span>
                    </div>

                    <h3 className="text-xl font-bold uppercase font-editorial tracking-tight mb-2">
                      {scan.roomName}
                    </h3>

                    <p className="text-xs opacity-70 line-clamp-2">
                      {scan.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-black/10 pt-3 font-mono-code text-[10px] uppercase">
                    <div>
                      <span className="opacity-50 block">Volume Score</span>
                      <span className="font-serif-italic text-lg font-bold">
                        {scan.clutterVolumeScore}%
                      </span>
                    </div>
                    <div>
                      <span className="opacity-50 block">Shift Goal</span>
                      <span className="font-bold text-[#FF5F00] truncate block">
                        {scan.atmosphericShift}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/20">
                    <button
                      onClick={() => onSelectScan(scan)}
                      className="bg-black text-white px-4 py-2 text-[10px] font-mono-code uppercase tracking-widest font-bold hover:bg-[#FF5F00] transition-colors flex items-center gap-1.5 flex-1 justify-center"
                    >
                      <span>Open Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {scans.length > 1 && (
                      <button
                        onClick={() => onDeleteScan(scan.id)}
                        className="p-2 border border-black hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete Scan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
