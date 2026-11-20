'use client';

import React from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter',
    price: 'RM 499',
    per: '/month',
    badge: null,
    desc: 'Perfect for small businesses getting started with SEO and local visibility.',
    features: [
      'On-Page SEO (up to 10 pages)',
      'Google Business Profile setup & optimization',
      'Monthly keyword research report',
      'Basic backlink building (5 links/month)',
      'Monthly performance report',
      'Email support',
    ],
    cta: 'Get Started',
    href: 'https://wa.me/601111722010?text=Hi!%20I%20am%20interested%20in%20the%20Starter%20SEO%20plan.',
    highlight: false,
  },
  {
    name: 'Growth',
    price: 'RM 999',
    per: '/month',
    badge: 'Most Popular',
    desc: 'Comprehensive SEO + social media for growing businesses ready to dominate.',
    features: [
      'On-Page SEO (up to 30 pages)',
      'Google Business Profile management',
      'Weekly GBP posts & review responses',
      'Social media marketing (2 platforms)',
      'Quality backlink building (15 links/month)',
      'Technical SEO audit & fixes',
      'Competitor analysis',
      'Bi-weekly strategy calls',
    ],
    cta: 'Get Started',
    href: 'https://wa.me/601111722010?text=Hi!%20I%20am%20interested%20in%20the%20Growth%20SEO%20plan.',
    highlight: true,
  },
  {
    name: 'Dominator',
    price: 'RM 1,999',
    per: '/month',
    badge: 'Best Value',
    desc: 'Full-stack digital marketing for businesses serious about market leadership.',
    features: [
      'Everything in Growth',
      'Google & Meta Ads management',
      'Social media marketing (4 platforms)',
      'Content creation (4 blog posts/month)',
      'Premium backlink building (30 links/month)',
      'Landing page design & optimization',
      'Monthly video content (2 reels)',
      'Dedicated account manager',
      'Weekly reporting & calls',
    ],
    cta: 'Get Started',
    href: 'https://wa.me/601111722010?text=Hi!%20I%20am%20interested%20in%20the%20Dominator%20SEO%20plan.',
    highlight: false,
  },
];

const ADDONS = [
  { name: 'Website Design (5-page)', price: 'From RM 1,500 one-time' },
  { name: 'Landing Page Design', price: 'From RM 800 one-time' },
  { name: 'Logo & Brand Identity', price: 'From RM 500 one-time' },
  { name: 'WordPress SEO Setup', price: 'From RM 350 one-time' },
];

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-semibold text-red-400 mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-4xl font-black text-white">Affordable Plans, <span className="text-red-500">Real Results</span></h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            No hidden fees, no lock-in contracts. Just straightforward, affordable SEO plans designed to grow your business in Malaysia and beyond.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 ${
                plan.highlight
                  ? 'border-red-500/60 bg-gradient-to-b from-red-950/40 to-zinc-900/90 shadow-2xl shadow-red-500/20 scale-105'
                  : 'border-zinc-800/80 bg-zinc-900/60 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center space-x-1 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-red-600/40">
                    <Star className="h-3 w-3" />
                    <span>{plan.badge}</span>
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-black text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">{plan.desc}</p>
                <div className="flex items-end space-x-1">
                  <span className={`text-4xl font-black ${plan.highlight ? 'text-red-400' : 'text-white'}`}>{plan.price}</span>
                  <span className="text-zinc-500 text-sm mb-1">{plan.per}</span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start space-x-2 text-sm">
                    <Check className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center space-x-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:brightness-110 ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/30'
                    : 'border border-red-500/40 text-red-400 hover:bg-red-500/10'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-14">
          <h3 className="text-xl font-black text-white text-center mb-6">One-Time <span className="text-red-500">Add-Ons</span></h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ADDONS.map((a, i) => (
              <div key={i} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 text-center hover:border-red-500/30 transition-all">
                <p className="text-sm font-bold text-white mb-1">{a.name}</p>
                <p className="text-xs text-red-400 font-semibold">{a.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <p className="text-center text-xs text-zinc-500 mt-8">
          All prices in MYR. Custom packages available for enterprise clients. Contact us at{' '}
          <a href="mailto:contact@zoneseo.online" className="text-red-400 hover:underline">contact@zoneseo.online</a>
        </p>
      </div>
    </section>
  );
};
