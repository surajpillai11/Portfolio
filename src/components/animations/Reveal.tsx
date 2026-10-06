import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
}: RevealProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const offset = 35;
  const initialVariants = {
    up: { opacity: 0, y: offset },
    down: { opacity: 0, y: -offset },
    left: { opacity: 0, x: offset },
    right: { opacity: 0, x: -offset },
    none: { opacity: 0 },
  };

  return (
    <motion.div
      initial={initialVariants[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: 'easeOut' as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
