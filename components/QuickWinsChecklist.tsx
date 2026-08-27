'use client';

import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, MapPin, Tag, Calendar, FileCheck, Code2, Sparkles, Send, ShieldCheck, ChevronRight } from 'lucide-react';
import { LeadCaptureModal } from './LeadCaptureModal';

interface ChecklistItem {
  id: string;
  title: string;
  category: 'GBP & NAP' | 'SEO Technical' | 'Content Cadence' | 'Schema';
  icon: React.ReactNode;
  summary: string;
  impact: 'High' | 'Critical' | 'Medium';
  actionStep: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'nap-consistency',
    title: 'NAP Consistency (Name, Address, Phone)',
    category: 'GBP & NAP',
    icon: <MapPin className="h-4 w-4 text-emerald-400" />,
    summary: 'Ensure Name, Address, and Phone number match identically across your website footer, Google Business Profile, Apple Maps, Yelp, and local directories.',
    impact: 'Critical',
    actionStep: 'Verify spelling, suite numbers, and phone formats. Add matching JSON-LD Schema markup on your homepage footer.',
  },
  {
    id: 'primary-category',
    title: 'Primary Category Optimization in GBP',
    category: 'GBP & NAP',
    icon: <Tag className="h-4 w-4 text-cyan-400" />,
    summary: 'Select your most specific primary category on Google Business Profile (e.g., "Emergency Dentist" instead of generic "Dentist").',
    impact: 'High',
    actionStep: 'Review Google Map Pack top 3 competitors in your city to identify high-converting secondary categories.',
  },
  {
    id: 'weekly-posts',
    title: 'Weekly Google Post & Geotagged Photo Cadence',
    category: 'Content Cadence',
    icon: <Calendar className="h-4 w-4 text-amber-400" />,
    summary: 'Maintain a 7-day posting schedule on GBP with special offers, geotagged team photos, and direct CTA buttons (Call Now / Visit Website).',
    impact: 'High',
    actionStep: 'Upload 2-3 fresh original photos weekly. Avoid stock photos to maximize local search rank algorithms.',
  },
  {
    id: 'sitemap-404-checks',
    title: 'XML Sitemap & 404 Crawl Health Checks',
    category: 'SEO Technical',
    icon: <FileCheck className="h-4 w-4 text-teal-400" />,
    summary: 'Confirm XML sitemap is submitted in Google Search Console with zero broken (404) internal links or redirect loops.',
    impact: 'Critical',
    actionStep: 'Run Google Search Console URL inspection tool quarterly and remove dead links from navigation menus.',
  },
  {
    id: 'json-ld-schema',
    title: 'LocalBusiness JSON-LD Structured Data',
    category: 'Schema',
    icon: <Code2 className="h-4 w-4 text-purple-400" />,
    summary: 'Inject LocalBusiness structured data script into your <head> containing geo-coordinates, priceRange, openingHours, and social profiles.',
    impact: 'Medium',
    actionStep: 'Test your homepage using Google Rich Results Test tool to guarantee rich snippet eligibility.',
  },
];

interface QuickWinsChecklistProps {
  targetUrl?: string;
  grade?: string;
  overallScore?: number;
}

export const QuickWinsChecklist: React.FC<QuickWinsChecklistProps> = ({
  targetUrl = '',
  grade = 'A',
  overallScore = 88,
}) => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('seo_quick_wins');
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleCheck = (id: string) => {
    const next = { ...checkedIds, [id]: !checkedIds[id] };
    setCheckedIds(next);
    try {
      localStorage.setItem('seo_quick_wins', JSON.stringify(next));
    } catch (e) {
      // ignore
    }
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-md sm:p-8">
      {/* Top Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 md:flex-row md:items-center">
        <div>
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Local SEO & GBP Quick Wins</span>
          </div>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Actionable Optimization Checklist
          </h2>
          <p className="mt-1 text-xs text-white">
            Proven high-impact tasks to boost Google Map Pack rankings, local organic traffic, and conversion rates.
          </p>
        </div>

        {/* Interactive Progress Tracker */}
        <div className="flex flex-col items-start gap-1 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 min-w-[220px] md:items-end">
          <div className="flex items-center space-x-2 text-xs font-bold text-white">
            <span>Checklist Completion:</span>
            <span className="text-emerald-400 text-sm">{progressPercent}%</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500 ease-out shadow-lg shadow-emerald-500/20"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="mt-1 text-[10px] text-white font-semibold">
            {completedCount} of {CHECKLIST_ITEMS.length} tasks completed
          </span>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-4">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = !!checkedIds[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`group flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                isChecked
                  ? 'border-emerald-500/40 bg-emerald-950/20 shadow-inner'
                  : 'border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 flex-shrink-0 transition-transform group-hover:scale-110">
                    {isChecked ? (
                      <CheckSquare className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <Square className="h-5 w-5 text-white transition-colors group-hover:text-emerald-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={item.category === 'GBP & NAP' ? 'text-emerald-400' : 'text-white'}>
                        {item.icon}
                      </span>
                      <h3
                        className={`text-sm font-bold transition-colors ${
                          isChecked ? 'text-white line-through opacity-70' : 'text-white'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                        {item.category}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-white leading-relaxed font-normal">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 ml-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      item.impact === 'Critical'
                        ? 'border border-rose-500/30 bg-rose-500/10 text-rose-400'
                        : item.impact === 'High'
                        ? 'border border-amber-500/30 bg-amber-500/10 text-amber-400'
                        : 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                    }`}
                  >
                    {item.impact}
                  </span>
                </div>
              </div>

              {/* Action Box */}
              <div className="ml-8 rounded-xl border border-zinc-800/60 bg-zinc-900/60 p-3 text-[11px] text-white">
                <div className="flex items-center space-x-1.5 font-semibold text-emerald-400">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span>Action Step:</span>
                </div>
                <p className="mt-0.5 pl-5 text-white">{item.actionStep}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prominent "Submit for Expert Help" Button */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-950 p-6 sm:flex-row">
        <div>
          <div className="flex items-center space-x-2 text-sm font-bold text-white">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>Need Assistance Implementing Local SEO Fixes?</span>
          </div>
          <p className="mt-1 text-xs text-white">
            Our Zone SEO team can resolve 100% of these technical bottlenecks for your business.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex flex-shrink-0 items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 px-6 py-3.5 text-xs font-extrabold text-zinc-950 shadow-xl shadow-emerald-500/20 transition-all hover:brightness-110 hover:shadow-emerald-500/30 active:scale-95"
        >
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          <span>Submit for Expert Help</span>
        </button>
      </div>

      {/* Lead Capture Modal Component */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetUrl={targetUrl}
        grade={grade}
        overallScore={overallScore}
        checklistCompletionPercent={progressPercent}
      />
    </div>
  );
};
