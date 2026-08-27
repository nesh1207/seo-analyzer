'use client';

import React from 'react';
import { Download, Printer, Share2 } from 'lucide-react';
import { PageSpeedAnalysis } from '@/types/analyzer';

interface ReportExporterProps {
  data: PageSpeedAnalysis;
}

export const ReportExporter: React.FC<ReportExporterProps> = ({ data }) => {
  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-report-${data.displayUrl}-${data.strategy}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div>
        <h4 className="text-sm font-bold text-white">Export Audit Report</h4>
        <p className="text-xs text-zinc-400">
          Save analysis results for client presentations or team review.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleDownloadJSON}
          className="flex items-center space-x-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
        >
          <Download className="h-3.5 w-3.5 text-emerald-400" />
          <span>Export JSON</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
        >
          <Printer className="h-3.5 w-3.5 text-cyan-400" />
          <span>Print Summary</span>
        </button>
      </div>
    </div>
  );
};
