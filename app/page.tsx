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
import { ServicesSection } from '@/components/ServicesSection';
import { EducationSection } from '@/components/EducationSection';
import { PricingSection } from '@/components/PricingSection';
import { ClientShowcase } from '@/components/ClientShowcase';
import { WhatsAppChat } from '@/components/WhatsAppChat';
import { CursorTrail } from '@/components/CursorTrail';
import { PageSpeedAnalysis } from '@/types/analyzer';
import { getLetterGrade } from '@/lib/utils';
import { AlertCircle, Sparkles } from 'lucide-react';

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
    <>
      {/* Cursor Trail Effect */}
      <CursorTrail />

      {/* WhatsApp Chat Button */}
      <WhatsAppChat />

      <DottedBackground
        dotColor="#dc2626"
        backgroundColor="#09090b"
        enableVignette={true}
        vignetteColor="rgba(0,0,0,0.92)"
        enableInnerGlow={true}
        innerGlowColor="rgba(0,0,0,0.75)"
        dotSize={1.5}
        dotSpacing={12}
        className="min-h-screen font-sans text-zinc-100 antialiased"
      >
        <div className="flex min-h-screen flex-col bg-transparent">
          {/* Header */}
          <Header onReset={handleReset} />

          <main className="flex-1">
            {/* Hero + Search */}
            <HeroSearch onAnalyze={handleAnalyze} isLoading={isLoading} />

            {/* Error */}
            {errorMsg && (
              <div className="mx-auto max-w-4xl px-4 py-4">
                <div className="flex items-center space-x-3 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 text-rose-300 shadow-xl backdrop-blur-md">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-rose-400" />
                  <div className="flex-1 text-sm">
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

            {/* Loading */}
            {isLoading && (
              <div className="px-4 py-8">
                <LoadingSkeleton url={currentUrl} durationSeconds={35} />
              </div>
            )}

            {/* Results Dashboard */}
            {analysisData && !isLoading && (
              <div className="mx-auto max-w-7xl space-y-10 px-4 pt-4 pb-20 sm:px-6 lg:px-8">
                <ReportExporter data={analysisData} />
                <ScoreDials
                  scores={analysisData.scores}
                  passedCount={analysisData.audits.passedCount}
                  failedCount={analysisData.audits.failedCount}
                  url={analysisData.displayUrl}
                  strategy={analysisData.strategy}
                />
                <CoreWebVitals metrics={analysisData.metrics} />
                <DiagnosticsTabs audits={analysisData.audits} />
                <QuickWinsChecklist
                  targetUrl={analysisData.url}
                  grade={letterGradeInfo.grade}
                  overallScore={overallAvg}
                />
              </div>
            )}

            {/* Default Landing Page Sections (shown when no analysis) */}
            {!analysisData && !isLoading && !errorMsg && (
              <>
                {/* Services */}
                <ServicesSection />

                {/* SEO Education */}
                <EducationSection />

                {/* Pricing */}
                <PricingSection />

                {/* Client Showcase */}
                <ClientShowcase />
              </>
            )}
          </main>

          {/* Footer */}
          <footer className="border-t border-zinc-800/60 bg-zinc-950/95 py-10 text-center text-xs text-zinc-500 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4">
              {/* Footer Logo Row */}
              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row mb-6">
                <div className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden border border-red-800/40 bg-zinc-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.png" alt="DInfinite Tech Services" className="h-9 w-9 object-contain" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-white">ZONE <span className="text-red-500">SEO</span></p>
                    <p className="text-[10px] text-zinc-500">Powered by DInfinite Tech Services</p>
                  </div>
                </div>

                <nav className="flex flex-wrap justify-center gap-4 text-xs text-zinc-500">
                  <a href="#services" className="hover:text-red-400 transition-colors">Services</a>
                  <a href="#pricing" className="hover:text-red-400 transition-colors">Pricing</a>
                  <a href="#education" className="hover:text-red-400 transition-colors">Learn SEO</a>
                  <a href="#clients" className="hover:text-red-400 transition-colors">Clients</a>
                  <a href="mailto:contact@zoneseo.online" className="hover:text-red-400 transition-colors">contact@zoneseo.online</a>
                </nav>

                <div className="flex items-center space-x-1 text-xs text-zinc-600">
                  <Sparkles className="h-3.5 w-3.5 text-red-600" />
                  <span>Free SEO Audit Tool</span>
                </div>
              </div>

              <div className="border-t border-zinc-800/60 pt-5">
                <p>© {new Date().getFullYear()} ZONE SEO. All rights reserved. · Powered by DInfinite Tech Services · contact@zoneseo.online</p>
              </div>
            </div>
          </footer>
        </div>
      </DottedBackground>
    </>
  );
}
