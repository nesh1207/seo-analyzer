'use client';

import React, { useState } from 'react';
import { Globe, Smartphone, Monitor, ArrowRight, X, Sparkles } from 'lucide-react';

interface HeroSearchProps {
  onAnalyze: (url: string, strategy: 'mobile' | 'desktop') => void;
  isLoading: boolean;
}

const PRESETS = [
  { name: 'e-serve.co', url: 'https://www.e-serve.co' },
  { name: 'Vercel', url: 'https://vercel.com' },
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
    <div className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Animated glow blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-gradient-to-tr from-red-700/20 via-red-500/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-0 -z-10 h-72 w-72 rounded-full bg-red-800/10 blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-400 backdrop-blur-sm mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Free SEO Audit Tool — Powered by DInfinite Tech Services</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
          Dominate Search Rankings<br />
          <span className="bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent">
            with ZONE SEO
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-300 sm:text-lg leading-relaxed">
          Get a free instant audit for any website. Uncover performance bottlenecks, SEO issues, and accessibility gaps — then let our experts at Zone SEO fix them for you.
        </p>

        {/* Search Form */}
        <div className="mx-auto mt-10 max-w-2xl">
          <form onSubmit={handleSubmit} className="relative">
            <div className="group relative flex flex-col gap-3 rounded-2xl border border-zinc-700 bg-zinc-900/90 p-3 shadow-2xl shadow-black/60 transition-all duration-200 focus-within:border-red-500/60 focus-within:ring-2 focus-within:ring-red-500/20 sm:flex-row sm:items-center">
              <div className="relative flex flex-1 items-center px-2">
                <Globe className="h-5 w-5 flex-shrink-0 text-zinc-400 transition-colors group-focus-within:text-red-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (inputError) setInputError('');
                  }}
                  placeholder="Enter website URL (e.g. yoursite.com)..."
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
                  disabled={isLoading}
                />
                {url && !isLoading && (
                  <button type="button" onClick={() => setUrl('')} className="p-1 text-zinc-500 hover:text-red-400">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800 pt-2.5 sm:border-t-0 sm:border-l sm:pl-3 sm:pt-0">
                <div className="flex rounded-xl bg-zinc-950/80 p-1 border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setStrategy('mobile')}
                    className={`flex items-center space-x-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      strategy === 'mobile'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
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
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    <span>Desktop</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="ml-2 flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
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

          {inputError && (
            <p className="mt-2 text-left text-xs font-medium text-rose-400">{inputError}</p>
          )}

          {/* Presets */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-500">Try:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handlePresetClick(preset.url)}
                disabled={isLoading}
                className="rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-zinc-300 font-medium transition-all hover:border-red-500/50 hover:bg-zinc-800 hover:text-red-400"
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
