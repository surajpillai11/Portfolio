import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/common/Preloader';
import { ScrollProgress } from './components/common/ScrollProgress';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { GithubSection } from './sections/GithubSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { ContactSection } from './sections/ContactSection';
import { usePrefersReducedMotion } from './hooks/useMediaQuery';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReduced = usePrefersReducedMotion();

  // Enforce pure dark mode permanently
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (prefersReduced) return;

    let lenis: Lenis | null = null;
    let rafId: number;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis smooth scrolling disabled or unsupported:', e);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [prefersReduced]);

  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Preloader on page initialization */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Top Scroll Reading Progress Indicator */}
      <ScrollProgress />

      {/* Floating Glass Pill Navigation Bar */}
      <Navbar />

      {/* Subtle Grain / Noise Overlay */}
      <div className="pointer-events-none fixed inset-0 z-30 bg-grain opacity-40" />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <GithubSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
