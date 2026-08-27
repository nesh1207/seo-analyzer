'use client';

import React, { useState } from 'react';
import { AuditItem } from '@/types/analyzer';
import { CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Gauge, ShieldCheck, Search, Info } from 'lucide-react';

interface DiagnosticsTabsProps {
  audits: {
    performance: AuditItem[];
    accessibility: AuditItem[];
    seo: AuditItem[];
    bestPractices: AuditItem[];
  };
}

export const DiagnosticsTabs: React.FC<DiagnosticsTabsProps> = ({ audits }) => {
  const [activeTab, setActiveTab] = useState<'seo' | 'performance' | 'accessibility' | 'bestPractices'>('seo');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const tabs = [
    { id: 'seo', label: 'SEO Audits', items: audits.seo, icon: <Search className="h-4 w-4" /> },
    { id: 'performance', label: 'Performance', items: audits.performance, icon: <Gauge className="h-4 w-4" /> },
    { id: 'accessibility', label: 'Accessibility', items: audits.accessibility, icon: <ShieldCheck className="h-4 w-4" /> },
  ];

  const currentItems = audits[activeTab] || [];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white">
            Detailed Audit Breakdown
          </h3>
          <p className="text-xs text-white">
            Click on any item to view actionable diagnostic advice and technical specifications.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex rounded-xl border border-zinc-800 bg-zinc-950 p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-zinc-950 shadow-md'
                    : 'text-white hover:text-emerald-400'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] ${
                  isActive ? 'bg-zinc-950/20 text-zinc-950 font-extrabold' : 'bg-zinc-800 text-white'
                }`}>
                  {tab.items.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Audit List */}
      <div className="space-y-3">
        {currentItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-xs text-white">
            No audit findings reported for this category.
          </div>
        ) : (
          currentItems.map((item) => {
            const isPassed = item.score === 1 || item.scoreDisplayMode === 'informative';
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/50 transition-all hover:border-zinc-700"
              >
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="flex cursor-pointer items-center justify-between p-4"
                >
                  <div className="flex items-center space-x-3">
                    {isPassed ? (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-400" />
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {item.title}
                      </h4>
                      {item.displayValue && (
                        <p className="mt-0.5 text-xs text-emerald-400/90 font-medium">
                          {item.displayValue}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isPassed
                          ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                          : 'border border-amber-500/20 bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {isPassed ? 'Passed' : 'Fix Needed'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-white" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-zinc-800/60 bg-zinc-900/40 p-4 text-xs text-white">
                    <p className="leading-relaxed text-white">
                      {item.description}
                    </p>
                    {item.details && item.details.items && item.details.items.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <span className="font-semibold text-white">Impacted Elements:</span>
                        <div className="max-h-48 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-2 font-mono text-[11px] text-white">
                          {item.details.items.slice(0, 5).map((detail, idx) => (
                            <div key={idx} className="border-b border-zinc-800/40 py-1 last:border-0">
                              {typeof detail === 'string'
                                ? detail
                                : JSON.stringify(detail).slice(0, 140)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
