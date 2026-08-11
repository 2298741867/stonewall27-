import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WorkspaceView } from './components/WorkspaceView';
import { ScanHistory } from './components/ScanHistory';
import { MethodologyView } from './components/MethodologyView';
import { UploadModal } from './components/UploadModal';
import { INITIAL_SCANS } from './sampleData';
import { RoomScan } from './types';

export default function App() {
  const [scans, setScans] = useState<RoomScan[]>(INITIAL_SCANS);
  const [activeScanId, setActiveScanId] = useState<string>(INITIAL_SCANS[0].id);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'methodology'>('dashboard');
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGeneratingVision, setIsGeneratingVision] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeScan = scans.find((s) => s.id === activeScanId) || scans[0];

  const handleAnalyzeRoom = async (imageDataUrl: string, roomType: string, notes: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/analyze-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageDataUrl, roomType, notes }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze room image');
      }

      const result = await response.json();

      const newScan: RoomScan = {
        id: `scan-${Date.now()}`,
        roomName: result.roomName || 'Scanned Room Workspace',
        roomType: result.roomType || roomType,
        timestamp: new Date().toLocaleString([], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        imageUrl: imageDataUrl,
        clutterVolumeScore: result.clutterVolumeScore ?? 65,
        efficiencyIndex: result.efficiencyIndex || '+15',
        atmosphericShift: result.atmosphericShift || 'Zen / Minimal',
        summary: result.summary || 'AI spatial analysis complete. Focus on surface clearance and cable management.',
        objectGroups: result.objectGroups || [],
        suggestions: result.suggestions || [],
        declutterSteps: result.declutterSteps || [],
        visionConceptPrompt: result.visionConceptPrompt || 'A serene, minimal, highly organized room.',
      };

      setScans((prev) => [newScan, ...prev]);
      setActiveScanId(newScan.id);
      setActiveTab('dashboard');
      setIsUploadOpen(false);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(err.message || 'An error occurred while analyzing the image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateScan = (updatedScan: RoomScan) => {
    setScans((prev) => prev.map((s) => (s.id === updatedScan.id ? updatedScan : s)));
  };

  const handleDeleteScan = (id: string) => {
    if (scans.length <= 1) return;
    setScans((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      if (activeScanId === id && filtered.length > 0) {
        setActiveScanId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleGenerateVisionRender = async (scanToRender: RoomScan) => {
    setIsGeneratingVision(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visionPrompt: scanToRender.visionConceptPrompt,
          image: scanToRender.imageUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate AI vision render');
      }

      const data = await response.json();
      if (data.imageUrl) {
        handleUpdateScan({
          ...scanToRender,
          aiVisionImageUrl: data.imageUrl,
        });
      }
    } catch (err: any) {
      console.error('Vision generation error:', err);
      setErrorMessage(err.message || 'Failed to generate AI vision render.');
    } finally {
      setIsGeneratingVision(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#FDFCFB] text-[#1A1A1A] overflow-hidden select-none">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewScan={() => setIsUploadOpen(true)}
        totalScansCount={scans.length}
      />

      {errorMessage && (
        <div className="bg-[#FF5F00] text-white px-6 py-2.5 font-mono-code text-xs font-bold uppercase flex items-center justify-between z-40 border-b border-black">
          <span>Error: {errorMessage}</span>
          <button
            onClick={() => setErrorMessage(null)}
            className="underline hover:text-black font-bold ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      <main className="flex-1 flex overflow-hidden relative">
        {activeTab === 'dashboard' && activeScan && (
          <WorkspaceView
            scan={activeScan}
            onNewScanClick={() => setIsUploadOpen(true)}
            onUpdateScan={handleUpdateScan}
            onGenerateVisionRender={handleGenerateVisionRender}
            isGeneratingVision={isGeneratingVision}
          />
        )}

        {activeTab === 'history' && (
          <ScanHistory
            scans={scans}
            onSelectScan={(s) => {
              setActiveScanId(s.id);
              setActiveTab('dashboard');
            }}
            onDeleteScan={handleDeleteScan}
            onNewScanClick={() => setIsUploadOpen(true)}
          />
        )}

        {activeTab === 'methodology' && (
          <MethodologyView onNewScanClick={() => setIsUploadOpen(true)} />
        )}
      </main>

      <Footer />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAnalyze={handleAnalyzeRoom}
        isLoading={isLoading}
      />
    </div>
  );
}
