import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speedSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  direction = 'left',
  speedSeconds = 25,
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div
      className={`group relative flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] ${className}`}
    >
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-6 ${animationClass} ${
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        }`}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex min-w-full shrink-0 items-center justify-around gap-6 ${animationClass} ${
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        }`}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {children}
      </div>
    </div>
  );
}
