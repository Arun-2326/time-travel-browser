import React from 'react';

export default function WarpPortal({ isWarping, targetEra }) {
  if (!isWarping) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in text-white select-none">
      {/* Dynamic Swirling Time Vortex Rings */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/60 border-t-pink-500 animate-spin" />
        <div className="absolute inset-4 rounded-full border-4 border-amber-500/60 border-b-purple-500 animate-spin-slow" />
        <div className="absolute inset-8 rounded-full border-2 border-emerald-400/40 animate-ping" />
        <div className="absolute inset-16 rounded-full bg-gradient-to-br from-purple-600 via-indigo-700 to-cyan-500 animate-pulse-glow flex items-center justify-center">
          <span className="text-6xl animate-bounce">⏳</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase animate-pulse">
          TEMPORAL WARP DRIVE ENGAGED • TRAVERSING TIMELINE
        </div>
        <h2 className="text-3xl md:text-5xl font-black mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-pink-400 tracking-wider">
          WARPING TO {targetEra?.name?.toUpperCase() || 'NEXT ERA'}...
        </h2>
        <div className="text-sm font-mono text-neutral-400 mt-2">
          {targetEra?.period} • RECONFIGURING REALITY MATRIX
        </div>
      </div>
    </div>
  );
}
