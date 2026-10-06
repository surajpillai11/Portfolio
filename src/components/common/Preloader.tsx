import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ENVIRONMENT');

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1500; // Fast and snappy

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(rawProgress);

      if (rawProgress < 35) {
        setStatusText('INITIALIZING...');
      } else if (rawProgress < 75) {
        setStatusText('LOADING COMPONENTS...');
      } else if (rawProgress < 99) {
        setStatusText('PREPARING ENVIRONMENT...');
      } else {
        setStatusText('READY');
      }

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{
          y: '-100%',
          transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] },
        }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-white selection:bg-transparent"
      >
        <div className="relative z-10 flex flex-col items-center">
          {/* Monogram "SP" */}
          <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
            {/* Spinning clean border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="absolute inset-0 rounded-2xl border border-dashed border-zinc-800"
            />

            <svg
              className="h-16 w-16"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="spGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>

              {/* S Path */}
              <motion.path
                d="M 42 34 C 42 27, 24 27, 24 38 C 24 49, 42 49, 42 62 C 42 74, 23 74, 23 66"
                stroke="url(#spGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />

              {/* P Path */}
              <motion.path
                d="M 58 70 L 58 30 C 58 30, 80 30, 80 44 C 80 56, 58 56, 58 56"
                stroke="url(#spGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.15 }}
              />
            </svg>
          </div>

          {/* Title */}
          <div className="text-center font-mono tracking-widest uppercase mb-6">
            <span className="text-xs text-zinc-400">SURAJ PILLAI</span>
          </div>

          {/* Progress Bar */}
          <div className="w-60">
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-zinc-900">
              <motion.div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Percentage & Status Readout */}
            <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-zinc-500">
              <span className="truncate max-w-[170px]">{statusText}</span>
              <span className="font-semibold text-zinc-300">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-8 font-mono text-[10px] text-zinc-600 tracking-wider">
          PUNE, INDIA // SOFTWARE DEVELOPER
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
