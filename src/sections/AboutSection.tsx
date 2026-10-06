import { GraduationCap, Compass, CheckCircle2, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from '../components/animations/Reveal';
import { AnimatedCounter } from '../components/animations/AnimatedCounter';
import { TiltCard } from '../components/animations/TiltCard';

export function AboutSection() {
  const { education, stats } = portfolioData;

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <Reveal direction="up" className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-xs font-mono text-zinc-300 mb-3">
          <span>ABOUT &amp; BACKGROUND</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          A Bit About <span className="text-gradient">Who I Am</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Writing code, building backend services with Spring Boot &amp; Node.js, and working on projects that solve real problems.
        </p>
      </Reveal>

      {/* Grid: Story + Education Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left Column: Personal Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <Reveal direction="left" delay={0.1}>
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="h-5 w-5 text-zinc-400" />
                <span>My Background</span>
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                <p>
                  I'm currently in my third year of Computer Science in{' '}
                  <strong className="text-white font-medium">Pune, India</strong>. I enjoy writing backend APIs with Java and Spring Boot, designing database schemas in MySQL and MongoDB, and building clean frontends in React.
                </p>
                <p>
                  Instead of just watching tutorials, I learn by building complete projects—like a document Q&amp;A platform that uses embeddings to search uploaded files, a habit tracker with heatmaps and email notifications, and an attendance portal for colleges.
                </p>
                <p>
                  I also spend time practicing <span className="text-white font-medium">Data Structures &amp; Algorithms</span> in Java to build a solid problem-solving foundation. I am actively preparing and looking for an <span className="text-white font-medium">SDE role</span> where I can contribute to real software and keep growing as an engineer.
                </p>
              </div>

              {/* Quick Pillars */}
              <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 text-center">
                  <span className="block font-mono text-xs font-semibold text-zinc-200">Clean Code</span>
                  <span className="text-[10px] text-zinc-400">OOP &amp; Good Habits</span>
                </div>
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 text-center">
                  <span className="block font-mono text-xs font-semibold text-zinc-200">Backend First</span>
                  <span className="text-[10px] text-zinc-400">Spring Boot &amp; Node.js</span>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 text-center">
                  <span className="block font-mono text-xs font-semibold text-zinc-200">Practical AI</span>
                  <span className="text-[10px] text-zinc-400">RAG &amp; API Integration</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Education Timeline Card */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <Reveal direction="right" delay={0.2} className="h-full">
            <TiltCard
              className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 h-full flex flex-col justify-between"
              glareColor="rgba(255, 255, 255, 0.05)"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700/80 text-white shadow-sm">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-700/80 px-3 py-1 rounded-full">
                    {education.period}
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-1">
                  {education.degree}
                </h3>
                <div className="font-mono text-xs text-zinc-400 font-medium mb-2">
                  {education.field}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-5">
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{education.location}</span>
                </div>

                <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
                  <div className="font-mono text-2xl font-black text-white">
                    {education.cgpa}
                  </div>
                  <div className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider">
                    Cumulative Grade Point Average (CGPA)
                  </div>
                </div>

                <h4 className="font-heading text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Academic Focus &amp; Milestones
                </h4>
                <ul className="space-y-2">
                  {education.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-zinc-400 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>

      {/* Animated Numerical Metric Counters */}
      <Reveal direction="up" delay={0.3}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-zinc-700 transition-colors text-center group"
            >
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white mb-1 group-hover:text-blue-400 transition-colors">
                <AnimatedCounter
                  target={stat.numericTarget}
                  isDecimal={stat.isDecimal}
                  suffix={stat.suffix}
                />
              </div>
              <div className="font-heading text-xs sm:text-sm font-semibold text-zinc-200">
                {stat.label}
              </div>
              <div className="font-mono text-[10px] text-zinc-500 mt-0.5 truncate">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
