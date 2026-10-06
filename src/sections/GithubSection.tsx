import { Star, GitFork, ExternalLink, AlertCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useGithubData } from '../hooks/useGithubData';
import { Reveal } from '../components/animations/Reveal';
import { TiltCard } from '../components/animations/TiltCard';
import { GithubIcon } from '../components/common/Icons';

export function GithubSection() {
  const { repos, isLoading, error } = useGithubData(portfolioData.github.username);

  return (
    <section id="github" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <Reveal direction="up" className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-xs font-mono text-zinc-300 mb-3">
          <GithubIcon className="h-3.5 w-3.5 text-zinc-400" />
          <span>OPEN SOURCE</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Code on <span className="text-gradient">GitHub</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Public repositories and code I work on. Fetched live from my profile{' '}
          <a
            href={portfolioData.github.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white underline font-mono"
          >
            @{portfolioData.github.username}
          </a>
          .
        </p>
      </Reveal>

      {/* Offline Notice if applicable */}
      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-300 font-mono">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
          <span>Note: Showing cached repositories.</span>
        </div>
      )}

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? // Skeleton loaders
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="glass-card p-6 rounded-2xl border border-white/5 animate-pulse flex flex-col justify-between h-44"
              >
                <div>
                  <div className="h-4 w-3/4 rounded bg-zinc-800 mb-3" />
                  <div className="h-3 w-full rounded bg-zinc-800/60 mb-2" />
                  <div className="h-3 w-4/5 rounded bg-zinc-800/60" />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                  <div className="h-3 w-16 rounded bg-zinc-800" />
                  <div className="h-3 w-12 rounded bg-zinc-800" />
                </div>
              </div>
            ))
          : repos.map((repo, idx) => (
              <Reveal key={repo.name} direction="up" delay={idx * 0.08}>
                <TiltCard
                  className="glass-card p-6 rounded-2xl border border-white/10 hover:border-zinc-700 transition-colors h-full flex flex-col justify-between group"
                  glareColor="rgba(255, 255, 255, 0.05)"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <GithubIcon className="h-4 w-4 shrink-0 text-zinc-400" />
                        <h4 className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                          {repo.name}
                        </h4>
                      </div>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open repository ${repo.name}`}
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed mb-6">
                      {repo.description || 'Public software project by Suraj Pillai.'}
                    </p>
                  </div>

                  {/* Footer Metrics */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      <span className="text-zinc-300 text-[11px]">{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-400" />
                        <span>{repo.stars}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3 w-3 text-zinc-400" />
                        <span>{repo.forks}</span>
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
      </div>

      {/* Centered link to full GitHub profile */}
      <div className="mt-10 flex justify-center">
        <a
          href={portfolioData.github.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-2.5 font-mono text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white transition-all hover:scale-105"
        >
          <GithubIcon className="h-4 w-4" />
          <span>See more repositories on GitHub</span>
          <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
        </a>
      </div>
    </section>
  );
}
