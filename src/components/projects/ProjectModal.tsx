import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle, Cpu, Calendar } from 'lucide-react';
import type { Project } from '../../data/portfolioData';
import { RagDiagram } from './RagDiagram';
import { GithubIcon } from '../common/Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-800 bg-[#0c0c10] p-6 sm:p-8 shadow-2xl text-zinc-100"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              aria-label="Close project modal"
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header info */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="rounded-full bg-zinc-800 border border-zinc-700 px-3 py-1 font-mono text-xs text-zinc-200">
                {project.badge}
              </span>
              <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>{project.date}</span>
              </div>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {project.title}
            </h3>
            <p className="font-mono text-xs sm:text-sm text-zinc-400 mb-6">
              {project.tagline}
            </p>

            {/* Metrics cards if available */}
            {project.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-center"
                  >
                    <div className="font-mono text-base sm:text-lg font-bold text-white">
                      {m.value}
                    </div>
                    <div className="font-mono text-[10px] text-zinc-500 uppercase mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Description */}
            <div className="mb-6">
              <h4 className="font-heading text-sm font-semibold text-zinc-300 mb-2 uppercase tracking-wider">
                About the Project
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Key Features Bullets */}
            <div className="mb-6">
              <h4 className="font-heading text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
                Key Features &amp; Implementation
              </h4>
              <ul className="space-y-2.5">
                {project.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RAG Pipeline Interactive Diagram for AI Report Analyzer */}
            {project.hasArchitectureDiagram && (
              <div className="mb-8">
                <RagDiagram />
              </div>
            )}

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="font-heading text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-zinc-400" />
                <span>Technologies Used</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-950 shadow-sm hover:bg-zinc-200 transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Launch Live Demo</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-200 hover:bg-zinc-800 hover:border-zinc-500 hover:text-white transition-all"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>Source Code</span>
                </a>
              </div>
              <button
                onClick={onClose}
                className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Close Window [Esc]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
