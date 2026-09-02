import React from 'react';
import { sound } from '../audio/soundEngine';
import SoundToggle from './SoundToggle';
import { ChevronLeft, ChevronRight, RotateCw, ShieldAlert, Sparkles, Zap, Lock, Globe } from 'lucide-react';

export default function BrowserChrome({
  currentEra,
  eras,
  onSelectEra,
  onNextEra,
  paradoxCount,
  onTriggerParadoxEvent,
  isAutoLoop,
  onToggleAutoLoop
}) {
  return (
    <div className="w-full bg-neutral-900 border-b border-neutral-800 p-3 md:p-4 shadow-xl select-none">
      {/* Top Bar: Timeline Era Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/40 border border-amber-500/40 rounded-lg text-[11px] font-mono font-bold text-amber-400 shrink-0">
            <span>⏳ PARADOX-9000</span>
          </div>

          {/* 5 Era Selectors */}
          {eras.map((era) => {
            const isActive = era.id === currentEra.id;
            return (
              <button
                key={era.id}
                onClick={() => {
                  if (!isActive) {
                    sound.playWarpDrive();
                    onSelectEra(era.id);
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-950 shadow-md scale-105'
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/60'
                }`}
              >
                <span>{era.icon}</span>
                <span className="hidden sm:inline">{era.name}</span>
                <span className="text-[10px] opacity-70">({era.period.split(' ')[0]})</span>
              </button>
            );
          })}
        </div>

        {/* Right side controls: Sound & Auto Loop */}
        <div className="flex items-center gap-2 shrink-0">
          <SoundToggle />

          <button
            onClick={() => {
              sound.playModernPing();
              onToggleAutoLoop();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all active:scale-95 ${
              isAutoLoop
                ? 'bg-purple-950/60 border-purple-500/60 text-purple-400 animate-pulse'
                : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:bg-neutral-700'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoLoop ? 'animate-spin' : ''}`} />
            <span>{isAutoLoop ? 'AUTO-LOOP ON' : 'AUTO-LOOP'}</span>
          </button>
        </div>
      </div>

      {/* Middle Bar: Navigation Buttons, Omnibar, and Time Warp Button */}
      <div className="flex flex-wrap items-center gap-3 pt-3">
        {/* Nav Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => sound.playModernClick()}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white border border-neutral-700 active:scale-95"
            title="Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => sound.playModernClick()}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white border border-neutral-700 active:scale-95"
            title="Forward"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              sound.playModernClick();
              onSelectEra(currentEra.id);
            }}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white border border-neutral-700 active:scale-95"
            title="Reload Timeline Frame"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Era Omnibar */}
        <div className="flex-1 min-w-[240px] flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 shadow-inner">
          <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-xs font-mono font-bold text-neutral-300 truncate">
            {currentEra.url}
          </span>
          <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase tracking-widest hidden md:inline">
            {currentEra.codename}
          </span>
        </div>

        {/* Paradox Meter */}
        <button
          onClick={onTriggerParadoxEvent}
          title="Click to trigger timeline anomaly"
          className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 hover:border-red-500/50 px-3 py-2 rounded-xl text-xs font-mono cursor-pointer transition-all"
        >
          <ShieldAlert className={`w-4 h-4 ${paradoxCount > 70 ? 'text-red-500 animate-bounce' : 'text-amber-400'}`} />
          <div className="flex flex-col text-left">
            <span className="text-[9px] text-neutral-400 uppercase font-bold">Paradox Flux</span>
            <div className="w-20 bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-0.5">
              <div
                className={`h-full transition-all duration-300 ${
                  paradoxCount > 70 ? 'bg-red-500' : paradoxCount > 40 ? 'bg-amber-400' : 'bg-cyan-400'
                }`}
                style={{ width: `${Math.min(100, paradoxCount)}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-bold text-neutral-200">{paradoxCount}%</span>
        </button>

        {/* Warp to Next Era Button */}
        <button
          onClick={() => {
            sound.playWarpDrive();
            onNextEra();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 via-purple-600 to-cyan-500 hover:from-amber-400 hover:via-purple-500 hover:to-cyan-400 text-white rounded-xl text-xs font-mono font-bold shadow-lg shadow-purple-900/40 active:scale-95 transition-all"
        >
          <Zap className="w-4 h-4 animate-bounce" />
          <span>WARP TO NEXT ERA ▶</span>
        </button>
      </div>
    </div>
  );
}
