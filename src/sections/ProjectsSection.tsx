import { useState } from 'react';
import { Layers, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { Reveal } from '../components/animations/Reveal';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectModal } from '../components/projects/ProjectModal';

export function ProjectsSection() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <Reveal direction="up" className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-xs font-mono text-zinc-300 mb-3">
          <span>PROJECTS</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Full-stack and backend systems I've built using Spring Boot, React, Node.js, and databases.
        </p>
      </Reveal>

      {/* Flagship Notice Banner */}
      <Reveal direction="up" delay={0.1} className="mb-10">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700/80 text-white">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-white">
                Interactive RAG Architecture Diagram
              </div>
              <div className="text-xs text-zinc-400">
                Click to explore how text extraction, Gemini embeddings, and ChromaDB work together.
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedProject(projects[0])}
            className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2 font-mono text-xs font-semibold text-zinc-200 transition-all hover:scale-105"
          >
            <Layers className="h-3.5 w-3.5 text-zinc-400" />
            <span>View RAG Pipeline</span>
          </button>
        </div>
      </Reveal>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <Reveal key={project.id} direction="up" delay={idx * 0.12}>
            <ProjectCard
              project={project}
              onOpenModal={(proj) => setSelectedProject(proj)}
            />
          </Reveal>
        ))}
      </div>

      {/* Expanded Deep Dive Modal with RAG Architecture Diagram */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
