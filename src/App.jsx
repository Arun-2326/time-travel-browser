import React, { useState, useEffect } from 'react';
import { ERAS, PARADOX_EVENTS } from './data/eraContent';
import { sound } from './audio/soundEngine';
import BrowserChrome from './components/BrowserChrome';
import WarpPortal from './components/WarpPortal';
import ParadoxOverlay from './components/ParadoxOverlay';

// Era Views
import StoneAge from './eras/StoneAge';
import MedievalAge from './eras/MedievalAge';
import IndustrialAge from './eras/IndustrialAge';
import PresentAge from './eras/PresentAge';
import FutureAge from './eras/FutureAge';

import { Sparkles, Trophy, RotateCw, History, ExternalLink, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [targetEra, setTargetEra] = useState(null);
  const [paradoxCount, setParadoxCount] = useState(15);
  const [activeParadoxEvent, setActiveParadoxEvent] = useState(null);
  const [isAutoLoop, setIsAutoLoop] = useState(false);
  const [completedQuests, setCompletedQuests] = useState({});
  const [showLogDrawer, setShowLogDrawer] = useState(false);

  const currentEra = ERAS[currentEraIndex];

  // Auto loop timer
  useEffect(() => {
    let interval;
    if (isAutoLoop && !isWarping) {
      interval = setInterval(() => {
        handleNextEra();
      }, 16000);
    }
    return () => clearInterval(interval);
  }, [isAutoLoop, currentEraIndex, isWarping]);

  // Transition to a specific era with warp animation
  const handleSelectEra = (eraId) => {
    const nextIdx = ERAS.findIndex((e) => e.id === eraId);
    if (nextIdx === -1 || nextIdx === currentEraIndex) return;

    setTargetEra(ERAS[nextIdx]);
    setIsWarping(true);
    sound.playWarpDrive();

    setTimeout(() => {
      setCurrentEraIndex(nextIdx);
      setIsWarping(false);
      setTargetEra(null);
      // Era transition adds slight paradox flux
      addParadox(5);
    }, 1400);
  };

  // Next era in chronological loop
  const handleNextEra = () => {
    const nextIdx = (currentEraIndex + 1) % ERAS.length;
    handleSelectEra(ERAS[nextIdx].id);
  };

  // Add paradox points
  const addParadox = (amount) => {
    setParadoxCount((prev) => {
      const next = prev + amount;
      if (next >= 100) {
        sound.playParadoxGlitch();
        const randEvent = PARADOX_EVENTS[Math.floor(Math.random() * PARADOX_EVENTS.length)];
        setActiveParadoxEvent(randEvent);
        return 100;
      }
      return next;
    });
  };

  // Reset paradox
  const resetParadox = () => {
    setParadoxCount(0);
    sound.playSciFiBeep(1200);
  };

  // Trigger manual paradox
  const triggerManualParadox = () => {
    sound.playParadoxGlitch();
    const randEvent = PARADOX_EVENTS[Math.floor(Math.random() * PARADOX_EVENTS.length)];
    setActiveParadoxEvent(randEvent);
  };

  // Mark era quest progress
  const handleProgressQuest = (progress) => {
    const era = currentEra.id;
    if (progress >= (currentEra.quest.total || 1)) {
      if (!completedQuests[era]) {
        setCompletedQuests((prev) => ({ ...prev, [era]: true }));
        sound.playBellDing(1200);
      }
    }
  };

  const allQuestsDone = ERAS.every((e) => completedQuests[e.id]);

  // Render current era component
  const renderEraComponent = () => {
    const props = {
      eraData: currentEra,
      onProgressQuest: handleProgressQuest,
      questCompleted: !!completedQuests[currentEra.id],
      paradoxCount,
      onAddParadox: addParadox,
    };

    switch (currentEra.id) {
      case 'stone':
        return <StoneAge {...props} />;
      case 'medieval':
        return <MedievalAge {...props} />;
      case 'industrial':
        return <IndustrialAge {...props} />;
      case 'present':
        return <PresentAge {...props} />;
      case 'future':
        return <FutureAge {...props} />;
      default:
        return <StoneAge {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center">
      {/* Warp Portal Overlay */}
      <WarpPortal isWarping={isWarping} targetEra={targetEra} />

      {/* Paradox Glitch Modal */}
      <ParadoxOverlay
        activeEvent={activeParadoxEvent}
        onClose={() => setActiveParadoxEvent(null)}
        onResetParadox={resetParadox}
      />

      {/* Master Container */}
      <div className="w-full max-w-7xl px-3 py-4 md:px-6 md:py-6 flex flex-col min-h-screen">
        {/* Top Browser Header Frame */}
        <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl flex flex-col">
          {/* Universal Browser Chrome */}
          <BrowserChrome
            currentEra={currentEra}
            eras={ERAS}
            onSelectEra={handleSelectEra}
            onNextEra={handleNextEra}
            paradoxCount={paradoxCount}
            onTriggerParadoxEvent={triggerManualParadox}
            isAutoLoop={isAutoLoop}
            onToggleAutoLoop={() => setIsAutoLoop(!isAutoLoop)}
          />

          {/* Era Content Viewport */}
          <div className="p-3 md:p-6 bg-neutral-950/80">
            {renderEraComponent()}
          </div>
        </div>

        {/* Global Bottom Status Bar: Quests & Time Travel Progress */}
        <div className="mt-4 p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
          {/* Quest Tracker Across All 5 Eras */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>CHRONO-RELICS:</span>
            </div>
            <div className="flex items-center gap-2">
              {ERAS.map((e) => (
                <div
                  key={e.id}
                  title={`${e.name}: ${completedQuests[e.id] ? 'Relic Found!' : 'Relic Unexplored'}`}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
                    completedQuests[e.id]
                      ? 'bg-amber-950/60 border-amber-500 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-500'
                  }`}
                >
                  <span>{e.icon}</span>
                  <span className="hidden sm:inline">{e.name.split(' ')[0]}</span>
                  <span>{completedQuests[e.id] ? '✓' : '○'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Master Timeline Stabilizer Badge */}
          {allQuestsDone && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500 rounded-xl text-neutral-950 font-bold text-xs shadow-lg animate-bounce">
              <Sparkles className="w-4 h-4 text-white" />
              <span>TIME LOOP MASTERED! ALL 5 ERAS STABILIZED!</span>
            </div>
          )}

          {/* Guide / Lore Info */}
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="hidden md:inline">Current Epoch: <strong>{currentEra.period}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
