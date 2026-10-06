import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { portfolioData } from '../../data/portfolioData';

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Activity', href: '#github' },
  { name: 'Badges', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Intersection observer to track which section is currently active
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'github', 'certifications', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const isVisible = isAtTop || scrollDirection === 'up';

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-40 flex justify-center px-4 transition-transform duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-28'
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="glass-pill flex items-center justify-between gap-2 sm:gap-4 rounded-full px-4 py-2 max-w-4xl w-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          {/* Brand Logo / Initials */}
          <a
            href="#hero"
            aria-label="Back to top"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-zinc-400 rounded-full pr-2"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700/80 text-white font-heading font-bold text-xs group-hover:border-zinc-500 transition-colors">
              SP
            </div>
            <span className="hidden md:inline font-heading font-semibold text-sm tracking-tight text-zinc-200 group-hover:text-white transition-colors">
              Suraj<span className="text-blue-500">.dev</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-zinc-800/90 border border-zinc-700/80"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Icons: Resume, Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* Resume Button */}
            <a
              href={portfolioData.personal.resumeUrl}
              download="Suraj_Pillai_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 px-3.5 py-1.5 text-xs font-medium text-zinc-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              <FileText className="h-3.5 w-3.5 text-zinc-400" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl glass-panel p-5 md:hidden border border-white/10 shadow-2xl"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span>{item.name}</span>
                </a>
              ))}
              <div className="pt-2 border-t border-zinc-800 mt-2 flex flex-col gap-2">
                <a
                  href={portfolioData.personal.resumeUrl}
                  download="Suraj_Pillai_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white text-zinc-950 font-semibold px-4 py-2.5 text-sm shadow-sm hover:bg-zinc-200 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
