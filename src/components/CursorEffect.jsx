// CursorEffect.jsx — ALERAK-style lightweight circle cursor
//
// Visual: 20px lime circle, mix-blend-mode: difference, lerp-follows-mouse.
// Magnet state: expands to 90px transparent ring with inner 10px dot.
//
// Ownership rules (strict):
//   - Exclusively owns mouseX, mouseY, cursorX, cursorY via refs
//   - One pointermove listener on window
//   - One RAF loop (always running while mounted)
//   - Cursor state changes via window CustomEvents: 'cursor:magnet-on' / 'cursor:magnet-off'
//   - body.has-custom-cursor enables native cursor suppression
//   - Disabled for: pointer:coarse, hover:none, prefers-reduced-motion

import { useEffect, useRef } from 'react';

const LERP = 0.12;

// Detect once at module load — avoids re-querying on every render
function shouldEnable() {
  if (typeof window === 'undefined') return false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse  = window.matchMedia('(pointer: coarse)').matches;
  const noHover = !window.matchMedia('(hover: hover)').matches;
  return !reduced && !coarse && !noHover;
}

export default function CursorEffect() {
  const cursorRef  = useRef(null);
  const mouseRef   = useRef({ x: -200, y: -200 });
  const posRef     = useRef({ x: -200, y: -200 });
  const rafRef     = useRef(null);
  const visibleRef = useRef(false);
  const enabledRef = useRef(shouldEnable());

  useEffect(() => {
    if (!enabledRef.current) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Activate body class → hides native cursor
    document.body.classList.add('has-custom-cursor');

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      posRef.current.x = lerp(posRef.current.x, mouseRef.current.x, LERP);
      posRef.current.y = lerp(posRef.current.y, mouseRef.current.y, LERP);
      cursor.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    const onPointerMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        // Snap to mouse on first appearance to avoid lerp-from-corner
        posRef.current   = { x: e.clientX, y: e.clientY };
        cursor.style.opacity = '1';
        visibleRef.current   = true;
      }
    };

    const onMagnetOn  = () => cursor.classList.add('is-magnet');
    const onMagnetOff = () => cursor.classList.remove('is-magnet');

    window.addEventListener('pointermove',       onPointerMove, { passive: true });
    window.addEventListener('cursor:magnet-on',  onMagnetOn);
    window.addEventListener('cursor:magnet-off', onMagnetOff);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove',       onPointerMove);
      window.removeEventListener('cursor:magnet-on',  onMagnetOn);
      window.removeEventListener('cursor:magnet-off', onMagnetOff);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabledRef.current) return null;

  return (
    <div
      ref={cursorRef}
      className="cursor-dot"
      aria-hidden="true"
      style={{ opacity: 0 }}
    />
  );
}
