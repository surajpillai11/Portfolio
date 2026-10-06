import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(true);
  const prefersReduced = usePrefersReducedMotion();

  // Smooth springs for outer follower
  const springX = useSpring(0, { stiffness: 450, damping: 28 });
  const springY = useSpring(0, { stiffness: 450, damping: 28 });

  // Tighter springs for dot
  const dotX = useSpring(0, { stiffness: 900, damping: 35 });
  const dotY = useSpring(0, { stiffness: 900, damping: 35 });

  useEffect(() => {
    // Detect touch-only screen
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsPointerDevice(false);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      springX.set(e.clientX);
      springY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      // Check if target is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .tilt-card, .interactive-hover');
        setIsHovered(!!interactive);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, springX, springY, dotX, dotY]);

  if (!isPointerDevice || prefersReduced || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Glow Halo */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="fixed top-0 left-0 h-10 w-10 rounded-full border border-cyan-400/40 bg-cyan-400/10 backdrop-blur-[1px] shadow-[0_0_20px_rgba(0,242,254,0.35)]"
      />

      {/* Center Laser Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-gradient-to-r from-cyan-300 via-pink-400 to-violet-300 shadow-[0_0_8px_#00f2fe]"
      />
    </div>
  );
}
