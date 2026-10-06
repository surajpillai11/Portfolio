import { useEffect, useState } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
}

export function Typewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseMs = 1800,
  className = '',
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (currentText.length < currentWord.length) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseMs);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={`inline-flex items-center font-mono ${className}`}>
      <span>{currentText}</span>
      <span
        className="ml-1 inline-block h-[1.1em] w-[2px] bg-blue-500 animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}
