import React, { useState, useRef } from 'react';
import { sound } from '../audio/soundEngine';
import { Flame, Sparkles, Hand, Hammer, ShieldAlert, Award } from 'lucide-react';

export default function StoneAge({ eraData, onProgressQuest, questCompleted, paradoxCount, onAddParadox }) {
  const [litTorches, setLitTorches] = useState([false, false, false]);
  const [sparks, setSparks] = useState([]);
  const [activeTabletIndex, setActiveTabletIndex] = useState(0);
  const [handprints, setHandprints] = useState([]);
  const [boulderHits, setBoulderHits] = useState(0);
  const [boulderShattered, setBoulderShattered] = useState(false);
  const [filterSymbol, setFilterSymbol] = useState('all');
  const [dragStartX, setDragStartX] = useState(null);

  // Spark generation on flint strike
  const strikeFlint = (e, torchIndex) => {
    sound.playSpark();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparks = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 40 - 20),
      size: Math.random() * 6 + 3,
      color: Math.random() > 0.5 ? '#f59e0b' : '#ef4444',
    }));

    setSparks((prev) => [...prev, ...newSparks]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.some((ns) => ns.id === s.id)));
    }, 600);

    if (torchIndex !== undefined && !litTorches[torchIndex]) {
      const updated = [...litTorches];
      updated[torchIndex] = true;
      setLitTorches(updated);
      sound.playRockClack();

      const totalLit = updated.filter(Boolean).length;
      onProgressQuest(totalLit);
    }
  };

  // Stamp handprint on cave wall
  const handleAddHandprint = (e, articleId) => {
    sound.playRockClack();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const print = {
      id: Date.now(),
      x,
      y,
      articleId,
      color: Math.random() > 0.5 ? '#b91c1c' : '#c2410c',
      rotation: Math.random() * 40 - 20
    };
    setHandprints((prev) => [...prev, print]);
    onAddParadox(3);
  };

  // Boulder smashing
  const smashBoulder = () => {
    if (boulderShattered) return;
    const nextHits = boulderHits + 1;
    setBoulderHits(nextHits);
    sound.playRockClack();

    if (nextHits >= 4) {
      setBoulderShattered(true);
      sound.playStoneGrind();
      sound.playBellDing(1200);
      onAddParadox(10);
    }
  };

  // Tablet dragging
  const handleMouseDown = (e) => {
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e) => {
    if (dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (diff > 80 && activeTabletIndex > 0) {
      setActiveTabletIndex((prev) => prev - 1);
      sound.playStoneGrind();
    } else if (diff < -80 && activeTabletIndex < eraData.articles.length - 1) {
      setActiveTabletIndex((prev) => prev + 1);
      sound.playStoneGrind();
    }
    setDragStartX(null);
  };

  const currentArticle = eraData.articles[activeTabletIndex];

  return (
    <div className="relative min-h-[750px] p-6 text-amber-100 cave-wall-bg rounded-2xl border-4 border-amber-950/80 shadow-2xl overflow-hidden font-cave select-none">
      {/* Background Cave Cave-Painting Watermarks */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-8 right-12 opacity-15 text-9xl pointer-events-none">🦣</div>
      <div className="absolute bottom-12 left-10 opacity-15 text-8xl pointer-events-none">🏹</div>

      {/* Top Cave Header & Fire Torches */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-amber-900/60">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🪨</span>
            <h1 className="text-2xl md:text-3xl font-black tracking-wider text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              OGG-NET: CAVE CHRONICLES
            </h1>
          </div>
          <p className="text-xs tracking-widest text-amber-300/80 font-mono mt-1">
            ERA 10,000 BCE • PROTO-WEB • LIMESTONE CARVING PROTOCOL
          </p>
        </div>

        {/* 3 Interactive Flint Torches for Quest */}
        <div className="flex items-center gap-3 bg-amber-950/60 p-2.5 rounded-xl border border-amber-800/80 shadow-inner">
          <span className="text-xs font-mono text-amber-300 font-bold uppercase mr-1">
            Cave Torches:
          </span>
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={(e) => strikeFlint(e, idx)}
              title={litTorches[idx] ? 'Torch is burning bright!' : 'Click flint to strike spark & light torch'}
              className={`relative flex items-center justify-center w-11 h-11 rounded-lg border-2 transition-all duration-300 ${
                litTorches[idx]
                  ? 'bg-amber-600/40 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-flicker scale-105'
                  : 'bg-stone-900/80 border-stone-700 hover:border-amber-500 hover:scale-105'
              }`}
            >
              {litTorches[idx] ? (
                <Flame className="w-6 h-6 text-amber-300 fill-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,1)]" />
              ) : (
                <span className="text-xl opacity-60">🪨</span>
              )}
              {!litTorches[idx] && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quest Notification Banner */}
      <div className={`mt-4 p-3 rounded-xl border flex items-center justify-between transition-all ${
        questCompleted
          ? 'bg-amber-900/40 border-amber-400 text-amber-200'
          : 'bg-stone-900/60 border-amber-900/50 text-amber-300/90'
      }`}>
        <div className="flex items-center gap-2">
          {questCompleted ? (
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse shrink-0" />
          )}
          <span className="text-sm">
            <strong>{eraData.quest.title}:</strong> {questCompleted ? eraData.quest.successMsg : eraData.quest.instruction}
          </span>
        </div>
        <span className="text-xs font-mono font-bold bg-amber-950 px-2 py-1 rounded border border-amber-800">
          {litTorches.filter(Boolean).length} / 3 TORCHES
        </span>
      </div>

      {/* Annoying Interaction Instruction Bar */}
      <div className="mt-3 bg-stone-900/70 border border-amber-700/40 rounded-lg px-4 py-2 text-xs font-mono text-amber-300/80 flex items-center justify-between">
        <span>🖐️ <strong>STONE AGE RULE:</strong> Drag the heavy tablet left/right or click arrow stones to reveal other pages.</span>
        <span className="text-amber-400 font-bold">TABLET {activeTabletIndex + 1} OF {eraData.articles.length}</span>
      </div>

      {/* Sparks layer */}
      {sparks.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full pointer-events-none animate-ping z-50"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 10px ${s.color}`,
          }}
        />
      ))}

      {/* Main Content Area: Draggable Stone Tablets & Interactive Boulder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left 2 Cols: The Draggable Stone Tablet */}
        <div className="lg:col-span-2 flex flex-col">
          <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="relative flex-1 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 border-4 border-amber-900/70 shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(255,200,100,0.1)] cursor-grab active:cursor-grabbing transition-transform duration-200"
          >
            {/* Tablet Chiseled Edge Detail */}
            <div className="absolute top-2 left-2 right-2 h-1 bg-stone-700/40 rounded" />
            <div className="absolute bottom-2 left-2 right-2 h-1 bg-black/60 rounded" />

            {/* Handprints stamped on this tablet */}
            {handprints
              .filter((p) => p.articleId === currentArticle.id)
              .map((p) => (
                <div
                  key={p.id}
                  className="absolute pointer-events-none opacity-85 transition-opacity"
                  style={{
                    left: `${p.x}px`,
                    top: `${p.y}px`,
                    color: p.color,
                    transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(1.4)`,
                  }}
                >
                  🖐️
                </div>
              ))}

            {/* Article Content */}
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs font-mono bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/60 text-amber-300">
                TABLET NO. 00{activeTabletIndex + 1}
              </span>
              <span className="text-xs text-amber-400/80 font-mono">
                {currentArticle.date} • {currentArticle.author}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-amber-200 mt-4 tracking-wide border-b border-amber-900/60 pb-3">
              {currentArticle.title}
            </h2>

            <p className="text-base md:text-lg text-amber-100/90 leading-relaxed mt-4 font-serif">
              "{currentArticle.content}"
            </p>

            {/* Hidden Secret revealed if Torches Lit */}
            {litTorches.every(Boolean) && (
              <div className="mt-4 p-3 bg-amber-950/60 rounded-xl border border-amber-500/50 text-amber-300 text-sm animate-pulse">
                👁️ <strong>CHRONO-PROPHETIC CARVING REVEALED:</strong> {currentArticle.secretRevealed}
              </div>
            )}

            {/* Bottom Tablet Interactions */}
            <div className="mt-6 pt-4 border-t border-amber-900/60 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={(e) => handleAddHandprint(e, currentArticle.id)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-900 to-amber-800 hover:from-amber-800 hover:to-amber-700 text-amber-100 px-4 py-2 rounded-xl border-2 border-amber-600 shadow-md active:scale-95 transition-all text-sm font-bold"
              >
                <Hand className="w-4 h-4 text-amber-400" />
                Stamp Red Ochre Handprint ({currentArticle.reactions + handprints.filter(p => p.articleId === currentArticle.id).length})
              </button>

              <div className="flex items-center gap-2">
                <button
                  disabled={activeTabletIndex === 0}
                  onClick={() => {
                    setActiveTabletIndex((p) => p - 1);
                    sound.playStoneGrind();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-600 disabled:opacity-30 hover:bg-stone-700 text-amber-300 font-mono text-xs"
                >
                  ◀ PREV SLAB
                </button>
                <button
                  disabled={activeTabletIndex === eraData.articles.length - 1}
                  onClick={() => {
                    setActiveTabletIndex((p) => p + 1);
                    sound.playStoneGrind();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-600 disabled:opacity-30 hover:bg-stone-700 text-amber-300 font-mono text-xs"
                >
                  NEXT SLAB ▶
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Boulder Smashing & Tribe Relics */}
        <div className="flex flex-col gap-4">
          {/* Boulder Smasher Game */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border-2 border-amber-900/60 shadow-xl flex flex-col items-center text-center">
            <h3 className="text-sm font-bold text-amber-400 font-mono uppercase tracking-wider flex items-center gap-2">
              <Hammer className="w-4 h-4 text-amber-500" />
              Smash Boulder for Relic
            </h3>
            <p className="text-xs text-amber-300/70 mt-1">
              {boulderShattered
                ? 'Boulder shattered! Ancient Chrono-Fossil acquired!'
                : `Hit with stone hammer (${4 - boulderHits} strikes remaining)`}
            </p>

            <button
              onClick={smashBoulder}
              disabled={boulderShattered}
              className={`mt-4 w-32 h-32 rounded-3xl flex flex-col items-center justify-center border-4 transition-all duration-150 ${
                boulderShattered
                  ? 'bg-amber-950/40 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                  : 'bg-stone-800 hover:bg-stone-700 border-stone-600 hover:border-amber-500 shadow-2xl active:scale-90 hover:rotate-3'
              }`}
            >
              {boulderShattered ? (
                <div className="animate-bounce">
                  <span className="text-5xl">💎</span>
                  <span className="block text-[10px] font-mono text-amber-300 font-bold mt-1">CHRONO CRYSTAL</span>
                </div>
              ) : (
                <>
                  <span className="text-5xl drop-shadow-md">
                    {boulderHits === 0 ? '🪨' : boulderHits === 1 ? '🔨' : boulderHits === 2 ? '💥' : '⚡'}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-amber-400 mt-2">
                    {boulderHits === 0 ? 'CLICK TO HIT' : `CRACK ${boulderHits}/4`}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Flint Sparker Station */}
          <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-900/60 shadow-xl text-center">
            <h3 className="text-sm font-bold text-amber-400 font-mono uppercase flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Flint & Tinder Station
            </h3>
            <p className="text-xs text-amber-200/70 mt-1">
              Strike rocks to generate sparks for the tribe
            </p>
            <button
              onClick={(e) => strikeFlint(e)}
              className="mt-3 w-full py-3 bg-gradient-to-r from-stone-800 via-amber-900 to-stone-800 hover:from-amber-900 hover:to-amber-800 border-2 border-amber-700 rounded-xl text-amber-200 font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>⚡ STRIKE FLINT ROCKS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
