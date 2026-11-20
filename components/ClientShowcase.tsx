'use client';

import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

const SERVICES_PROVIDED = [
  'On-Page & Technical SEO',
  'Google Business Profile Management',
  'Social Media Marketing',
  'Digital Marketing Campaigns',
  'WordPress Website Management',
  'Monthly SEO Reporting',
];

export const ClientShowcase: React.FC = () => {
  return (
    <section id="clients" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-semibold text-red-400 mb-4">
            Our Clients
          </span>
          <h2 className="text-4xl font-black text-white">Businesses We've <span className="text-red-500">Helped Grow</span></h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            We're proud to partner with forward-thinking businesses across Malaysia, delivering measurable SEO and digital marketing results.
          </p>
        </div>

        {/* Client Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-red-500/20 bg-gradient-to-br from-zinc-900/90 via-red-950/10 to-zinc-900/90 p-10 overflow-hidden">
            {/* Glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-red-500/10 blur-3xl" />

            <div className="flex flex-col lg:flex-row items-start gap-8 relative z-10">
              {/* Logo Placeholder */}
              <div className="flex-shrink-0 flex h-24 w-24 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-4xl font-black text-red-400 shadow-xl shadow-red-500/10">
                ES
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-2xl font-black text-white">E Serve Management Services PLT</h3>
                  <span className="inline-flex items-center rounded-full bg-red-500/10 border border-red-500/30 px-3 py-0.5 text-xs font-semibold text-red-400">
                    Active Client
                  </span>
                </div>

                <a
                  href="https://www.e-serve.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-sm text-zinc-400 hover:text-red-400 transition-colors mb-5"
                >
                  <span>www.e-serve.co</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  E Serve Management Services PLT is a Malaysian company offering comprehensive business management solutions. Zone SEO provides end-to-end digital marketing services to help them grow their online presence, generate qualified leads, and dominate local search results across multiple platforms.
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {SERVICES_PROVIDED.map((s, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-red-400 flex-shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-10">
          <h3 className="text-2xl font-black text-white mb-3">Want to be our next <span className="text-red-500">success story?</span></h3>
          <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
            Run a free audit above, then contact us on WhatsApp and our team will create a custom growth strategy for your business.
          </p>
          <a
            href="https://wa.me/601111722010?text=Hi!%20I%20want%20to%20grow%20my%20business%20with%20Zone%20SEO."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:brightness-110 transition-all"
          >
            <span>Chat with Us on WhatsApp</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
