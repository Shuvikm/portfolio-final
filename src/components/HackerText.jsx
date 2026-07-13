// HackerText.jsx — scramble effect for navigation labels
//
// On pointer enter: scramble through random uppercase glyphs,
// progressively restore the real label character by character.
// On pointer leave: restore immediately without waiting.
//
// Rules:
//   - Uses React state for displayed text (not innerHTML mutation)
//   - Clears interval before restart and on unmount
//   - Alphabet: A-Z only (ALERAK spec)
//   - 30ms interval reference

import { useState, useRef, useCallback, useEffect } from 'react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const INTERVAL = 30;

function scramble(real, progress) {
  return real
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' ';
      if (i < progress)  return char; // already resolved
      return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    })
    .join('');
}

export default function HackerText({ children, className = '', style = {} }) {
  const real       = String(children);
  const [display, setDisplay] = useState(real);
  const progressRef = useRef(0);
  const intervalRef = useRef(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const onEnter = useCallback(() => {
    clear();
    progressRef.current = 0;
    intervalRef.current = setInterval(() => {
      progressRef.current += 1;
      setDisplay(scramble(real, progressRef.current));
      if (progressRef.current >= real.length) {
        clear();
        setDisplay(real);
      }
    }, INTERVAL);
  }, [real, clear]);

  const onLeave = useCallback(() => {
    clear();
    setDisplay(real);
  }, [real, clear]);

  // Ensure cleanup on unmount
  useEffect(() => () => clear(), [clear]);

  return (
    <span
      className={className}
      style={{ display: 'inline-block', ...style }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={real}
    >
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
