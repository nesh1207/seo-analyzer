export interface CoreVitalMetric {
  id: string;
  title: string;
  value: string;
  score: number; // 0-1
  unit: string;
  numericValue: number;
  category: 'PERFORMANCE' | 'ACCESSIBILITY' | 'SEO' | 'BEST_PRACTICES';
  description: string;
  status: 'good' | 'needs-improvement' | 'poor';
}

export interface AuditItem {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: string;
  displayValue?: string;
  details?: {
    type?: string;
    items?: Array<Record<string, any>>;
  };
}

export interface CategoryResult {
  title: string;
  score: number; // 0-100
  description?: string;
  audits: AuditItem[];
}

export interface PageSpeedAnalysis {
  url: string;
  displayUrl: string;
  requestedUrl: string;
  timestamp: string;
  strategy: 'mobile' | 'desktop';
  scores: {
    performance: number; // 0-100
    accessibility: number; // 0-100
    seo: number; // 0-100
    bestPractices: number; // 0-100
  };
  metrics: {
    fcp: CoreVitalMetric; // First Contentful Paint
    lcp: CoreVitalMetric; // Largest Contentful Paint
    cls: CoreVitalMetric; // Cumulative Layout Shift
    tbt: CoreVitalMetric; // Total Blocking Time
    speedIndex: CoreVitalMetric;
    tti: CoreVitalMetric;
  };
  audits: {
    performance: AuditItem[];
    accessibility: AuditItem[];
    seo: AuditItem[];
    bestPractices: AuditItem[];
    passedCount: number;
    failedCount: number;
  };
  pageMetadata?: {
    title?: string;
    description?: string;
    canonical?: string;
    viewport?: string;
    ogImage?: string;
    robots?: string;
    headers?: Record<string, string>;
  };
}

export interface AnalysisErrorResponse {
  error: string;
  details?: string;
  fallbackAvailable?: boolean;
}
