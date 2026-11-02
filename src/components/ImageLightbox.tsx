import React from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ImageLightbox: React.FC = () => {
  const { activeImageModal, setActiveImageModal } = useStore();

  if (!activeImageModal || activeImageModal.trim() === '') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
      {/* Click outside to close */}
      <div
        onClick={() => setActiveImageModal(null)}
        className="absolute inset-0 cursor-pointer"
      />

      <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center z-10">
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between pb-3 text-slate-300 text-xs">
          <div className="flex items-center gap-1.5 text-[#08D9FF]">
            <ZoomIn className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">TapNova High-Resolution Gear Preview</span>
          </div>
          <button
            onClick={() => setActiveImageModal(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151B38] text-slate-300 hover:text-white hover:bg-rose-500/30 border border-[#27325F] text-xs font-semibold transition-all active:scale-95"
            aria-label="Exit image preview"
          >
            <X className="w-4 h-4" />
            <span>Exit</span>
          </button>
        </div>

        {/* Big Image View */}
        <div className="relative rounded-2xl overflow-hidden border border-[#1E2648] bg-[#070A18] shadow-[0_0_50px_rgba(116,44,255,0.3)]">
          <img
            src={activeImageModal || undefined}
            alt="Product view"
            className="max-h-[80vh] w-auto max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
