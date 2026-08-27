'use client';

import React, { useState } from 'react';
import { Globe, Smartphone, Monitor, ArrowRight, X, Sparkles } from 'lucide-react';

interface HeroSearchProps {
  onAnalyze: (url: string, strategy: 'mobile' | 'desktop') => void;
  isLoading: boolean;
}

const PRESETS = [
  { name: 'Vercel', url: 'https://vercel.com' },
  { name: 'Stripe', url: 'https://stripe.com' },
  { name: 'GitHub', url: 'https://github.com' },
];

export const HeroSearch: React.FC<HeroSearchProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setInputError('Please enter a website URL');
      return;
    }
    setInputError('');
    onAnalyze(url.trim(), strategy);
  };

  const handlePresetClick = (presetUrl: string) => {
    setUrl(presetUrl);
    setInputError('');
    onAnalyze(presetUrl, strategy);
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16">
      {/* Background glow graphics */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-full max-w-4xl -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Powered by Zone SEO Diagnostic Suite</span>
        </div>

        {/* Hero Title */}
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Analyze Any Website's <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            SEO & Core Performance
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-white sm:text-lg font-normal">
          Instant deep scanning engine. Get letter grades for Performance, Accessibility, and SEO, plus an actionable Local SEO checklist.
        </p>

        {/* Form Search Container */}
        <div className="mx-auto mt-8 max-w-2xl">
          <form onSubmit={handleSubmit} className="relative">
            <div className="group relative flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-2.5 shadow-2xl shadow-black/60 transition-all duration-200 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 sm:flex-row sm:items-center">
              
              {/* URL Input */}
              <div className="relative flex flex-1 items-center px-2">
                <Globe className="h-5 w-5 flex-shrink-0 text-white transition-colors group-focus-within:text-emerald-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (inputError) setInputError('');
                  }}
                  placeholder="Enter website URL (e.g. vercel.com)..."
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-zinc-300 focus:outline-none"
                  disabled={isLoading}
                />
                {url && !isLoading && (
                  <button
                    type="button"
                    onClick={() => setUrl('')}
                    className="p-1 text-white hover:text-emerald-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Strategy Selector (Mobile vs Desktop) */}
              <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2.5 sm:border-t-0 sm:border-l sm:pl-3 sm:pt-0">
                <div className="flex rounded-xl bg-zinc-950/80 p-1 border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setStrategy('mobile')}
                    className={`flex items-center space-x-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      strategy === 'mobile'
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-semibold'
                        : 'text-white hover:text-emerald-400'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>Mobile</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStrategy('desktop')}
                    className={`flex items-center space-x-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      strategy === 'desktop'
                        ? 'bg-emerald-500 text-zinc-950 shadow-md font-semibold'
                        : 'text-white hover:text-emerald-400'
                    }`}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    <span>Desktop</span>
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="ml-2 flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all hover:brightness-110 hover:shadow-emerald-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Validation Error Message */}
          {inputError && (
            <p className="mt-2 text-left text-xs font-medium text-rose-400">
              {inputError}
            </p>
          )}

          {/* Quick Try Presets */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white">
            <span className="font-semibold text-white">Quick Try:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handlePresetClick(preset.url)}
                disabled={isLoading}
                className="rounded-lg border border-zinc-700 bg-zinc-900/80 px-2.5 py-1 text-white font-medium transition-all hover:border-emerald-500/50 hover:bg-zinc-800 hover:text-emerald-400"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
