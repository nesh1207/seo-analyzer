'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Zap, ShieldCheck, Search, Activity, CheckCircle2, Globe, Cpu, Database, Award } from 'lucide-react';

interface LoadingSkeletonProps {
  url: string;
  durationSeconds?: number;
}

const SCAN_STEPS = [
  { text: 'Crawling website structure & DOM hierarchy...', icon: <Globe className="h-4 w-4 text-emerald-400" /> },
  { text: 'Analyzing Core Web Vitals & PageSpeed metrics...', icon: <Zap className="h-4 w-4 text-teal-400" /> },
  { text: 'Checking local SEO footprints & GBP signals...', icon: <Search className="h-4 w-4 text-cyan-400" /> },
  { text: 'Evaluating mobile & desktop responsiveness...', icon: <Cpu className="h-4 w-4 text-amber-400" /> },
  { text: 'Auditing accessibility, color contrast & ARIA roles...', icon: <ShieldCheck className="h-4 w-4 text-purple-400" /> },
  { text: 'Inspecting Schema markup & canonical headers...', icon: <Database className="h-4 w-4 text-pink-400" /> },
  { text: 'Compiling final letter grade & action plan...', icon: <Award className="h-4 w-4 text-emerald-400" /> },
];

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  url,
  durationSeconds = 35,
}) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const totalMs = durationSeconds * 1000;
    const intervalMs = 100;
    const increment = (100 / (totalMs / intervalMs));

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }

        // Calculate current step index based on progress percentage
        const currentStep = Math.min(
          SCAN_STEPS.length - 1,
          Math.floor((next / 100) * SCAN_STEPS.length)
        );
        setStepIndex(currentStep);

        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [durationSeconds]);

  const activeStep = SCAN_STEPS[stepIndex];

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Heavy Lifting Animated Progress Card */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 text-center shadow-2xl backdrop-blur-md">
        {/* Glow backdrop */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-full max-w-lg -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl" />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-xl shadow-emerald-500/20">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
        </div>

        <h3 className="mt-5 text-2xl font-extrabold text-white">
          Performing Heavy Lifting Analysis for{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            {url}
          </span>
        </h3>
        <p className="mt-1 text-xs text-zinc-400 font-medium">
          Powered by Zone SEO Diagnostics Engine
        </p>

        {/* Dynamic Status Text */}
        <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-zinc-800/90 bg-zinc-950/80 p-4 shadow-inner">
          <div className="flex items-center justify-center space-x-2 text-sm font-semibold text-zinc-200">
            {activeStep.icon}
            <span className="animate-pulse">{activeStep.text}</span>
          </div>

          {/* Numerical Progress % */}
          <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
            <span className="font-semibold text-emerald-400">Deep Audit Progress</span>
            <span className="font-bold text-white text-base">{Math.round(progress)}%</span>
          </div>

          {/* Smooth Progress Bar */}
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-150 ease-out shadow-lg shadow-emerald-500/30"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Sequence Indicators */}
        <div className="mt-6 grid grid-cols-2 gap-2 text-left sm:grid-cols-4 lg:grid-cols-7">
          {SCAN_STEPS.map((step, idx) => {
            const isCompleted = idx < stepIndex;
            const isCurrent = idx === stepIndex;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center rounded-xl border p-2 text-center transition-all ${
                  isCompleted
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400'
                    : isCurrent
                    ? 'border-emerald-400 bg-emerald-500/10 text-white shadow-md shadow-emerald-500/20 scale-105'
                    : 'border-zinc-800/80 bg-zinc-950/40 text-zinc-600'
                }`}
              >
                <div className="mb-1 text-xs">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <span className="text-[10px] font-bold">Step {idx + 1}</span>
                  )}
                </div>
                <span className="text-[9px] font-medium line-clamp-1">
                  {step.text.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pulsing Skeleton Preview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 opacity-60">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6"
          >
            <div className="h-4 w-28 rounded bg-zinc-800 animate-pulse" />
            <div className="mt-6 h-36 w-36 rounded-full border-8 border-zinc-800 bg-zinc-900 animate-pulse" />
            <div className="mt-4 h-6 w-24 rounded-full bg-zinc-800 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
