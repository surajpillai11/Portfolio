import { motion } from 'framer-motion';
import { Mail, ArrowDown, FileText, Send, Layers, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { HeroCanvas } from '../components/hero/HeroCanvas';
import { Typewriter } from '../components/hero/Typewriter';
import { Magnetic } from '../components/animations/Magnetic';
import { GithubIcon, LinkedinIcon } from '../components/common/Icons';

export function HeroSection() {
  const { personal } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:px-8"
    >
      {/* 3D Three.js Particle Constellation */}
      <HeroCanvas />

      {/* Subtle architectural vignette in background */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Status Pill Badge */}
          <motion.div variants={itemVariants} className="mb-5 inline-block">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-medium text-zinc-300">
                {personal.availability}
              </span>
            </div>
          </motion.div>

          {/* Location & University Tag */}
          <motion.div
            variants={itemVariants}
            className="mb-3 flex items-center gap-1.5 font-mono text-xs text-zinc-400"
          >
            <MapPin className="h-3.5 w-3.5 text-zinc-500" />
            <span>Pune, Maharashtra, India // 3rd Year B.E. CSE</span>
          </motion.div>

          {/* Staggered Name Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
          >
            Hi, I'm <span className="text-gradient">{personal.name}</span>
          </motion.h1>

          {/* Cycling Typewriter Subheading */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex flex-wrap items-center justify-center gap-2 text-base sm:text-xl font-medium text-zinc-300"
          >
            <span className="text-zinc-400">I work as a</span>
            <Typewriter
              words={personal.roleCategories}
              className="text-blue-400 font-semibold font-mono"
            />
          </motion.div>

          {/* Primary Tagline & Short Intro */}
          <motion.p
            variants={itemVariants}
            className="mb-3 max-w-2xl text-lg sm:text-xl font-medium text-zinc-200"
          >
            "{personal.tagline}"
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed"
          >
            {personal.shortIntro}
          </motion.p>

          {/* Call-To-Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            {/* View Projects CTA */}
            <Magnetic pullFactor={0.25}>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-950 shadow-sm transition-all duration-200 hover:bg-zinc-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              >
                <Layers className="h-4 w-4 text-zinc-800" />
                <span>View Projects</span>
              </a>
            </Magnetic>

            {/* Download Resume CTA */}
            <Magnetic pullFactor={0.25}>
              <a
                href={personal.resumeUrl}
                download="Suraj_Pillai_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-900/90 px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-200 backdrop-blur-md transition-all duration-200 hover:bg-zinc-800 hover:border-zinc-500 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              >
                <FileText className="h-4 w-4 text-zinc-400" />
                <span>Download Resume</span>
              </a>
            </Magnetic>

            {/* Contact Me CTA */}
            <Magnetic pullFactor={0.25}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/40 px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-400 backdrop-blur-md transition-all duration-200 hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              >
                <Send className="h-4 w-4 text-zinc-400" />
                <span>Contact Me</span>
              </a>
            </Magnetic>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3.5"
          >
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suraj's GitHub Profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white hover:scale-110 transition-all duration-200 shadow-sm"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suraj's LinkedIn Profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white hover:scale-110 transition-all duration-200 shadow-sm"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>

            <a
              href={`mailto:${personal.email}`}
              aria-label="Email Suraj Pillai"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white hover:scale-110 transition-all duration-200 shadow-sm"
            >
              <Mail className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-1 opacity-70">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4 text-zinc-500" />
        </motion.div>
      </div>
    </section>
  );
}
