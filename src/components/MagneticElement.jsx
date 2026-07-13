// MagneticElement.jsx — ALERAK-style magnetic interaction
//
// Applies a magnetic pull toward the pointer based on center-distance.
// CRITICAL: uses an inner wrapper so the element's own transform is never
// overwritten by parent systems (nav tilt, horizontal scroll).
//
// Cursor magnet state: dispatches cursor:magnet-on / cursor:magnet-off
// CustomEvents to notify CursorEffect — no direct DOM queries.
//
// Disabled for: pointer:coarse, hover:none.
// Uses refs only — no React state for pointer coordinates.

import { useRef, useEffect, useCallback } from 'react';

const DECAY_SPEED = 0.12;
const THRESHOLD   = 0.01; // stop RAF when translation is this small

function canUseMagnetic() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(hover: hover)').matches &&
    !window.matchMedia('(pointer: coarse)').matches
  );
}

export default function MagneticElement({
  children,
  strength = 0.5,
  className = '',
  style     = {},
  tag: Tag  = 'div',
}) {
  const outerRef   = useRef(null);
  const innerRef   = useRef(null);
  const rafRef     = useRef(null);
  const targetRef  = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const activeRef  = useRef(false);
  const capable    = canUseMagnetic();

  const lerp = (a, b, t) => a + (b - a) * t;

  const startDecay = useCallback(() => {
    if (rafRef.current) return;
    const decay = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, DECAY_SPEED);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, DECAY_SPEED);

      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
      }

      const dist = Math.abs(currentRef.current.x - targetRef.current.x) +
                   Math.abs(currentRef.current.y - targetRef.current.y);

      if (dist > THRESHOLD || activeRef.current) {
        rafRef.current = requestAnimationFrame(decay);
      } else {
        rafRef.current = null;
        if (innerRef.current) innerRef.current.style.transform = 'translate3d(0,0,0)';
      }
    };
    rafRef.current = requestAnimationFrame(decay);
  }, []);

  const onMouseEnter = useCallback(() => {
    if (!capable) return;
    activeRef.current = true;
    window.dispatchEvent(new CustomEvent('cursor:magnet-on'));
    startDecay();
  }, [capable, startDecay]);

  const onMouseMove = useCallback((e) => {
    if (!capable || !outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const dx   = e.clientX - (rect.left + rect.width  / 2);
    const dy   = e.clientY - (rect.top  + rect.height / 2);
    targetRef.current = { x: dx * strength, y: dy * strength };
  }, [capable, strength]);

  const onMouseLeave = useCallback(() => {
    if (!capable) return;
    activeRef.current = false;
    targetRef.current = { x: 0, y: 0 };
    window.dispatchEvent(new CustomEvent('cursor:magnet-off'));
    startDecay();
  }, [capable, startDecay]);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  if (!capable) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={outerRef}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Inner wrapper — exclusively owns translate3d, never conflicts with outer transform */}
      <div ref={innerRef} style={{ display: 'contents' }}>
        {children}
      </div>
    </Tag>
  );
}
