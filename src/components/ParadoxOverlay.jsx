import React from 'react';
import { sound } from '../audio/soundEngine';
import { AlertTriangle, Sparkles, RefreshCw, X } from 'lucide-react';

export default function ParadoxOverlay({ activeEvent, onClose, onResetParadox }) {
  if (!activeEvent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative max-w-lg w-full p-6 md:p-8 bg-neutral-900 border-2 border-red-500 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.5)] text-neutral-100 animate-bounce-short">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800 border border-neutral-700 hover:bg-neutral-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-red-950/80 border border-red-500/60 rounded-full w-fit text-red-400 text-xs font-mono font-bold tracking-wider">
          <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
          <span>TEMPORAL PARADOX 100% REACHED</span>
        </div>

        {/* Event Title */}
        <h2 className="text-2xl font-black text-white mt-4 leading-tight">
          {activeEvent.title}
        </h2>
        <div className="text-xs font-mono text-red-400 mt-1">
          {activeEvent.era}
        </div>

        {/* Event Description */}
        <div className="mt-4 p-4 bg-neutral-800/80 rounded-2xl border border-neutral-700 text-sm text-neutral-200 leading-relaxed font-mono">
          "{activeEvent.desc}"
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              sound.playSciFiBeep(1200);
              onResetParadox();
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-lg active:scale-95 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>STABILIZE TIMELINE & PURGE PARADOX</span>
          </button>
        </div>
      </div>
    </div>
  );
}
