import React, { useState, useRef } from 'react';
import { sound } from '../audio/soundEngine';
import { Radio, Atom, Sparkles, Award, Cpu, Eye, Volume2, Orbit } from 'lucide-react';

export default function FutureAge({ eraData, onProgressQuest, questCompleted, paradoxCount, onAddParadox }) {
  const [orbPos, setOrbPos] = useState({ x: 300, y: 150 });
  const [isDraggingOrb, setIsDraggingOrb] = useState(false);
  const [frequency, setFrequency] = useState(240.5); // THz
  const [aiOracleSpeaking, setAiOracleSpeaking] = useState(false);
  const [oracleMsg, setOracleMsg] = useState('');
  const [activeHoloCard, setActiveHoloCard] = useState(0);

  const containerRef = useRef(null);

  // Drag Quantum Orb
  const handleOrbMouseDown = () => {
    setIsDraggingOrb(true);
    sound.playHoloHum();
  };

  const handleMouseMove = (e) => {
    if (!isDraggingOrb || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(30, Math.min(rect.width - 30, e.clientX - rect.left));
    const y = Math.max(30, Math.min(rect.height - 30, e.clientY - rect.top));
    setOrbPos({ x, y });
  };

  const handleMouseUp = () => {
    if (isDraggingOrb) {
      setIsDraggingOrb(false);
      sound.playSciFiBeep(1400);
      onAddParadox(3);
    }
  };

  // Frequency slider
  const handleFrequencyChange = (e) => {
    const val = parseFloat(e.target.value);
    setFrequency(val);
    sound.playSciFiBeep(600 + val);

    // Target frequency: ~432.8 THz (tolerance 425 - 440)
    if (val >= 425 && val <= 440 && !questCompleted) {
      sound.playWarpDrive();
      onProgressQuest(100);
    }
  };

  // Telepathic Oracle speech
  const speakOracle = () => {
    sound.playSciFiBeep(1600);
    const prophecies = [
      '🔮 "In cycle 1042, humans discover that the entire universe runs on an unmerged Git pull request."',
      '🔮 "Warning: Sub-atomic scan shows a 94.8% chance of temporal feedback in Sector 7."',
      '🔮 "Advice from 3088: Never delete your system cache while travelling faster than the speed of light."'
    ];
    const quote = prophecies[Math.floor(Math.random() * prophecies.length)];
    setOracleMsg(quote);
    setAiOracleSpeaking(true);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(quote.replace(/[^a-zA-Z0-9.,?! ]/g, ''));
      utterance.pitch = 1.4;
      utterance.rate = 1.1;
      utterance.onend = () => setAiOracleSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setAiOracleSpeaking(false), 4000);
    }
    onAddParadox(5);
  };

  const currentArticle = eraData.articles[activeHoloCard];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative min-h-[750px] p-6 cyber-grid-bg text-cyan-200 rounded-2xl border-2 border-cyan-500/60 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden font-future select-none"
    >
      {/* Background Animated Laser Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30 scanlines" />
      <div className="absolute top-10 right-20 text-cyan-500/10 text-9xl pointer-events-none animate-spin-slow">⚛️</div>

      {/* Floating Magnetic Quantum Core Orb */}
      <div
        onMouseDown={handleOrbMouseDown}
        style={{
          left: `${orbPos.x}px`,
          top: `${orbPos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
        className={`absolute z-40 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 border-2 border-white cursor-grab active:cursor-grabbing transition-shadow flex items-center justify-center ${
          isDraggingOrb
            ? 'shadow-[0_0_40px_rgba(0,240,255,1),0_0_80px_rgba(236,72,153,0.8)] scale-125'
            : 'shadow-[0_0_20px_rgba(0,240,255,0.6)] animate-pulse'
        }`}
        title="Drag the Quantum Orb to magnetically manipulate the holographic field"
      >
        <Atom className="w-8 h-8 text-white animate-spin" />
      </div>

      {/* Holographic Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/30">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-pulse">🚀</span>
            <h1 className="text-2xl md:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-pink-400 holo-glow">
              NEURONET HOLOSPHERE 3088
            </h1>
          </div>
          <p className="text-xs tracking-widest text-cyan-400/80 font-mono mt-1">
            YEAR 3088 • NEO-SOLARIS • TACHYON HYPERSTREAM • ANTIGRAVITY UI
          </p>
        </div>

        {/* Telepathic Oracle Button */}
        <button
          onClick={speakOracle}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-xl border border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] font-bold text-xs active:scale-95 transition-all"
        >
          <Volume2 className="w-4 h-4 text-cyan-200 animate-pulse" />
          <span>{aiOracleSpeaking ? 'RECEIVING PROPHECY...' : 'LISTEN TO NEURAL ORACLE'}</span>
        </button>
      </div>

      {/* Neural Oracle Speech Banner */}
      {oracleMsg && (
        <div className="mt-3 p-3.5 bg-purple-950/80 backdrop-blur-md rounded-xl border border-pink-500/60 shadow-[0_0_25px_rgba(236,72,153,0.4)] text-pink-200 text-xs leading-relaxed flex items-center gap-3 animate-flicker">
          <Sparkles className="w-5 h-5 text-pink-400 shrink-0 animate-spin" />
          <span>{oracleMsg}</span>
        </div>
      )}

      {/* Quest Notification Banner */}
      <div className={`mt-4 p-3 rounded-xl border flex items-center justify-between transition-all ${
        questCompleted
          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
          : 'bg-slate-900/60 border-cyan-800 text-cyan-400/80'
      }`}>
        <div className="flex items-center gap-2">
          {questCompleted ? (
            <Award className="w-5 h-5 text-cyan-300 shrink-0" />
          ) : (
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse shrink-0" />
          )}
          <span className="text-sm">
            <strong>{eraData.quest.title}:</strong> {questCompleted ? eraData.quest.successMsg : eraData.quest.instruction}
          </span>
        </div>
        <span className="text-xs font-mono font-bold bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500">
          {frequency.toFixed(1)} THz {questCompleted ? '• HARMONIZED' : '• MISALIGNED'}
        </span>
      </div>

      {/* Annoying Interaction Instruction Bar */}
      <div className="mt-3 bg-cyan-950/40 border border-cyan-500/30 rounded-lg px-4 py-2 text-xs font-mono text-cyan-300 flex flex-wrap items-center justify-between gap-2">
        <span>⚡ <strong>FUTURE RULE:</strong> Physical buttons are gone. Drag the floating Quantum Orb or slide the Tachyon Resonator!</span>
        <span className="text-cyan-400 font-bold">NODE #{activeHoloCard + 1} OF 3</span>
      </div>

      {/* Main Holographic Projection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left 2 Cols: 3D Perspective Hologram Panel */}
        <div className="lg:col-span-2 relative p-6 md:p-8 rounded-2xl bg-cyan-950/20 backdrop-blur-md border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.2),inset_0_0_20px_rgba(6,182,212,0.1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
              <span className="text-xs font-mono font-bold bg-cyan-900/60 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/40 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                {currentArticle.hologramStatus}
              </span>
              <span className="text-xs font-mono text-cyan-400/70">
                {currentArticle.date} • {currentArticle.author}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-white mt-4 holo-glow leading-snug">
              {currentArticle.title}
            </h2>

            <p className="text-base md:text-lg text-cyan-100/90 leading-relaxed mt-4 font-mono">
              {currentArticle.content}
            </p>

            <div className="mt-6 p-3 bg-cyan-900/30 border border-cyan-500/40 rounded-xl flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-300">ENERGY QUOTA:</span>
              <span className="text-xs font-mono font-bold text-pink-400 neon-pink-glow">
                {currentArticle.energyUnits}
              </span>
            </div>
          </div>

          {/* Hologram Matrix Selector */}
          <div className="mt-8 pt-4 border-t border-cyan-500/30 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono text-cyan-300">Switch Holographic Stream:</span>
            <div className="flex gap-2">
              {eraData.articles.map((art, idx) => (
                <button
                  key={art.id}
                  onClick={() => {
                    setActiveHoloCard(idx);
                    sound.playSciFiBeep(1100 + idx * 200);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-xl border transition-all ${
                    activeHoloCard === idx
                      ? 'bg-cyan-500 text-neutral-950 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.8)]'
                      : 'bg-cyan-950/60 text-cyan-300 border-cyan-800 hover:border-cyan-500'
                  }`}
                >
                  Stream 0{idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Tachyon Frequency Resonator & Telemetry */}
        <div className="flex flex-col gap-4">
          {/* Tachyon Slider */}
          <div className="p-5 rounded-2xl bg-cyan-950/40 backdrop-blur-md border border-cyan-500/40 shadow-lg flex flex-col items-center text-center">
            <h3 className="text-sm font-bold text-cyan-300 font-mono uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-spin" />
              Tachyon Resonator
            </h3>
            <p className="text-xs text-cyan-400/70 mt-1">
              Slide to ~432.8 THz to stabilize temporal vortex!
            </p>

            <div className="mt-5 w-full">
              <input
                type="range"
                min="100"
                max="500"
                step="0.5"
                value={frequency}
                onChange={handleFrequencyChange}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-cyan-400/60 mt-1">
                <span>100 THz</span>
                <span className="text-pink-400 font-bold">TARGET: 432.8</span>
                <span>500 THz</span>
              </div>
            </div>

            <div className="mt-3 text-lg font-mono font-black text-cyan-200">
              {frequency.toFixed(1)} <span className="text-xs font-normal text-cyan-400">THz</span>
            </div>
          </div>

          {/* Sub-Space Telemetry HUD */}
          <div className="p-5 rounded-2xl bg-cyan-950/40 backdrop-blur-md border border-cyan-500/40 shadow-lg">
            <h3 className="text-xs font-bold text-cyan-300 font-mono uppercase flex items-center justify-between">
              <span>Telemetry Matrix</span>
              <span className="text-[10px] text-pink-400 animate-pulse">LIVE FEED</span>
            </h3>
            <div className="mt-3 space-y-2 text-xs font-mono text-cyan-400/80">
              <div className="flex justify-between">
                <span>Entropy Rate:</span>
                <span className="text-white">0.0004 Δt</span>
              </div>
              <div className="flex justify-between">
                <span>Temporal Flux:</span>
                <span className="text-cyan-300">99.8% Sync</span>
              </div>
              <div className="flex justify-between">
                <span>Quantum Core:</span>
                <span className="text-pink-300 font-bold">{isDraggingOrb ? 'MANIPULATING' : 'IDLE'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
