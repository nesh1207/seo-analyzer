'use client';

import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo + Brand */}
        <div
          onClick={onReset}
          className="flex cursor-pointer items-center space-x-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl overflow-hidden border border-red-800/40 shadow-lg shadow-red-900/20 bg-zinc-900">
            <Image
              src="/logo.png"
              alt="DInfinite Tech Services Logo"
              width={44}
              height={44}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white">
              ZONE <span className="text-red-500">SEO</span>
            </span>
            <p className="hidden text-[10px] text-zinc-400 sm:block font-medium leading-none mt-0.5">
              Powered by DInfinite Tech Services
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-400">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#education" className="hover:text-white transition-colors">Learn SEO</a>
          <a href="#clients" className="hover:text-white transition-colors">Clients</a>
        </nav>

        {/* CTA */}
        <a
          href="https://wa.me/601111722010"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:brightness-110 transition-all"
        >
          <span>Contact Us</span>
        </a>
      </div>
    </header>
  );
};
