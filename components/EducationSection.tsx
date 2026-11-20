'use client';

import React, { useState } from 'react';
import { ChevronDown, BookOpen, TrendingUp, Globe, Search, Zap, Shield } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'What is SEO and why does my business need it?',
    a: 'SEO (Search Engine Optimization) is the process of improving your website so it ranks higher in search engine results like Google. Higher rankings mean more organic traffic, more leads, and more revenue — without paying for every click. For Malaysian businesses especially, strong local SEO means customers can find you when searching for services near them.'
  },
  {
    q: 'How long does SEO take to show results?',
    a: "SEO is a long-term strategy. Most businesses see initial improvements within 3-6 months, with significant growth by month 6-12. The exact timeline depends on your industry competition, the current state of your website, and the quality of optimization done. At Zone SEO, we provide monthly reporting so you always know what's working."
  },
  {
    q: 'What is the difference between On-Page and Off-Page SEO?',
    a: 'On-Page SEO involves optimizing elements on your website itself — meta titles, descriptions, content quality, keyword placement, page speed, schema markup, and internal links. Off-Page SEO is about building authority through backlinks from other websites, social signals, and mentions. Both are essential for ranking well.'
  },
  {
    q: 'What is Core Web Vitals and why does it matter?',
    a: "Core Web Vitals are Google's official page experience metrics: LCP (Largest Contentful Paint - loading speed), FID/INP (interactivity), and CLS (visual stability). Google uses these as ranking factors. A site with poor Core Web Vitals scores lower than a competitor with similar content. Our free audit tool checks these for you instantly."
  },
  {
    q: 'What is a Google Business Profile and do I need one?',
    a: "Google Business Profile (GBP) is a free listing that shows your business in Google Maps and local search results. For any business serving a specific area, it's essential. An optimized GBP with consistent NAP (Name, Address, Phone), positive reviews, weekly posts, and correct categories can dramatically increase local foot traffic and phone calls."
  },
  {
    q: 'Can Zone SEO help e-commerce and service businesses?',
    a: "Absolutely. We serve both e-commerce stores (Shopify, WooCommerce) and service-based businesses (lawyers, doctors, contractors, clinics). Our strategies are customized to your industry and target audience, whether you're selling products online or generating leads for a local service."
  }
];

const STAT_ITEMS = [
  { icon: <TrendingUp className="h-6 w-6 text-red-400" />, stat: '68%', label: 'of online experiences begin with a search engine' },
  { icon: <Globe className="h-6 w-6 text-orange-400" />, stat: '75%', label: 'of users never scroll past the first page of Google' },
  { icon: <Search className="h-6 w-6 text-red-300" />, stat: '14.6%', label: 'close rate for SEO leads vs 1.7% for outbound' },
  { icon: <Zap className="h-6 w-6 text-orange-300" />, stat: '53%', label: 'of mobile visitors leave if a site takes over 3 seconds' },
  { icon: <Shield className="h-6 w-6 text-red-400" />, stat: '61%', label: 'of marketers say SEO drives better ROI than paid ads' },
  { icon: <BookOpen className="h-6 w-6 text-orange-400" />, stat: '10x', label: 'more traffic from organic SEO vs social media on average' },
];

export const EducationSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-semibold text-red-400 mb-4">
            Learn SEO
          </span>
          <h2 className="text-4xl font-black text-white">Why <span className="text-red-500">SEO Matters</span></h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Understanding SEO isn't just for marketers. Every business owner should know why organic search is the most powerful, cost-effective customer acquisition channel available.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 mb-16">
          {STAT_ITEMS.map((item, i) => (
            <div key={i} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 text-center backdrop-blur-md hover:border-red-500/30 transition-all">
              <div className="flex justify-center mb-3">{item.icon}</div>
              <div className="text-3xl font-black text-white mb-1">{item.stat}</div>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Two-col content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-2xl font-black text-white mb-4">The SEO Flywheel Effect</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Unlike paid advertising where traffic stops the moment you stop paying, SEO compounds over time. A well-optimized page can continue to bring qualified visitors for years. This is the SEO flywheel — as your rankings improve, you get more traffic, more links, and more authority, which further improves your rankings.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Businesses that invest in SEO early enjoy a compounding advantage that becomes increasingly difficult for competitors to overcome. At Zone SEO, we build this flywheel for our clients through technical excellence, content strategy, and consistent local optimization.
            </p>
            <ul className="space-y-3 text-sm text-zinc-300">
              {[
                'Technical SEO: Speed, mobile, structured data',
                'On-Page SEO: Keywords, content, meta tags',
                'Local SEO: GBP, NAP, reviews, citations',
                'Off-Page SEO: Backlinks, authority, trust',
                'Content Marketing: Blog posts, landing pages',
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-black text-white mb-4">Local SEO for Malaysian Businesses</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              In Malaysia, local search intent is incredibly high. Customers are actively searching for products and services near them — "best restaurant in KL", "accountant in Petaling Jaya", "clinic near me". If your business doesn't appear in these results, you're invisible to potential customers at the exact moment they're ready to buy.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Zone SEO specializes in dominating local search results. We optimize your Google Business Profile, build local citations, manage your online reputation, and ensure your website speaks Google's language — so you show up first when it matters most.
            </p>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
              <p className="text-sm text-red-300 font-semibold mb-1">🚀 Did you know?</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                "Near me" searches have grown by over 200% in the last 2 years. Local businesses that rank in the Google Map Pack receive 44% of all local search clicks. Zone SEO helps you get there.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div>
          <h3 className="text-2xl font-black text-white mb-8 text-center">Frequently Asked <span className="text-red-500">Questions</span></h3>
          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-white hover:text-red-400 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`h-4 w-4 flex-shrink-0 ml-4 transition-transform ${openIndex === i ? 'rotate-180 text-red-400' : 'text-zinc-500'}`} />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800">
                    <p className="pt-4">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
