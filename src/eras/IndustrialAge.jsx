import React, { useState } from 'react';
import { sound } from '../audio/soundEngine';
import { Cog, Gauge, Award, Sparkles, Sliders, Radio, Wind } from 'lucide-react';

export default function IndustrialAge({ eraData, onProgressQuest, questCompleted, paradoxCount, onAddParadox }) {
  const [steamPSI, setSteamPSI] = useState(25);
  const [steamVented, setSteamVented] = useState(false);
  const [activeColumnIndex, setActiveColumnIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [morsePlaying, setMorsePlaying] = useState(false);

  // Pump iron lever to build steam
  const pumpLever = () => {
    sound.playGearTick();
    const nextPSI = Math.min(120, steamPSI + 15);
    setSteamPSI(nextPSI);

    if (nextPSI >= 100 && !questCompleted) {
      sound.playBellDing(1000);
      onProgressQuest(100);
    }

    if (nextPSI > 110) {
      // Overheat warning
      sound.playSteamHiss();
      onAddParadox(8);
    }
  };

  // Vent steam valve
  const ventSteam = () => {
    sound.playSteamHiss();
    setSteamVented(true);
    setSteamPSI(Math.max(15, steamPSI - 30));
    setTimeout(() => setSteamVented(false), 2000);
  };

  // Typewriter key press
  const handleTypewriterKey = (char) => {
    sound.playTypewriterClack();
    const newText = typewriterText + char;
    setTypewriterText(newText);
    if (newText.length % 8 === 0) {
      sound.playBellDing(900);
    }
  };

  // Play telegraph morse
  const playMorseDispatch = () => {
    setMorsePlaying(true);
    sound.playSciFiBeep(800);
    setTimeout(() => sound.playSciFiBeep(800), 150);
    setTimeout(() => sound.playSciFiBeep(800), 300);
    setTimeout(() => setMorsePlaying(false), 1200);
    onAddParadox(3);
  };

  const currentArticle = eraData.articles[activeColumnIndex];

  return (
    <div className="relative min-h-[750px] p-6 vintage-newsprint-bg rounded-2xl border-8 border-yellow-950 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden font-vintage select-none">
      {/* Brass Rivet Corners */}
      <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-600 via-amber-700 to-yellow-900 border border-yellow-400 shadow-md" />
      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-600 via-amber-700 to-yellow-900 border border-yellow-400 shadow-md" />
      <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-600 via-amber-700 to-yellow-900 border border-yellow-400 shadow-md" />
      <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-600 via-amber-700 to-yellow-900 border border-yellow-400 shadow-md" />

      {/* Steam Venting Cloud Animation */}
      {steamVented && (
        <div className="absolute inset-0 bg-stone-200/40 backdrop-blur-sm pointer-events-none z-50 flex items-center justify-center animate-steam">
          <div className="text-stone-700 text-2xl font-bold font-mono uppercase tracking-widest bg-amber-100/90 p-4 rounded-xl border-2 border-stone-600 shadow-2xl">
            💨 HIGH PRESSURE STEAM VENTED!
          </div>
        </div>
      )}

      {/* Industrial Broadsheet Masthead */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b-4 border-yellow-950">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🕰️</span>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-yellow-950 uppercase">
              The Daily Chronograph
            </h1>
          </div>
          <p className="text-xs tracking-widest text-stone-800 font-mono mt-1 font-bold">
            OCTOBER 14, 1894 • STEAM-POWERED ROTARY PRINTING • TELEGRAPHIC DISPATCH #482
          </p>
        </div>

        {/* Live Steam Boiler Pressure Gauge */}
        <div className="flex items-center gap-3 bg-stone-900 text-amber-200 p-2.5 rounded-xl border-2 border-yellow-600 shadow-lg">
          <Gauge className="w-5 h-5 text-amber-400" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">BOILER PRESSURE</span>
            <span className={`text-lg font-mono font-bold ${steamPSI >= 100 ? 'text-amber-400' : 'text-stone-200'}`}>
              {steamPSI} PSI {steamPSI >= 100 && '⚡ OPTIMAL'}
            </span>
          </div>
        </div>
      </div>

      {/* Quest Notification Banner */}
      <div className={`mt-4 p-3 rounded-xl border flex items-center justify-between transition-all ${
        questCompleted
          ? 'bg-amber-100 border-yellow-800 text-yellow-950'
          : 'bg-stone-300/60 border-stone-600 text-stone-900'
      }`}>
        <div className="flex items-center gap-2">
          {questCompleted ? (
            <Award className="w-5 h-5 text-yellow-800 shrink-0" />
          ) : (
            <Sparkles className="w-5 h-5 text-yellow-800 animate-pulse shrink-0" />
          )}
          <span className="text-sm">
            <strong>{eraData.quest.title}:</strong> {questCompleted ? eraData.quest.successMsg : eraData.quest.instruction}
          </span>
        </div>
        <span className="text-xs font-mono font-bold bg-amber-200 px-2.5 py-1 rounded border border-yellow-800">
          {steamPSI} / 100 PSI
        </span>
      </div>

      {/* Annoying Interaction Instruction Bar */}
      <div className="mt-3 bg-yellow-900/10 border border-yellow-950/30 rounded-lg px-4 py-2 text-xs font-mono text-stone-900 flex flex-wrap items-center justify-between gap-2">
        <span>⚙️ <strong>INDUSTRIAL RULE:</strong> Pull the steam pump lever and clack typewriter keys to operate machinery!</span>
        <span className="font-bold text-yellow-950">COLUMN {activeColumnIndex + 1} OF 3</span>
      </div>

      {/* Broadsheet Columns & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left 2 Cols: The Victorian Broadsheet Article Column */}
        <div className="lg:col-span-2 p-6 md:p-8 bg-[#fdfaf3] border-4 border-yellow-950 rounded-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-stone-400 pb-2">
              <span className="text-xs font-mono font-bold uppercase bg-stone-200 px-2 py-0.5 rounded border border-stone-400">
                {currentArticle.column}
              </span>
              <span className="text-xs italic text-stone-700">
                {currentArticle.date} • {currentArticle.author}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-stone-950 mt-4 leading-snug tracking-tight">
              {currentArticle.title}
            </h2>

            <p className="text-base md:text-lg text-stone-900 leading-relaxed mt-4 font-serif">
              {currentArticle.content}
            </p>

            <div className="mt-6 p-3 bg-stone-100 border border-stone-400 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono">
                <Radio className="w-4 h-4 text-amber-800" />
                <span>TELEGRAPH TAPE: <strong>{currentArticle.telegraphCode}</strong></span>
              </div>
              <button
                onClick={playMorseDispatch}
                className="px-2 py-1 bg-stone-800 text-stone-200 rounded text-xs font-mono hover:bg-stone-700 active:scale-95"
              >
                {morsePlaying ? 'TRANSMITTING...' : 'DECODE MORSE'}
              </button>
            </div>
          </div>

          {/* Rotary Column Selector */}
          <div className="mt-6 pt-4 border-t-2 border-stone-300 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono font-bold text-stone-800">Switch Broadsheet Column:</span>
            <div className="flex gap-2">
              {eraData.articles.map((art, idx) => (
                <button
                  key={art.id}
                  onClick={() => {
                    setActiveColumnIndex(idx);
                    sound.playGearTick();
                  }}
                  className={`px-3 py-1 text-xs font-mono font-bold rounded border-2 transition-all ${
                    activeColumnIndex === idx
                      ? 'bg-yellow-950 text-amber-100 border-black shadow-md'
                      : 'bg-stone-200 text-stone-800 border-stone-400 hover:bg-stone-300'
                  }`}
                >
                  Col {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Mechanical Levers & Typewriter Box */}
        <div className="flex flex-col gap-4">
          {/* Steam Crank Station */}
          <div className="p-5 rounded-2xl bg-[#efe6d5] border-4 border-yellow-950 shadow-md flex flex-col items-center text-center">
            <h3 className="text-sm font-bold text-stone-900 font-mono uppercase tracking-wider flex items-center gap-2">
              <Cog className="w-4 h-4 text-stone-800 animate-spin-slow" />
              Steam Engine Crank
            </h3>
            <p className="text-xs text-stone-700 mt-1">
              Pump iron lever to feed coal into the boiler!
            </p>

            <div className="flex items-center justify-center gap-3 mt-4 w-full">
              <button
                onClick={pumpLever}
                className="flex-1 py-3 bg-gradient-to-b from-stone-700 via-stone-800 to-stone-950 text-amber-200 border-2 border-stone-500 rounded-xl font-mono font-bold text-xs shadow-lg active:translate-y-1 hover:brightness-110 flex items-center justify-center gap-1.5"
              >
                <span>⚙️ PUMP LEVER (+15 PSI)</span>
              </button>

              <button
                onClick={ventSteam}
                title="Vent steam pressure"
                className="px-3 py-3 bg-gradient-to-b from-amber-700 to-amber-900 text-amber-100 border-2 border-amber-600 rounded-xl font-mono font-bold text-xs shadow hover:brightness-110 active:scale-95"
              >
                <Wind className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mechanical Typewriter Simulation */}
          <div className="p-5 rounded-2xl bg-[#efe6d5] border-4 border-yellow-950 shadow-md">
            <h3 className="text-sm font-bold text-stone-900 font-mono uppercase flex items-center justify-between">
              <span>⌨️ Remington Typewriter</span>
              <span className="text-[10px] text-stone-600 font-normal">Cast Iron No. 2</span>
            </h3>

            {/* Typed Paper Sheet */}
            <div className="mt-3 p-2.5 bg-white border-2 border-stone-400 rounded font-mono text-xs min-h-[50px] text-stone-900 break-all shadow-inner">
              {typewriterText || 'Click keys below to stamp letterpress...'}
            </div>

            {/* Typewriter Keypad */}
            <div className="grid grid-cols-5 gap-1.5 mt-3">
              {['T', 'E', 'S', 'L', 'A', 'T', 'I', 'M', 'E', '⏱️'].map((k, i) => (
                <button
                  key={i}
                  onClick={() => handleTypewriterKey(k)}
                  className="w-full h-10 rounded-full bg-gradient-to-b from-stone-100 to-stone-300 border-2 border-stone-600 text-stone-900 font-mono font-bold text-xs shadow active:translate-y-0.5 active:shadow-none hover:bg-stone-200 flex items-center justify-center"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
