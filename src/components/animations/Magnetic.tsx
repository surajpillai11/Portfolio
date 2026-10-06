import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  pullFactor?: number;
}

export function Magnetic({ children, className = '', pullFactor = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReduced = usePrefersReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * pullFactor;
    const deltaY = (clientY - centerY) * pullFactor;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 18, mass: 0.5 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
