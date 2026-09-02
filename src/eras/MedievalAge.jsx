import React, { useState } from 'react';
import { sound } from '../audio/soundEngine';
import { Feather, Bell, Shield, Award, Sparkles, ScrollText, Check } from 'lucide-react';

export default function MedievalAge({ eraData, onProgressQuest, questCompleted, paradoxCount, onAddParadox }) {
  const [scrollUnrollHeight, setScrollUnrollHeight] = useState(380); // in px
  const [stampedSeals, setStampedSeals] = useState([false, false, false]);
  const [quillInkCount, setQuillInkCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [crierMessage, setCrierMessage] = useState(null);
  const [activeArticleIndex, setActiveArticleIndex] = useState(0);

  // Pull ribbon to unroll scroll
  const pullScroll = () => {
    sound.playScrollUnroll();
    setScrollUnrollHeight((prev) => (prev >= 650 ? 380 : prev + 120));
  };

  // Stamp royal wax seal
  const handleStampSeal = (index) => {
    if (stampedSeals[index]) return;
    sound.playWaxCrack();
    const updated = [...stampedSeals];
    updated[index] = true;
    setStampedSeals(updated);

    const total = updated.filter(Boolean).length;
    onProgressQuest(total);
    onAddParadox(4);
  };

  // Dip quill in inkwell
  const handleDipQuill = () => {
    sound.playQuillScratch();
    setQuillInkCount(5);
    sound.playSciFiBeep(1200);
  };

  // Typing search query
  const handleQuillTyping = (e) => {
    if (quillInkCount <= 0) {
      alert('Your feather quill is out of ink! Click the inkwell to dip.');
      return;
    }
    sound.playQuillScratch();
    setSearchQuery(e.target.value);
    setQuillInkCount((prev) => Math.max(0, prev - 1));
  };

  // Ring town crier bell
  const ringCrierBell = () => {
    sound.playBellDing(700);
    const proclamations = [
      '🔔 "OYEZ, OYEZ! By royal decree, anyone carrying strange glowing glass rectangles will be tried for sorcery!"',
      '🔔 "OYEZ! The King demands 400 bushels of grain to feed the dragon trapped in the royal dungeon!"',
      '🔔 "HEAR YE! A strange merchant from the future was spotted trying to sell \'Wi-Fi routers\' to the blacksmith!"'
    ];
    const randomMsg = proclamations[Math.floor(Math.random() * proclamations.length)];
    setCrierMessage(randomMsg);
    onAddParadox(5);
    setTimeout(() => setCrierMessage(null), 7000);
  };

  const filteredArticles = eraData.articles.filter((art) =>
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentArticle = filteredArticles[activeArticleIndex] || eraData.articles[0];

  return (
    <div className="relative min-h-[750px] p-6 text-amber-950 parchment-bg rounded-2xl border-8 border-amber-900 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-medieval select-none">
      {/* Ornate Gold Filigree Corner Accents */}
      <div className="absolute top-2 left-2 text-3xl text-amber-800 opacity-60">⚜️</div>
      <div className="absolute top-2 right-2 text-3xl text-amber-800 opacity-60">⚜️</div>
      <div className="absolute bottom-2 left-2 text-3xl text-amber-800 opacity-60">⚜️</div>
      <div className="absolute bottom-2 right-2 text-3xl text-amber-800 opacity-60">⚜️</div>

      {/* Medieval Header with Stained Glass Aesthetic */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-amber-900/40">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏰</span>
            <h1 className="text-2xl md:text-3xl font-black tracking-wide text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              YE OLDE ROYAL WEBE
            </h1>
          </div>
          <p className="text-xs tracking-widest text-amber-900/80 font-serif italic mt-1">
            ANNO DOMINI 1342 • ILLUMINATED VELLUM ARCHIVE • MONASTIC PROTOCOL
          </p>
        </div>

        {/* Town Crier Bell & Royal Seal Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={ringCrierBell}
            className="flex items-center gap-2 bg-gradient-to-b from-amber-200 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-amber-950 px-3.5 py-2 rounded-xl border-2 border-amber-700 shadow-md font-bold text-xs active:scale-95 transition-all"
          >
            <Bell className="w-4 h-4 text-amber-900 animate-bounce" />
            RING TOWN CRIER BELL
          </button>
        </div>
      </div>

      {/* Town Crier Proclamation Banner */}
      {crierMessage && (
        <div className="mt-3 p-3 bg-red-950 text-amber-100 rounded-xl border-2 border-amber-500 shadow-xl flex items-center gap-3 animate-flicker">
          <span className="text-2xl">📢</span>
          <span className="text-sm font-serif font-bold italic">{crierMessage}</span>
        </div>
      )}

      {/* Quest Notification Banner */}
      <div className={`mt-4 p-3 rounded-xl border flex items-center justify-between transition-all ${
        questCompleted
          ? 'bg-amber-100/90 border-amber-700 text-amber-950'
          : 'bg-amber-200/60 border-amber-800/40 text-amber-900'
      }`}>
        <div className="flex items-center gap-2">
          {questCompleted ? (
            <Award className="w-5 h-5 text-amber-700 shrink-0" />
          ) : (
            <Sparkles className="w-5 h-5 text-amber-700 animate-pulse shrink-0" />
          )}
          <span className="text-sm">
            <strong>{eraData.quest.title}:</strong> {questCompleted ? eraData.quest.successMsg : eraData.quest.instruction}
          </span>
        </div>
        <span className="text-xs font-serif font-bold bg-amber-300/80 px-2.5 py-1 rounded border border-amber-800">
          {stampedSeals.filter(Boolean).length} / 3 SEALS STAMPED
        </span>
      </div>

      {/* Annoying Interaction Instruction Bar */}
      <div className="mt-3 bg-amber-900/10 border border-amber-800/30 rounded-lg px-4 py-2 text-xs font-serif text-amber-900 flex flex-wrap items-center justify-between gap-2">
        <span>📜 <strong>MEDIEVAL RULE:</strong> Pull the golden tassel ribbon on the right to physically unroll this scroll!</span>
        <span className="font-bold text-amber-800">SCROLL HEIGHT: {scrollUnrollHeight}px</span>
      </div>

      {/* Main Grid: Scroll Viewer & Monastic Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left 2 Cols: The Physical Parchment Scroll with Unrolling Ribbon */}
        <div className="lg:col-span-2 relative flex flex-col">
          {/* Top Wooden Scroll Dowel */}
          <div className="h-6 bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 rounded-t-lg border-b-2 border-amber-700 shadow-md flex items-center justify-between px-4">
            <div className="w-4 h-4 rounded-full bg-amber-600 border border-amber-900" />
            <span className="text-[10px] text-amber-200 font-serif tracking-widest uppercase">ROYAL VELLUM ARCHIVE</span>
            <div className="w-4 h-4 rounded-full bg-amber-600 border border-amber-900" />
          </div>

          {/* Scroll Content Body with Dynamic Height */}
          <div
            className="p-6 md:p-8 bg-[#fffaf0] border-x-4 border-amber-900 shadow-inner overflow-y-auto transition-all duration-300 relative"
            style={{ height: `${scrollUnrollHeight}px` }}
          >
            {/* Illuminated First Letter & Article Header */}
            <div className="flex items-center justify-between border-b-2 border-amber-800/30 pb-3">
              <span className="text-xs font-serif font-bold text-amber-800 bg-amber-200/50 px-2.5 py-1 rounded border border-amber-400">
                PROCLAMATION NO. VII
              </span>
              <span className="text-xs italic text-amber-900">
                {currentArticle.date} • {currentArticle.author}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-amber-950 mt-4 tracking-wide">
              {currentArticle.title}
            </h2>

            <div className="mt-4 text-base md:text-lg leading-relaxed text-amber-900 font-serif">
              <span className="float-left text-5xl font-black text-amber-800 leading-none mr-3 p-1 bg-amber-200/60 rounded border border-amber-700">
                {currentArticle.content.charAt(0)}
              </span>
              {currentArticle.content.slice(1)}
            </div>

            {currentArticle.parchmentNote && (
              <div className="mt-6 p-3 bg-amber-100 border-l-4 border-amber-800 text-xs italic text-amber-900">
                📜 <strong>Marginalia Note:</strong> {currentArticle.parchmentNote}
              </div>
            )}

            {/* Article Selector Seals */}
            <div className="mt-8 pt-4 border-t-2 border-amber-800/30 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-serif font-bold">Select Manuscript:</span>
                {eraData.articles.map((art, idx) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      setActiveArticleIndex(idx);
                      sound.playWaxCrack();
                    }}
                    className={`px-3 py-1 text-xs rounded-md border font-serif font-bold transition-all ${
                      activeArticleIndex === idx
                        ? 'bg-amber-800 text-amber-100 border-amber-950 shadow-md'
                        : 'bg-amber-200/80 text-amber-900 border-amber-400 hover:bg-amber-300'
                    }`}
                  >
                    Scroll {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Wooden Scroll Dowel */}
          <div className="h-6 bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 rounded-b-lg border-t-2 border-amber-700 shadow-lg flex items-center justify-center">
            <span className="text-[9px] text-amber-300 font-serif">PULL TASSEL BELOW TO EXPAND OR ROLL</span>
          </div>

          {/* Hanging Pull-String Velvet Tassel Ribbon */}
          <button
            onClick={pullScroll}
            className="self-center mt-1 flex flex-col items-center group cursor-pointer active:translate-y-2 transition-transform"
            title="Click to pull scroll tassel"
          >
            <div className="w-4 h-12 bg-gradient-to-b from-red-800 via-red-700 to-amber-600 rounded-sm shadow-md" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-900 shadow-xl flex items-center justify-center text-xs text-amber-950 font-bold group-hover:scale-110 transition-transform">
              ⚜️
            </div>
            <span className="text-[10px] font-serif font-bold text-amber-900 mt-1 uppercase tracking-widest">
              [ PULL TASSEL ]
            </span>
          </button>
        </div>

        {/* Right 1 Col: Royal Wax Seals Station & Calligraphy Quill */}
        <div className="flex flex-col gap-4">
          {/* Wax Stamping Quest Station */}
          <div className="p-5 rounded-2xl bg-[#fff6e6] border-2 border-amber-800 shadow-md flex flex-col items-center text-center">
            <h3 className="text-sm font-bold text-amber-900 font-serif uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-800" />
              Royal Wax Seal Verification
            </h3>
            <p className="text-xs text-amber-800/80 mt-1">
              Click each hot crimson wax pool to stamp with His Majesty’s signet ring!
            </p>

            <div className="flex items-center justify-center gap-4 mt-4">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => handleStampSeal(idx)}
                  className={`w-16 h-16 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-200 ${
                    stampedSeals[idx]
                      ? 'bg-gradient-to-br from-red-700 to-red-950 border-amber-400 shadow-[0_0_15px_rgba(185,28,28,0.7)] scale-105'
                      : 'bg-red-900/40 border-dashed border-red-800 hover:bg-red-900/60 hover:scale-105 cursor-pointer'
                  }`}
                >
                  {stampedSeals[idx] ? (
                    <>
                      <span className="text-xl">👑</span>
                      <span className="text-[8px] text-amber-300 font-bold">SEALED</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl opacity-50">🕯️</span>
                      <span className="text-[8px] text-red-900 font-bold">STAMP</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quill Search & Inkwell Station */}
          <div className="p-5 rounded-2xl bg-[#fff6e6] border-2 border-amber-800 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-900 font-serif uppercase flex items-center gap-2">
                <Feather className="w-4 h-4 text-amber-800" />
                Quill Scribe & Search
              </h3>
              {/* Inkwell Button */}
              <button
                onClick={handleDipQuill}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950 text-amber-200 rounded-lg text-xs font-serif hover:bg-amber-900 active:scale-95 shadow"
              >
                <span>🖋️ Dip Ink ({quillInkCount}/5)</span>
              </button>
            </div>

            <p className="text-xs text-amber-800/80 mt-2">
              Inscribe letters with feather quill to search royal archives:
            </p>

            <input
              type="text"
              value={searchQuery}
              onChange={handleQuillTyping}
              placeholder="Search dragons, alchemy, knights..."
              className="mt-3 w-full p-2.5 rounded-lg bg-amber-50 border-2 border-amber-700 text-amber-950 font-serif text-sm focus:outline-none focus:ring-2 focus:ring-amber-800 placeholder-amber-900/40"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
