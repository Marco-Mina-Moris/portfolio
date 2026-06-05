# Marco Mina | Flutter Developer Portfolio

A modern, responsive developer portfolio built with Next.js and React, showcasing mobile development projects, technical skills, and professional experience. Designed with a dark theme, smooth animations, and glassmorphism aesthetics.

**Live Preview:** [marco-mina-portfolio.vercel.app](https://marco-mina-portfolio.vercel.app)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Featured Projects](#featured-projects)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

This portfolio serves as a central hub to present my work as a Flutter Mobile Developer. It includes an interactive project showcase with dedicated detail pages, a skills section, work experience timeline, and a contact section with multiple communication channels.

The site is fully responsive across mobile, tablet, and desktop breakpoints, with performance-optimized assets and SEO-friendly metadata.

---

## Tech Stack

| Layer         | Technology                              |
|---------------|-----------------------------------------|
| Framework     | Next.js 16 (App Router)                 |
| Language      | TypeScript                              |
| UI Library    | React 19                                |
| Animations    | Framer Motion                           |
| Icons         | Lucide React                            |
| Styling       | Vanilla CSS (Custom Properties, Grid, Flexbox) |
| Fonts         | Clash Display, Inter, JetBrains Mono (Google Fonts) |
| Deployment    | Vercel (recommended)                    |

---

## Features

- **Bento Grid Layout** -- Projects displayed in a responsive bento-style grid with per-project brand accents and hover effects.
- **Dynamic Project Pages** -- Each project has a dedicated detail page (`/projects/[slug]`) with full descriptions, tech stack, feature lists, and screenshots.
- **Animated Hero Section** -- Circular avatar with a rotating glow ring, floating tech badges, and staggered text entrance animations.
- **Interactive Particles** -- Canvas-based particle system with mouse interaction as a background layer.
- **Cursor Glow** -- Subtle radial glow effect that follows the cursor on desktop.
- **Scroll Progress Bar** -- Gradient progress indicator fixed at the top of the viewport.
- **Skills Section** -- Categorized skill display (Languages, Frameworks, Backend, Tools) with animated skill chips.
- **Experience Timeline** -- Vertical timeline with company details, role descriptions, and technology tags.
- **Contact Section** -- Email, GitHub, LinkedIn, Phone, and Location cards with a downloadable CV button.
- **WhatsApp Floating Button** -- Fixed-position FAB with hover tooltip and a pre-filled message for quick client communication.
- **Available for Hire Badge** -- Pulsing green indicator in the navbar signaling availability to recruiters.
- **Responsive Design** -- Fully adaptive across mobile (320px+), tablet, and desktop (1920px+) breakpoints.
- **SEO Optimized** -- Proper meta tags, Open Graph data, semantic HTML, and descriptive heading hierarchy.

---

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css              # Global styles, design tokens, animations
│   ├── layout.tsx               # Root layout with metadata and fonts
│   ├── page.tsx                 # Home page assembling all sections
│   ├── icon.png                 # Favicon
│   └── projects/
│       └── [slug]/
│           ├── page.tsx                 # Dynamic route handler
│           └── ProjectDetailClient.tsx  # Project detail page component
├── components/
│   ├── Hero.tsx                 # Hero section with avatar and CTAs
│   ├── Navbar.tsx               # Fixed navbar with Available badge
│   ├── Skills.tsx               # Skills grid section
│   ├── Projects.tsx             # Bento grid project showcase
│   ├── Experience.tsx           # Work experience timeline
│   ├── Contact.tsx              # Contact cards and CV download
│   ├── Footer.tsx               # Footer
│   ├── WhatsAppFAB.tsx          # Floating WhatsApp button
│   ├── Particles.tsx            # Canvas particle system
│   ├── CursorGlow.tsx           # Cursor follow glow effect
│   └── ScrollProgress.tsx       # Scroll progress indicator
├── lib/
│   └── projects-data.ts         # Project data definitions and types
├── public/
│   ├── avatar.jpg               # Profile photo
│   ├── cv/                      # Downloadable CV
│   └── images/
│       └── projects/            # Project cover images and screenshots
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Featured Projects

### Murshid

University scheduling and guidance app with bilingual Arabic/English support, real-time professor alerts, Supabase backend, and MVVM architecture.

**Stack:** Flutter, GetX, Supabase, Hive, MVVM, Localization

### ScorePulse

Real-time football scores app with dual-API architecture (365Scores + API-Football), live scores, match details, and league standings.

**Stack:** Flutter, REST API, Cubit, Dio, Clean Architecture

### Food Delivery App

Full-featured food delivery app with Firebase Auth (Email, Google, Facebook), Google Maps live tracking, and online payment integration.

**Stack:** Flutter, Firebase, Google Maps, Dio, Cubit, MVVM

### Shoply

E-commerce app with product browsing, cart management, Stripe payment, and order tracking built on Clean Architecture.

**Stack:** Flutter, BLoC, Stripe, Hive, Clean Architecture

### Evently

Event management and booking app with Firebase backend, QR code ticketing, and real-time event updates.

**Stack:** Flutter, Firebase, BLoC, Clean Architecture

### News App

Curated news reader with category filtering, bookmarking, and a clean reading experience powered by NewsAPI.

**Stack:** Flutter, REST API, Cubit, Dio, MVVM

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Marco-Mina-Moris/portfolio.git

# Navigate to the project directory
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Scripts

| Command         | Description                    |
|-----------------|--------------------------------|
| `npm run dev`   | Start development server       |
| `npm run build` | Create production build        |
| `npm run start` | Start production server        |
| `npm run lint`  | Run ESLint checks              |

---

## Deployment

This project is optimized for deployment on **Vercel**:

1. Push the repository to GitHub.
2. Import the project on [vercel.com](https://vercel.com).
3. Vercel will auto-detect Next.js and configure the build settings.
4. Deploy.

For other platforms, run `npm run build` and serve the `.next` output directory.

---

## License

This project is open source and available for reference and learning purposes.

---

**Built with Next.js, React, and TypeScript.**
