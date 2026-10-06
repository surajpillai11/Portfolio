import { Award, ExternalLink, Trophy, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from '../components/animations/Reveal';
import { TiltCard } from '../components/animations/TiltCard';

export function CertificationsSection() {
  const { certifications } = portfolioData;

  return (
    <section id="certifications" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <Reveal direction="up" className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-xs font-mono text-zinc-300 mb-3">
          <Trophy className="h-3 w-3 text-zinc-400" />
          <span>CERTIFICATIONS</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Certifications &amp;{' '}
          <span className="text-gradient">Achievements</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Certifications and hackathon participation in Java, DSA, and web development.
        </p>
      </Reveal>

      {/* Grid of Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, idx) => (
          <Reveal key={cert.id} direction="up" delay={idx * 0.1}>
            <TiltCard
              className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-zinc-700 transition-colors flex flex-col justify-between h-full group"
              glareColor="rgba(255, 255, 255, 0.05)"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700/80 text-white shadow-sm">
                      {cert.id.includes('sih') ? (
                        <Trophy className="h-5 w-5 text-amber-400" />
                      ) : (
                        <Award className="h-5 w-5 text-zinc-300" />
                      )}
                    </div>
                    <div>
                      <span className="font-mono text-xs text-zinc-400 font-medium block">
                        {cert.issuer}
                      </span>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {cert.title}
                      </h3>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
                    {cert.date}
                  </span>
                </div>

                {/* Badge pill */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
                    <ShieldCheck className="h-3 w-3 text-zinc-400" />
                    <span>{cert.badge}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {cert.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="font-mono text-[11px] text-zinc-500">
                  Certificate
                </span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
