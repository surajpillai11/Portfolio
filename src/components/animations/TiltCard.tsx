import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glareColor?: string;
}

export function TiltCard({
  children,
  className = '',
  onClick,
  glareColor = 'rgba(255, 255, 255, 0.05)',
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const prefersReduced = usePrefersReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`tilt-card relative group rounded-2xl transition-shadow duration-300 ${className}`}
    >
      {/* Glare / Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle 280px at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor}, transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
