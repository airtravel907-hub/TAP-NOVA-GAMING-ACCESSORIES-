import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Check, Shield } from 'lucide-react';

export const AndroidInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    const isDismissed = localStorage.getItem('tapnova_android_prompt_dismissed');
    
    // Listen for beforeinstallprompt event (Android Chrome / Chromium)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isDismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Check if already in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setInstalled(true);
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback: show step-by-step Android installation guide
      setShowGuideModal(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('tapnova_android_prompt_dismissed', 'true');
  };

  if (installed) return null;

  return (
    <>
      {/* Floating or Top Android App Banner */}
      {showPrompt && (
        <div className="fixed top-18 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0A0D22]/95 border border-emerald-500/40 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.7)] text-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold font-display text-white">TapNova Android App</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    APK / PWA
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Install on your Android phone for faster loading & 1-tap ordering.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-[0_0_10px_rgba(16,185,129,0.4)] transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
              <button
                onClick={handleDismiss}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Android Installation Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#090C1E] border border-emerald-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2648] mb-4">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Install on Any Android Phone</h4>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-[#151B38] text-slate-400 hover:text-white text-xs"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0D122D] border border-[#1E2648]">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-white block mb-0.5">Open Browser Menu</strong>
                  <span>Tap the three dots (⋮) in the top right corner of Chrome, Samsung Internet, or Brave.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0D122D] border border-[#1E2648]">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </span>
                <div>
                  <strong className="text-white block mb-0.5">Select Install or Add to Home Screen</strong>
                  <span>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0D122D] border border-[#1E2648]">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </span>
                <div>
                  <strong className="text-white block mb-0.5">Instant Android Launch</strong>
                  <span>TapNova will now appear directly on your Android app drawer and home screen.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95 transition-all"
            >
              Got It, Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};
