# SEO Pulse Analyzer (Powered by Zone SEO)

A responsive SEO Website Analyzer built with **Next.js (App Router)**, **Tailwind CSS**, and **Lucide React icons**.

---

## Features

- **Google PageSpeed Insights Engine**: Real-time evaluation of Performance, Accessibility, SEO, and Best Practices.
- **Letter Grade Evaluation (A, B, C, D)**: Prominent overall grade based on aggregate score.
- **Circular Score Dials**: Color-coded dials (Green 90+, Yellow 50-89, Red <50).
- **Core Web Vitals Metrics**: Real-user performance tracking for FCP, LCP, CLS, TBT, Speed Index, and TTI.
- **Detailed Diagnostics Breakdown**: Tabbed audit recommendations with technical specifications and impacted elements.
- **Local SEO & GBP Quick Wins Checklist**: Interactive checklist for NAP consistency, primary category optimization, weekly Google post cadence, sitemap 404 health checks, and JSON-LD schema markup with physical progress filling.
- **Lead Capture & Multi-Tier Email Routing**: Modal to submit lead requests to `studentuse002@gmail.com` with support for SMTP, Gmail App Password, and mail relay.
- **Dotted Vignette Background with Interactive Cursor Glow**: Responsive particle effect with mouse trail and spotlight illumination.

---

## Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.17+ or v20+ recommended)
- npm or pnpm

### 2. Installation
If `node_modules` is already present, you can jump straight to running. Otherwise:
```bash
npm install
```

### 3. Environment Variables
Check `.env.local` in the root folder:
```ini
# Optional: Gmail or Custom SMTP for direct email dispatch to studentuse002@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=

# Optional: Resend API Key
RESEND_API_KEY=

# Optional: Google PageSpeed API Key (for higher quota)
PAGESPEED_API_KEY=
```
*(Note: If SMTP credentials are left blank, the app uses the built-in HTTP mail relay fallback to deliver enquiries directly to studentuse002@gmail.com).*

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```
