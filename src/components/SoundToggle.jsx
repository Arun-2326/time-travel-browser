import React, { useState } from 'react';
import { sound } from '../audio/soundEngine';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(true);

  const toggle = () => {
    const nextState = sound.toggleSound();
    setEnabled(nextState);
    if (nextState) {
      sound.playModernPing();
    }
  };

  return (
    <button
      onClick={toggle}
      title={enabled ? 'Mute procedural audio' : 'Enable procedural audio'}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all active:scale-95 ${
        enabled
          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/60'
          : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:bg-neutral-700'
      }`}
    >
      {enabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
      <span>{enabled ? 'AUDIO ON' : 'MUTED'}</span>
    </button>
  );
}
