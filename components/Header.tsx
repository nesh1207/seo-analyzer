'use client';

import React from 'react';
import { Zap, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div 
          onClick={onReset}
          className="flex cursor-pointer items-center space-x-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-zinc-950">
              <Zap className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold tracking-tight text-white">
                SEO Pulse<span className="text-emerald-400">Analyzer</span>
              </span>
              <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                PRO AUDIT
              </span>
            </div>
            <p className="hidden text-xs text-white sm:block font-medium">
              Powered by Zone SEO
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-xs text-white rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 font-semibold">
            <Award className="h-4 w-4 text-emerald-400" />
            <span>Powered by Zone SEO</span>
          </div>
        </div>
      </div>
    </header>
  );
};
