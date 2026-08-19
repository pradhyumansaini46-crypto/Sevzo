import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff, Sparkles, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language, Zone } from '../types';

interface SmartSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  language: Language;
  currentZone: Zone;
  onSelectCategory?: (category: string) => void;
}

export const SmartSearchBar: React.FC<SmartSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  language,
  currentZone,
  onSelectCategory,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState<{
    intent?: string;
    category?: string;
    matchedKeywords?: string[];
    friendlyReply?: string;
    instantRecommendations?: Array<{ name: string; category: string; reason: string; estimatedPriceINR: number }>;
  } | null>(null);

  const quickSearchTags = [
    { label: '⚡ Cold Sting Drink', query: 'Sting energy drink' },
    { label: '💊 Dolo 650 & Bandages', query: 'Dolo 650' },
    { label: '🍜 Shin Ramyun', query: 'Shin Ramyun' },
    { label: '🥛 Amul Milk', query: 'Amul Milk' },
    { label: '🔧 AC Jet Service', query: 'AC Service' },
    { label: '🏭 3M Safety Mask', query: '3M safety mask' },
    { label: '🔌 65W Fast Cable', query: 'Type-C cable' }
  ];

  // Voice Search simulation
  const handleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    const demoVoiceQueries = [
      'Dolo 650 aur band-aid jaldi deliver karo',
      'Thanda doodh aur Maggi noodles',
      'Japanese ramen aur green tea',
      'Emergency electrician for factory switchboard',
      '3M safety mask pack for shift work'
    ];
    const picked = demoVoiceQueries[Math.floor(Math.random() * demoVoiceQueries.length)];

    setTimeout(() => {
      setSearchQuery(picked);
      setIsListening(false);
      triggerAiSearch(picked);
    }, 2000);
  };

  const triggerAiSearch = async (text: string) => {
    if (!text || text.trim().length < 2) {
      setAiInsight(null);
      return;
    }

    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/smart-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, zone: currentZone.name }),
      });
      const data = await res.json();
      if (data && data.success && data.data) {
        setAiInsight(data.data);
      }
    } catch {
      // Local fallback
      setAiInsight({
        friendlyReply: `⚡ Fast 10-12 min delivery for "${text}" in ${currentZone.name}`,
        matchedKeywords: [text],
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      triggerAiSearch(searchQuery);
    }
  };

  return (
    <div className="w-full relative">
      {/* Search Input Container */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center gap-1">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value.length > 2) {
              // Debounced search trigger
              const timer = setTimeout(() => triggerAiSearch(e.target.value), 600);
              return () => clearTimeout(timer);
            } else {
              setAiInsight(null);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            language === 'hi'
              ? 'सर्च करें: "दूध, डोलो 650, शिन रामेन, एसी रिपेयर, सेफ्टी मास्क..."'
              : 'Search anything: "Dolo 650, Amul milk, Shin Ramyun, AC repair, 3M mask..."'
          }
          className="w-full bg-white hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-500 text-slate-900 pl-11 pr-24 py-3.5 rounded-2xl text-sm md:text-base outline-none shadow-xs transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/10 font-medium"
        />

        {/* Clear & Voice button */}
        <div className="absolute right-3 flex items-center gap-1.5">
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setAiInsight(null);
              }}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleVoiceSearch}
            className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
            title="Voice Search (Hindi + English)"
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                <span className="text-[10px] font-bold hidden sm:inline">Listening...</span>
              </>
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* AI Smart Search Live Insight Card */}
      {aiInsight && (
        <div className="mt-2.5 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-lg text-xs animate-in fade-in slide-in-from-top-1 text-slate-900">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>SevaZo AI Multilingual Intent Matcher</span>
            </div>
            {aiInsight.category && (
              <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px] border border-emerald-200">
                {aiInsight.category}
              </span>
            )}
          </div>

          <p className="text-slate-800 font-medium mb-2">
            {aiInsight.friendlyReply || `Searching for ${searchQuery} in ${currentZone.name}...`}
          </p>

          {aiInsight.instantRecommendations && aiInsight.instantRecommendations.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              <span className="text-slate-500 text-[11px] self-center">Instant Picks:</span>
              {aiInsight.instantRecommendations.map((rec, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(rec.name);
                    if (onSelectCategory && rec.category) {
                      onSelectCategory(rec.category);
                    }
                  }}
                  className="bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-all text-[11px] cursor-pointer"
                >
                  <span>{rec.name}</span>
                  <span className="text-emerald-700 font-bold">₹{rec.estimatedPriceINR}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Search Chips */}
      <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-slate-500 text-[11px] whitespace-nowrap flex items-center gap-1 font-medium">
          <Sparkles className="w-3 h-3 text-orange-500" />
          Trending:
        </span>
        {quickSearchTags.map((tag, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSearchQuery(tag.query);
              triggerAiSearch(tag.query);
            }}
            className="bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 whitespace-nowrap transition-all text-[11px] cursor-pointer shadow-2xs font-medium"
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
};
