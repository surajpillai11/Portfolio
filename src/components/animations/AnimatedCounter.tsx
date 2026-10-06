import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  isDecimal?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 1.8,
  isDecimal = false,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOutProgress * target;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  const displayValue = isDecimal ? count.toFixed(1) : Math.floor(count);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
