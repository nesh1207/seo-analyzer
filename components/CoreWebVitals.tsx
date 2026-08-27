'use client';

import React from 'react';
import { CoreVitalMetric } from '@/types/analyzer';
import { Activity, Clock, Zap, MoveHorizontal, Layout } from 'lucide-react';

interface CoreWebVitalsProps {
  metrics: {
    fcp: CoreVitalMetric;
    lcp: CoreVitalMetric;
    cls: CoreVitalMetric;
    tbt: CoreVitalMetric;
    speedIndex: CoreVitalMetric;
    tti: CoreVitalMetric;
  };
}

export const CoreWebVitals: React.FC<CoreWebVitalsProps> = ({ metrics }) => {
  const metricList = [
    { key: 'lcp', label: 'Largest Contentful Paint (LCP)', item: metrics.lcp, icon: <Clock className="h-4 w-4" /> },
    { key: 'fcp', label: 'First Contentful Paint (FCP)', item: metrics.fcp, icon: <Zap className="h-4 w-4" /> },
    { key: 'cls', label: 'Cumulative Layout Shift (CLS)', item: metrics.cls, icon: <Layout className="h-4 w-4" /> },
    { key: 'tbt', label: 'Total Blocking Time (TBT)', item: metrics.tbt, icon: <Activity className="h-4 w-4" /> },
    { key: 'speedIndex', label: 'Speed Index', item: metrics.speedIndex, icon: <MoveHorizontal className="h-4 w-4" /> },
    { key: 'tti', label: 'Time to Interactive (TTI)', item: metrics.tti, icon: <Clock className="h-4 w-4" /> },
  ];

  const getStatusBadge = (status: 'good' | 'needs-improvement' | 'poor') => {
    if (status === 'good') {
      return (
        <span className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
          Good
        </span>
      );
    }
    if (status === 'needs-improvement') {
      return (
        <span className="inline-flex items-center rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-400">
          Needs Work
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-400">
        Poor
      </span>
    );
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white">
            Core Web Vitals & Real-User Field Metrics
          </h3>
          <p className="text-xs text-white">
            Key metrics used by Google Search algorithms to measure page experience and speed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metricList.map(({ key, label, item, icon }) => {
          if (!item) return null;
          return (
            <div
              key={key}
              className="flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 transition-colors hover:border-zinc-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-white">
                  {icon}
                  <span className="text-xs font-semibold text-white">{label}</span>
                </div>
                {getStatusBadge(item.status)}
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  {item.value}
                </span>
                <span className="text-[10px] text-white font-semibold uppercase tracking-wider">
                  Target: {key === 'cls' ? '< 0.1' : key === 'tbt' ? '< 200ms' : '< 2.5s'}
                </span>
              </div>

              <p className="mt-2 text-[11px] leading-relaxed text-white line-clamp-2">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
