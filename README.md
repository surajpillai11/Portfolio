# Suraj Pillai — Developer Portfolio Website

[![Vercel Deployment Ready](https://img.shields.io/badge/Vercel-Deployment%20Ready-black?style=flat&logo=vercel)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D%20Hero-black?style=flat&logo=three.js)](https://threejs.org/)

A stunning, dark-mode, high-performance personal developer portfolio engineered for **Suraj Pillai**, a third-year B.E. Computer Science student in Pune, India, seeking **Software Engineering Internships (Java / Spring Boot & Full-Stack)**.

---

## ✨ Features & Architecture

- **Dark Cyber Aesthetic**: Deep obsidian background (`#0a0a0f`), cyber gradient accents (Cyan → Violet → Pink), glassmorphic panels, and subtle noise grain overlay.
- **Interactive 3D Hero Background**: Custom Three.js particle constellation reacting smoothly to mouse physics and perspective rotation, capped at 60fps with automatic hardware optimization.
- **Initials "SP" Monogram Preloader**: SVG stroked drawing animation, progress percentage counter, dynamic status indicators, and smooth curtain exit transition.
- **Fluid Custom Cursor**: Trailing glow follower with spring mechanics, expanding and altering blend state over interactive links and cards (automatically disabled on touch devices and reduced-motion).
- **Floating Glass Pill Navbar**: Automatically hides on scroll down, reveals on scroll up, highlights the active section in real-time, and features a mobile drawer.
- **Interactive 3D Tilt Cards**: Perspective cards with cursor-following radial spotlight glares and detailed modal expansion.
- **Interactive RAG Pipeline Architecture Diagram**: Step-by-step interactive inspection of the **AI Report Analyzer** system (Apache Tika text extraction → Google Gemini vector embeddings → ChromaDB similarity search → Cited, grounded responses).
- **Dual Infinite Marquee**: Continuous dual-track skill tickers moving in opposite directions with pause-on-hover interaction.
- **Live GitHub Activity**: Real-time repository metrics fetched from the public GitHub API (`surajpillai11`) with styled contribution heatmap embed and graceful offline fallbacks.
- **Glassmorphic Contact Form**: Comprehensive client validation, confetti burst animation upon transmission, and 1-click email copy button.
- **Accessibility & Performance**: Fully responsive, ARIA labels, semantic markup, and `prefers-reduced-motion` compliance.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom CSS Glassmorphism & Cyber Gradients
- **Animations**: Framer Motion (Transitions, Springs, Modals, Gestures)
- **3D Graphics**: Three.js (Interactive Particle Constellation)
- **Smooth Scrolling**: Lenis Smooth Scroll
- **Icons**: Lucide React + Custom SVG Brand Icons
- **Effects**: Canvas Confetti

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher, tested with Node v24)
- npm (v9.0.0 or higher)

### 1. Clone & Install
```bash
# Navigate to the project directory
cd "d:/Suraj codes/Project/Portfolioo"

# Install all dependencies
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## ☁️ Deploying to Vercel

The repository includes a ready-to-use [vercel.json](file:///d:/Suraj%20codes/Project/Portfolioo/vercel.json) configured for Single Page Application routing and optimized asset caching.

### Option A: Deploy via GitHub (Recommended)
1. Push this project to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete developer portfolio for Suraj Pillai"
   git branch -M main
   git remote add origin https://github.com/surajpillai11/portfolio.git
   git push -u origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New"** > **"Project"** and select your repository `surajpillai11/portfolio`.
4. Vercel automatically detects the Vite template:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. Your site will be live in ~30 seconds with automated SSL!

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly from your terminal
vercel
```

---

## 📝 Configuration & Customization Checklist (Placeholders to Replace)

All personal data, projects, skills, and links are cleanly consolidated into a single typed configuration file:
**[src/data/portfolioData.ts](file:///d:/Suraj%20codes/Project/Portfolioo/src/data/portfolioData.ts)**

Please review and replace the following placeholder items before going public:

| Item | File Path | Description |
|---|---|---|
| **Resume PDF** | `public/resume.pdf` | Replace the starter placeholder PDF with your actual up-to-date resume document. |
| **LinkedIn URL** | `src/data/portfolioData.ts` (`personal.linkedinUrl`) | Replace `https://www.linkedin.com/in/suraj-pillai-placeholder` with your real profile link. |
| **Email Service Endpoint** | `.env` or Vercel Environment Variables | Add `VITE_FORMSPREE_ENDPOINT` (or configure EmailJS) if you want the contact form to deliver directly to your inbox without extra backend code. |
| **Live Project URLs** | `src/data/portfolioData.ts` (`projects[].liveUrl`) | Update the deployment URLs once your live demos are hosted on Vercel / Render. |
| **Certification Links** | `src/data/portfolioData.ts` (`certifications[].credentialUrl`) | Link directly to your official HackerRank and course credential verification URLs. |

---

## 📄 License
MIT License © 2026 Suraj Pillai
