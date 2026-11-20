'use client';

import React from 'react';
import { Search, TrendingUp, Globe, BarChart3, FileText, Layout, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: <Search className="h-7 w-7" />,
    title: 'On-Page SEO Optimization',
    desc: 'Deep keyword research, meta tags, content structure, schema markup, and internal linking strategies to rank higher on Google.',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
  },
  {
    icon: <Globe className="h-7 w-7" />,
    title: 'Google Business Profile',
    desc: 'Complete GBP setup, weekly post cadence, review management, and Map Pack optimization for local dominance.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    icon: <TrendingUp className="h-7 w-7" />,
    title: 'Social Media Marketing',
    desc: 'Strategic content creation and campaigns across Facebook, Instagram, LinkedIn, and TikTok to grow your brand online.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: <BarChart3 className="h-7 w-7" />,
    title: 'Digital Marketing & Ads',
    desc: 'Google Ads, Meta Ads, and retargeting campaigns optimized for conversions and maximum ROI across all platforms.',
    color: 'text-red-300',
    bg: 'bg-red-400/10 border-red-400/20',
  },
  {
    icon: <FileText className="h-7 w-7" />,
    title: 'WordPress SEO Services',
    desc: 'Full WordPress SEO audit, plugin setup (Yoast/Rank Math), speed optimization, and ongoing monthly maintenance.',
    color: 'text-orange-300',
    bg: 'bg-orange-400/10 border-orange-400/20',
  },
  {
    icon: <Layout className="h-7 w-7" />,
    title: 'Landing Pages & Websites',
    desc: 'Professional, conversion-focused website design and landing pages built for speed, SEO, and lead generation.',
    color: 'text-red-500',
    bg: 'bg-red-600/10 border-red-600/20',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-semibold text-red-400 mb-4">
            What We Do
          </span>
          <h2 className="text-4xl font-black text-white">Our <span className="text-red-500">Services</span></h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            From SEO audits to full digital marketing campaigns — Zone SEO delivers measurable results for businesses of all sizes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-7 backdrop-blur-md hover:border-red-500/40 hover:bg-zinc-900/90 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${s.bg} ${s.color} mb-5`}>
                {s.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
              <div className="mt-5 flex items-center text-xs font-semibold text-red-400 group-hover:gap-2 gap-1 transition-all">
                <span>Learn more</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
