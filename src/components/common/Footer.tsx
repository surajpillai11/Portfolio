import { Mail, ArrowUp } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { Magnetic } from '../animations/Magnetic';
import { GithubIcon, LinkedinIcon } from './Icons';

export function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-zinc-800/80 bg-[#07070a] py-12 px-4 sm:px-6 lg:px-8 text-zinc-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Personal Statement */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading font-black text-lg text-white">
              Suraj<span className="text-blue-500">.dev</span>
            </span>
            <span className="rounded-full bg-zinc-800 border border-zinc-700/80 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
              v2026.1
            </span>
          </div>
          <p className="font-mono text-xs text-zinc-500">
            Built with React, TypeScript, Tailwind CSS &amp; Three.js
          </p>
        </div>

        {/* Social Icons Bar */}
        <div className="flex items-center gap-3">
          <a
            href={personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suraj's GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suraj's LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email Suraj"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>

          {/* Animated Back to Top Button */}
          <Magnetic pullFactor={0.3}>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500 hover:text-white transition-all hover:scale-110 ml-2"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Bottom Sub-row */}
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-2">
        <div>
          &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
        </div>
        <div className="flex items-center gap-1 text-zinc-500">
          <span>Pune, India</span>
          <span className="mx-1">•</span>
          <span>Open to SDE Roles</span>
        </div>
      </div>
    </footer>
  );
}
