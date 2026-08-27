import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SEO Website Analyzer | Google PageSpeed & Core Web Vitals Audit',
  description: 'Free responsive SEO Website Analyzer using Next.js App Router, Tailwind CSS, Lucide icons, and Google PageSpeed Insights API.',
  keywords: ['SEO Analyzer', 'PageSpeed Insights', 'Core Web Vitals', 'Local SEO Checklist', 'Next.js SEO Tool'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-emerald-500 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
