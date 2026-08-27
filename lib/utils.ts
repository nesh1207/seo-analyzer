import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreColor(score: number): {
  text: string;
  bg: string;
  border: string;
  ring: string;
  badgeBg: string;
  badgeText: string;
  hex: string;
  label: string;
} {
  if (score >= 90) {
    return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      ring: 'stroke-emerald-500',
      badgeBg: 'bg-emerald-950/80',
      badgeText: 'text-emerald-400 border-emerald-800/60',
      hex: '#10b981',
      label: 'Good (90-100)',
    };
  } else if (score >= 50) {
    return {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      ring: 'stroke-amber-500',
      badgeBg: 'bg-amber-950/80',
      badgeText: 'text-amber-400 border-amber-800/60',
      hex: '#f59e0b',
      label: 'Needs Improvement (50-89)',
    };
  } else {
    return {
      text: 'text-rose-500',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      ring: 'stroke-rose-500',
      badgeBg: 'bg-rose-950/80',
      badgeText: 'text-rose-400 border-rose-800/60',
      hex: '#f43f5e',
      label: 'Poor (0-49)',
    };
  }
}

export interface LetterGradeInfo {
  grade: 'A' | 'B' | 'C' | 'D';
  label: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  hex: string;
  summary: string;
}

export function getLetterGrade(overallScore: number): LetterGradeInfo {
  if (overallScore >= 90) {
    return {
      grade: 'A',
      label: 'Grade A - Exceptional',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/15',
      borderColor: 'border-emerald-500/40',
      badgeBg: 'bg-emerald-950/90',
      badgeText: 'text-emerald-300 border-emerald-700/80',
      hex: '#10b981',
      summary: 'Outstanding performance, accessibility, and search engine optimization footprint.',
    };
  } else if (overallScore >= 80) {
    return {
      grade: 'B',
      label: 'Grade B - Good',
      textColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/15',
      borderColor: 'border-cyan-500/40',
      badgeBg: 'bg-cyan-950/90',
      badgeText: 'text-cyan-300 border-cyan-700/80',
      hex: '#06b6d4',
      summary: 'Solid foundation with minor optimization opportunities remaining.',
    };
  } else if (overallScore >= 70) {
    return {
      grade: 'C',
      label: 'Grade C - Needs Work',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-500/15',
      borderColor: 'border-amber-500/40',
      badgeBg: 'bg-amber-950/90',
      badgeText: 'text-amber-300 border-amber-700/80',
      hex: '#f59e0b',
      summary: 'Sub-optimal loading speeds or SEO gaps hindering local Map Pack placement.',
    };
  } else {
    return {
      grade: 'D',
      label: 'Grade D - Critical Issues',
      textColor: 'text-rose-400',
      bgColor: 'bg-rose-500/15',
      borderColor: 'border-rose-500/40',
      badgeBg: 'bg-rose-950/90',
      badgeText: 'text-rose-300 border-rose-700/80',
      hex: '#f43f5e',
      summary: 'Significant speed bottlenecks, unoptimized assets, or missing local search markers.',
    };
  }
}

export function formatUrl(rawUrl: string): string {
  let trimmed = rawUrl.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = `https://${trimmed}`;
  }
  return trimmed;
}

export function getDomainName(url: string): string {
  try {
    const parsed = new URL(formatUrl(url));
    return parsed.hostname;
  } catch {
    return url;
  }
}
