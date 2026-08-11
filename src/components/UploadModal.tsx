import React, { useState, useRef } from 'react';
import { Upload, X, Sparkles, Check, Image as ImageIcon, ArrowRight, Loader2 } from 'lucide-react';
import { SAMPLE_ROOM_IMAGES } from '../sampleData';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze: (imageDataUrl: string, roomType: string, notes: string) => Promise<void>;
  isLoading: boolean;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAnalyze,
  isLoading,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [roomType, setRoomType] = useState<string>('Home Office / Library');
  const [notes, setNotes] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSelectSample = (url: string, defaultRoomType: string) => {
    setSelectedImage(url);
    setRoomType(defaultRoomType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;
    await onAnalyze(selectedImage, roomType, notes);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FDFCFB] border-2 border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-[16px_16px_0px_#1A1A1A]">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-6 right-6 p-1 border border-black hover:bg-black hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <p className="font-mono-code text-[10px] uppercase tracking-[0.3em] text-[#FF5F00] font-bold mb-1">
            Spatial Geometry Scan — 02
          </p>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter font-editorial">
            Scan New Room
          </h2>
          <p className="text-sm opacity-70 mt-1">
            Upload a clear photo of your room or choose a sample suite to run AI decluttering intelligence.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed border-black p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[220px] relative ${
              isDragging
                ? 'bg-[#FF5F00]/10 border-[#FF5F00]'
                : selectedImage
                ? 'bg-[#F0EFED]'
                : 'bg-white hover:bg-[#F0EFED]'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {selectedImage ? (
              <div className="relative w-full flex flex-col items-center">
                <img
                  src={selectedImage}
                  alt="Selected room preview"
                  className="max-h-52 object-contain border border-black mb-3"
                />
                <span className="font-mono-code text-[10px] uppercase tracking-widest bg-black text-white px-3 py-1">
                  Photo Loaded — Click or Drag to Swap
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center bg-white shadow-[3px_3px_0px_#1A1A1A]">
                  <Upload className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-mono-code text-[11px] uppercase tracking-widest font-bold">
                    Drag Room Photo Here or Click to Browse
                  </p>
                  <p className="text-xs opacity-50 mt-1">
                    Supports JPG, PNG, WEBP up to 20MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Preset Sample Rooms */}
          <div>
            <span className="font-mono-code text-[10px] uppercase tracking-widest opacity-60 block mb-2">
              Or Select Preset Room Photo
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleSelectSample(SAMPLE_ROOM_IMAGES.librarySuite, 'Home Office / Library')}
                className={`border border-black p-2 text-left hover:border-[#FF5F00] transition-colors bg-white ${
                  selectedImage === SAMPLE_ROOM_IMAGES.librarySuite ? 'ring-2 ring-[#FF5F00] bg-[#FF5F00]/5' : ''
                }`}
              >
                <div className="aspect-video bg-neutral-200 border border-black mb-1 overflow-hidden">
                  <img src={SAMPLE_ROOM_IMAGES.librarySuite} alt="Library" className="w-full h-full object-cover" />
                </div>
                <p className="font-mono-code text-[9px] uppercase font-bold truncate">Library Suite</p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectSample(SAMPLE_ROOM_IMAGES.studioLiving, 'Living Area')}
                className={`border border-black p-2 text-left hover:border-[#FF5F00] transition-colors bg-white ${
                  selectedImage === SAMPLE_ROOM_IMAGES.studioLiving ? 'ring-2 ring-[#FF5F00] bg-[#FF5F00]/5' : ''
                }`}
              >
                <div className="aspect-video bg-neutral-200 border border-black mb-1 overflow-hidden">
                  <img src={SAMPLE_ROOM_IMAGES.studioLiving} alt="Studio Living" className="w-full h-full object-cover" />
                </div>
                <p className="font-mono-code text-[9px] uppercase font-bold truncate">Studio Living</p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectSample(SAMPLE_ROOM_IMAGES.masterCloset, 'Closet / Dressing Room')}
                className={`border border-black p-2 text-left hover:border-[#FF5F00] transition-colors bg-white ${
                  selectedImage === SAMPLE_ROOM_IMAGES.masterCloset ? 'ring-2 ring-[#FF5F00] bg-[#FF5F00]/5' : ''
                }`}
              >
                <div className="aspect-video bg-neutral-200 border border-black mb-1 overflow-hidden">
                  <img src={SAMPLE_ROOM_IMAGES.masterCloset} alt="Master Closet" className="w-full h-full object-cover" />
                </div>
                <p className="font-mono-code text-[9px] uppercase font-bold truncate">Master Closet</p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectSample(SAMPLE_ROOM_IMAGES.kitchenIsland, 'Kitchen & Pantry')}
                className={`border border-black p-2 text-left hover:border-[#FF5F00] transition-colors bg-white ${
                  selectedImage === SAMPLE_ROOM_IMAGES.kitchenIsland ? 'ring-2 ring-[#FF5F00] bg-[#FF5F00]/5' : ''
                }`}
              >
                <div className="aspect-video bg-neutral-200 border border-black mb-1 overflow-hidden">
                  <img src={SAMPLE_ROOM_IMAGES.kitchenIsland} alt="Kitchen Island" className="w-full h-full object-cover" />
                </div>
                <p className="font-mono-code text-[9px] uppercase font-bold truncate">Kitchen Island</p>
              </button>
            </div>
          </div>

          {/* Form Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-mono-code text-[10px] uppercase tracking-widest block mb-1 opacity-70">
                Room Category
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full border border-black p-3 bg-white font-mono-code text-xs uppercase focus:outline-none focus:ring-1 focus:ring-[#FF5F00]"
              >
                <option value="Home Office / Library">Home Office / Library</option>
                <option value="Living Area / Lounge">Living Area / Lounge</option>
                <option value="Closet / Dressing Room">Closet / Dressing Room</option>
                <option value="Kitchen & Pantry">Kitchen & Pantry</option>
                <option value="Bedroom Sanctuary">Bedroom Sanctuary</option>
                <option value="Bathroom / Vanity">Bathroom / Vanity</option>
                <option value="Storage / Garage">Storage / Garage</option>
              </select>
            </div>

            <div>
              <label className="font-mono-code text-[10px] uppercase tracking-widest block mb-1 opacity-70">
                Focus Areas / Specific Goals (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Hide desk cables, organize books..."
                className="w-full border border-black p-3 bg-white font-mono-code text-xs focus:outline-none focus:ring-1 focus:ring-[#FF5F00]"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="border border-black px-6 py-3 text-[11px] font-mono-code uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!selectedImage || isLoading}
              className={`bg-black text-white px-8 py-3 text-[11px] font-mono-code uppercase tracking-widest font-bold flex items-center gap-2 shadow-[4px_4px_0px_#FF5F00] transition-all ${
                !selectedImage || isLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#FF5F00] hover:text-white'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#FF5F00]" />
                  <span>Analyzing Spatial Geometry...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#FF5F00]" />
                  <span>Run AI Spatial Intelligence</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
