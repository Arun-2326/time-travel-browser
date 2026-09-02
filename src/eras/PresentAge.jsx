import React, { useState } from 'react';
import { sound } from '../audio/soundEngine';
import { ThumbsUp, MessageSquare, Share2, Award, Sparkles, Filter, CheckCircle, Cookie, X, Bell } from 'lucide-react';

export default function PresentAge({ eraData, onProgressQuest, questCompleted, paradoxCount, onAddParadox }) {
  const [likes, setLikes] = useState({ ai_news: 14200, crypto_time: 8920, remote_work: 24500 });
  const [likedArticles, setLikedArticles] = useState({});
  const [selectedTag, setSelectedTag] = useState('All');
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [shareToast, setShareToast] = useState(null);
  const [cookieToggles, setCookieToggles] = useState({ analytics: true, advertising: true, neuralTracking: true });

  const handleLike = (articleId) => {
    sound.playModernPing();
    const isLiked = likedArticles[articleId];
    setLikedArticles({ ...likedArticles, [articleId]: !isLiked });
    setLikes({ ...likes, [articleId]: likes[articleId] + (isLiked ? -1 : 1) });
    onAddParadox(2);
  };

  const handleShare = (title) => {
    sound.playModernClick();
    setShareToast(`Link copied to clipboard: "${title.slice(0, 30)}..."`);
    setTimeout(() => setShareToast(null), 3000);
  };

  const handleDismissCookie = () => {
    sound.playModernClick();
    setShowCookieBanner(false);
    onProgressQuest(1);
  };

  const filteredArticles = selectedTag === 'All'
    ? eraData.articles
    : eraData.articles.filter(a => a.tag.toLowerCase().includes(selectedTag.toLowerCase()));

  return (
    <div className="relative min-h-[750px] p-6 bg-neutral-900 text-neutral-100 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden font-modern select-none">
      {/* Share Toast */}
      {shareToast && (
        <div className="absolute top-6 right-6 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-blue-400 animate-bounce text-xs font-semibold">
          <CheckCircle className="w-4 h-4" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Cookie Monster Banner Parody */}
      {showCookieBanner && (
        <div className="fixed inset-x-4 bottom-6 md:inset-x-auto md:right-8 md:bottom-8 max-w-md z-50 p-5 bg-neutral-900/95 backdrop-blur-md rounded-2xl border-2 border-blue-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-neutral-200 animate-float">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <Cookie className="w-5 h-5" />
              <span>We Value Your 428 Tracking Pixels</span>
            </div>
            <button onClick={handleDismissCookie} className="text-neutral-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
            This modern 2026 website stores cookies across 5 parallel dimensions to optimize your dopamine intake and track your time travel habits.
          </p>
          <div className="mt-3 space-y-1.5 text-xs text-neutral-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={cookieToggles.analytics} onChange={(e) => setCookieToggles({...cookieToggles, analytics: e.target.checked})} className="rounded text-blue-600" />
              <span>Omnipresent Telemetry & Heatmaps</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={cookieToggles.advertising} onChange={(e) => setCookieToggles({...cookieToggles, advertising: e.target.checked})} className="rounded text-blue-600" />
              <span>Quantum Ad Retargeting</span>
            </label>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleDismissCookie}
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
            >
              ACCEPT ALL 428 COOKIES
            </button>
            <button
              onClick={handleDismissCookie}
              className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-medium border border-neutral-700 active:scale-95"
            >
              Reject (Lie)
            </button>
          </div>
        </div>
      )}

      {/* Modern SaaS Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">💻</span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              OmniCloud Feed v3.8
            </h1>
          </div>
          <p className="text-xs tracking-wider text-neutral-400 font-mono mt-1">
            2026 MODERN WEB • REACT / TAILWIND ARCHITECTURE • INFINITE SCROLL
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-1.5 bg-neutral-800/80 p-1 rounded-xl border border-neutral-700">
          {['All', 'AI', 'Crypto', 'Lifestyle'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
                sound.playModernClick();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Quest Notification Banner */}
      <div className={`mt-4 p-3 rounded-xl border flex items-center justify-between transition-all ${
        questCompleted
          ? 'bg-blue-950/40 border-blue-500/50 text-blue-200'
          : 'bg-neutral-800/50 border-neutral-700 text-neutral-300'
      }`}>
        <div className="flex items-center gap-2">
          {questCompleted ? (
            <Award className="w-5 h-5 text-blue-400 shrink-0" />
          ) : (
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse shrink-0" />
          )}
          <span className="text-sm">
            <strong>{eraData.quest.title}:</strong> {questCompleted ? eraData.quest.successMsg : eraData.quest.instruction}
          </span>
        </div>
        <span className="text-xs font-mono font-bold bg-neutral-800 px-2.5 py-1 rounded border border-neutral-700">
          {questCompleted ? 'COMPLETED' : 'PENDING ACTION'}
        </span>
      </div>

      {/* Annoying Interaction Instruction Bar */}
      <div className="mt-3 bg-blue-950/20 border border-blue-800/30 rounded-lg px-4 py-2 text-xs font-mono text-blue-300/80 flex items-center justify-between">
        <span>💻 <strong>PRESENT DAY RULE:</strong> Standard responsive cards, upvotes, sharing, and cookie consent modals.</span>
        <span className="text-blue-400 font-bold">{filteredArticles.length} POSTS LOADED</span>
      </div>

      {/* Modern Card Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {filteredArticles.map((art) => {
          const isLiked = likedArticles[art.id];
          const currentLikes = likes[art.id] || art.likes;

          return (
            <div
              key={art.id}
              className="p-5 rounded-2xl bg-neutral-800/50 border border-neutral-700/80 hover:border-blue-500/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-800/40">
                    {art.tag}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {art.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-100 mt-3 group-hover:text-blue-300 transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-neutral-300/80 mt-2.5 leading-relaxed">
                  {art.content}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-700/60 flex items-center justify-between">
                <button
                  onClick={() => handleLike(art.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isLiked
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-neutral-700/50 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                  <span>{currentLikes.toLocaleString()}</span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{art.comments}</span>
                  </div>

                  <button
                    onClick={() => handleShare(art.title)}
                    title="Share post"
                    className="p-1.5 rounded-lg bg-neutral-700/40 text-neutral-300 hover:text-white hover:bg-neutral-700"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
