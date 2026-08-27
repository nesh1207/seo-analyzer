'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSearch } from '@/components/HeroSearch';
import { ScoreDials } from '@/components/ScoreDials';
import { CoreWebVitals } from '@/components/CoreWebVitals';
import { DiagnosticsTabs } from '@/components/DiagnosticsTabs';
import { QuickWinsChecklist } from '@/components/QuickWinsChecklist';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ReportExporter } from '@/components/ReportExporter';
import { DottedBackground } from '@/components/ui/dotted-vignette-background';
import { PageSpeedAnalysis } from '@/types/analyzer';
import { getLetterGrade } from '@/lib/utils';
import { AlertCircle, Zap, Sparkles, Award, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [analysisData, setAnalysisData] = useState<PageSpeedAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  const handleAnalyze = async (url: string, strategy: 'mobile' | 'desktop') => {
    setIsLoading(true);
    setErrorMsg(null);
    setCurrentUrl(url);

    try {
      const apiPromise = fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, strategy }),
      });

      const delayPromise = new Promise((resolve) => setTimeout(resolve, 35000));

      const [res] = await Promise.all([apiPromise, delayPromise]);

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || 'Failed to fetch PageSpeed Insights data.');
      }

      const data: PageSpeedAnalysis = await res.json();
      setAnalysisData(data);
    } catch (err: any) {
      console.error('Audit Error:', err);
      setErrorMsg(err.message || 'An unexpected error occurred while analyzing the site.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setErrorMsg(null);
    setCurrentUrl('');
  };

  const overallAvg = analysisData
    ? Math.round(
        (analysisData.scores.performance +
          analysisData.scores.accessibility +
          analysisData.scores.seo +
          analysisData.scores.bestPractices) /
          4
      )
    : 85;

  const letterGradeInfo = getLetterGrade(overallAvg);

  return (
    <DottedBackground
      dotColor="#6ee7b7"
      backgroundColor="#0f172a"
      enableVignette={true}
      vignetteColor="rgba(0,0,0,0.9)"
      enableInnerGlow={true}
      innerGlowColor="rgba(0,0,0,0.8)"
      dotSize={2}
      dotSpacing={10}
      className="min-h-screen font-sans text-zinc-100 antialiased selection:bg-emerald-500 selection:text-zinc-950"
    >
      <div className="flex min-h-screen flex-col bg-transparent">
        {/* Header with Zone SEO branding */}
        <Header onReset={handleReset} />

        <main className="flex-1 pb-20">
          {/* Hero Section */}
          <HeroSearch onAnalyze={handleAnalyze} isLoading={isLoading} />

          {/* Error Alert Box */}
          {errorMsg && (
            <div className="mx-auto max-w-4xl px-4 py-4">
              <div className="flex items-center space-x-3 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 text-rose-300 shadow-xl backdrop-blur-md">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-rose-400" />
                <div className="flex-1 text-sm text-white">
                  <span className="font-bold text-white">Analysis Failed: </span>
                  {errorMsg}
                </div>
                <button
                  onClick={() => setErrorMsg(null)}
                  className="rounded-lg border border-rose-500/30 bg-rose-900/40 px-3 py-1 text-xs font-semibold text-rose-200 hover:bg-rose-800/50"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* 35-Second Heavy Lifting Loading State */}
          {isLoading && (
            <div className="px-4 py-8">
              <LoadingSkeleton url={currentUrl} durationSeconds={35} />
            </div>
          )}

          {/* Dashboard Results State */}
          {analysisData && !isLoading && (
            <div className="mx-auto max-w-7xl space-y-10 px-4 pt-4 sm:px-6 lg:px-8">
              
              {/* Top Toolbar / Exporter */}
              <ReportExporter data={analysisData} />

              {/* Score Dials & Letter Grade Card */}
              <ScoreDials
                scores={analysisData.scores}
                passedCount={analysisData.audits.passedCount}
                failedCount={analysisData.audits.failedCount}
                url={analysisData.displayUrl}
                strategy={analysisData.strategy}
              />

              {/* Core Web Vitals breakdown */}
              <CoreWebVitals metrics={analysisData.metrics} />

              {/* Detailed Diagnostics & Audit Tabs */}
              <DiagnosticsTabs audits={analysisData.audits} />

              {/* Local SEO Checklist & Lead Capture Form */}
              <QuickWinsChecklist
                targetUrl={analysisData.url}
                grade={letterGradeInfo.grade}
                overallScore={overallAvg}
              />

            </div>
          )}

          {/* Default View (before search) */}
          {!analysisData && !isLoading && !errorMsg && (
            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
              {/* Checklist Preview */}
              <div className="mb-10">
                <QuickWinsChecklist
                  targetUrl="https://example.com"
                  grade="A"
                  overallScore={90}
                />
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white">Heavy Lifting Engine</h3>
                  <p className="mt-2 text-xs text-white leading-relaxed font-normal">
                    Deep scanning sequence crawling DOM structures, mobile responsiveness, and Core Web Vitals.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white">Letter Grade System</h3>
                  <p className="mt-2 text-xs text-white leading-relaxed font-normal">
                    Instant Letter Grade evaluation (A, B, C, D) based on weighted performance and SEO rules.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white">Lead Capture & Expert Help</h3>
                  <p className="mt-2 text-xs text-white leading-relaxed font-normal">
                    Submit your report directly to Zone SEO specialists for professional Map Pack optimization.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer with "Powered by Zone SEO" */}
        <footer className="border-t border-zinc-800/80 bg-zinc-950/90 py-8 text-center text-xs text-white backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-white font-medium">© {new Date().getFullYear()} SEO Pulse Analyzer. All rights reserved.</p>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Powered by Zone SEO</span>
            </div>
          </div>
        </footer>
      </div>
    </DottedBackground>
  );
}
