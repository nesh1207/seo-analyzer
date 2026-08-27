'use client';

import React from 'react';
import { Gauge, ShieldCheck, Search, Award, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { getScoreColor, getLetterGrade } from '@/lib/utils';

interface ScoreDialsProps {
  scores: {
    performance: number;
    accessibility: number;
    seo: number;
    bestPractices: number;
  };
  passedCount?: number;
  failedCount?: number;
  url: string;
  strategy: 'mobile' | 'desktop';
}

interface ScoreDialItemProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  description: string;
  isPrimary?: boolean;
}

const SingleDial: React.FC<ScoreDialItemProps> = ({
  title,
  score,
  icon,
  description,
  isPrimary = false,
}) => {
  const color = getScoreColor(score);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      className={`group relative flex flex-col items-center rounded-2xl border bg-zinc-900/80 p-6 transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/40 ${
        isPrimary ? 'border-zinc-800' : 'border-zinc-800/80'
      }`}
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -top-12 h-32 w-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: color.hex }}
      />

      {/* Header Title with Icon */}
      <div className="mb-4 flex items-center space-x-2">
        <div className="text-white transition-colors group-hover:text-emerald-400">
          {icon}
        </div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
          {title}
        </h3>
      </div>

      {/* SVG Score Gauge Circle */}
      <div className="relative flex items-center justify-center">
        <svg className="h-36 w-36 -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-zinc-800"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={`transition-all duration-1000 ease-out ${color.ring}`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Numerical Score */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`text-3xl font-extrabold tracking-tight ${color.text}`}>
            {score}
          </span>
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">
            / 100
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-4 flex items-center space-x-1.5">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${color.badgeBg} ${color.badgeText}`}
        >
          <span
            className="mr-1.5 h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: color.hex }}
          />
          {score >= 90 ? 'Optimized' : score >= 50 ? 'Needs Fixes' : 'Critical'}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-center text-xs text-white line-clamp-2">
        {description}
      </p>
    </div>
  );
};

export const ScoreDials: React.FC<ScoreDialsProps> = ({
  scores,
  passedCount = 0,
  failedCount = 0,
  url,
  strategy,
}) => {
  const overallAverage = Math.round(
    (scores.performance + scores.accessibility + scores.seo + scores.bestPractices) / 4
  );
  const gradeInfo = getLetterGrade(overallAverage);

  return (
    <div className="space-y-6">
      {/* Prominent Overall Letter Grade Card */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: gradeInfo.hex }}
        />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Zone SEO Evaluation Report</span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Overall Site Audit Grade for <span className="text-emerald-400">{url}</span>
            </h2>

            <p className="max-w-xl text-xs text-white sm:text-sm leading-relaxed">
              {gradeInfo.summary} Tested on <span className="capitalize font-bold text-white">{strategy}</span> strategy.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="flex items-center space-x-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{passedCount} Passed Audits</span>
              </span>
              {failedCount > 0 && (
                <span className="flex items-center space-x-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1 font-semibold text-rose-400">
                  <span>{failedCount} Need Attention</span>
                </span>
              )}
            </div>
          </div>

          {/* Huge Letter Grade Badge Box */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl min-w-[200px] text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              OVERALL GRADE
            </span>
            <div
              className={`my-2 flex h-24 w-24 items-center justify-center rounded-2xl border-2 text-6xl font-black shadow-2xl transition-transform hover:scale-105 ${gradeInfo.bgColor} ${gradeInfo.borderColor} ${gradeInfo.textColor}`}
            >
              {gradeInfo.grade}
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-lg font-bold text-white">{overallAverage}</span>
              <span className="text-xs text-white font-bold">/ 100 Avg</span>
            </div>
            <span
              className={`mt-2 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${gradeInfo.badgeBg} ${gradeInfo.badgeText}`}
            >
              {gradeInfo.label}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Circular Score Dials Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SingleDial
          title="Performance"
          score={scores.performance}
          icon={<Gauge className="h-5 w-5" />}
          description="Page speed, Core Web Vitals, payload sizes, and rendering efficiency."
          isPrimary
        />
        <SingleDial
          title="Accessibility"
          score={scores.accessibility}
          icon={<ShieldCheck className="h-5 w-5" />}
          description="Color contrast, screen reader compatibility, aria attributes, and tap targets."
          isPrimary
        />
        <SingleDial
          title="SEO Score"
          score={scores.seo}
          icon={<Search className="h-5 w-5" />}
          description="Title tags, meta descriptions, crawlability, canonical links, and indexing eligibility."
          isPrimary
        />
      </div>

      {/* Secondary Best Practices Bar */}
      <div className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-amber-400">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Best Practices Audit</h4>
            <p className="text-xs text-white">HTTPS security, modern web standards, and console error checks.</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`text-2xl font-bold ${getScoreColor(scores.bestPractices).text}`}>
            {scores.bestPractices} / 100
          </span>
        </div>
      </div>
    </div>
  );
};
