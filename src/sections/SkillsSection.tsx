import { useState } from 'react';
import {
  Code2,
  Server,
  Layout,
  Database,
  Wrench,
  Layers,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from '../components/animations/Reveal';
import { Marquee } from '../components/animations/Marquee';
import { TiltCard } from '../components/animations/TiltCard';

const CATEGORY_ICONS: Record<string, any> = {
  Code2,
  Server,
  Layout,
  Database,
  Wrench,
  Layers,
};

export function SkillsSection() {
  const { skillsCategories, marqueeSkills } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredCategories =
    selectedCategory === 'All'
      ? skillsCategories
      : skillsCategories.filter((c) => c.category === selectedCategory);

  // Split marquee skills into two rows
  const half = Math.ceil(marqueeSkills.length / 2);
  const marqueeRow1 = marqueeSkills.slice(0, half);
  const marqueeRow2 = marqueeSkills.slice(half);

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-xs font-mono text-zinc-300 mb-3">
            <span>SKILLS &amp; TECHNOLOGIES</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            What I <span className="text-gradient">Work With</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            The programming languages, frameworks, databases, and developer tools I use to build full-stack projects.
          </p>
        </Reveal>
      </div>

      {/* Infinite Scrolling Marquee Banner (Opposite Directions) */}
      <div className="space-y-3 mb-16 py-4">
        {/* Row 1: Left */}
        <Marquee direction="left" speedSeconds={28} pauseOnHover>
          {marqueeRow1.map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-5 py-2 backdrop-blur-md hover:border-zinc-700 hover:bg-zinc-800 transition-all cursor-default group"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-zinc-500 group-hover:bg-blue-400 transition-colors" />
              <span className="font-heading font-semibold text-sm text-zinc-200 group-hover:text-white transition-colors">
                {item.name}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 bg-zinc-800/80 border border-zinc-700/50 px-2 py-0.5 rounded-full">
                {item.category}
              </span>
            </div>
          ))}
        </Marquee>

        {/* Row 2: Right */}
        <Marquee direction="right" speedSeconds={32} pauseOnHover>
          {marqueeRow2.map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-5 py-2 backdrop-blur-md hover:border-zinc-700 hover:bg-zinc-800 transition-all cursor-default group"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-zinc-500 group-hover:bg-blue-400 transition-colors" />
              <span className="font-heading font-semibold text-sm text-zinc-200 group-hover:text-white transition-colors">
                {item.name}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 bg-zinc-800/80 border border-zinc-700/50 px-2 py-0.5 rounded-full">
                {item.category}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <Reveal direction="up" delay={0.1} className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl glass-panel p-1.5 border border-zinc-800">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-medium font-mono transition-all ${
                selectedCategory === 'All'
                  ? 'bg-white text-zinc-950 shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              All
            </button>
            {skillsCategories.map((c) => (
              <button
                key={c.category}
                onClick={() => setSelectedCategory(c.category)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium font-mono transition-all ${
                  selectedCategory === c.category
                    ? 'bg-white text-zinc-950 shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Categorized Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => {
            const IconComponent = CATEGORY_ICONS[cat.iconName] || Code2;

            return (
              <Reveal key={cat.category} direction="up" delay={idx * 0.08}>
                <TiltCard
                  className="glass-card p-6 rounded-2xl border border-white/10 h-full flex flex-col justify-between hover:border-zinc-700 transition-colors"
                  glareColor="rgba(255, 255, 255, 0.05)"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700/80 text-white">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-white">
                          {cat.category}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Clean Skill Tags (Only skill names, no experience levels) */}
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skillName) => (
                        <span
                          key={skillName}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 font-mono text-xs text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                          <span>{skillName}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
