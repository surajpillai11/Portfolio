import { ExternalLink, ArrowUpRight, Layers } from 'lucide-react';
import type { Project } from '../../data/portfolioData';
import { TiltCard } from '../animations/TiltCard';
import { GithubIcon } from '../common/Icons';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  return (
    <TiltCard
      className="glass-card flex flex-col justify-between overflow-hidden border border-white/10 hover:border-zinc-700 transition-colors duration-300"
      glareColor="rgba(255, 255, 255, 0.05)"
    >
      <div>
        {/* Visual Mockup Banner */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-950/80 p-5 flex flex-col justify-between border-b border-zinc-800/80">
          {/* Top badge row */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full border border-zinc-700/80 bg-zinc-900/90 px-3 py-1 font-mono text-[11px] font-semibold text-zinc-200 backdrop-blur-md shadow-sm">
              <span>{project.badge}</span>
            </span>
            <span className="font-mono text-xs text-zinc-400 bg-zinc-900/80 px-2.5 py-0.5 rounded-full border border-zinc-800">
              {project.date}
            </span>
          </div>

          {/* Graphic mockup wireframe / code snippet simulation */}
          <div className="relative z-10 rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 backdrop-blur-sm shadow-inner group-hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="h-2 w-2 rounded-full bg-rose-500/80" />
              <div className="h-2 w-2 rounded-full bg-amber-500/80" />
              <div className="h-2 w-2 rounded-full bg-emerald-500/80" />
              <span className="font-mono text-[10px] text-zinc-400 ml-2">
                {project.id}.service.java
              </span>
            </div>
            <div className="font-mono text-[11px] text-zinc-300 truncate">
              {project.hasArchitectureDiagram
                ? 'RAG_Pipeline.query(docId, embeddings) -> GroundedResponse'
                : 'AnalyticsEngine.computeStreak(userId, activityMap) -> 365d'}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="font-heading text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1.5">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-zinc-400 mb-3">
            {project.tagline}
          </p>

          <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech stack chips (first 5) */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 font-mono text-[11px] text-zinc-500">
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 pb-6 pt-0 border-t border-zinc-800/80 mt-auto">
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => onOpenModal(project)}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors group/btn"
          >
            <Layers className="h-3.5 w-3.5 group-hover/btn:rotate-12 transition-transform" />
            <span>Architecture &amp; Specs</span>
            <ArrowUpRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repo for ${project.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-600 hover:text-white transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-600 hover:text-white transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
