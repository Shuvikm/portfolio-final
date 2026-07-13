// ─────────────────────────────────────────────────────────────────────────────
// usePointerCapabilities.js
// Returns pointer capability flags.
// Used to gate WebGL cursor, magnetic interactions, and hover animations.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';

function detect() {
  if (typeof window === 'undefined') {
    return { isCoarse: false, hasHover: true, isFinePointer: true };
  }
  return {
    isCoarse:      window.matchMedia('(pointer: coarse)').matches,
    hasHover:      window.matchMedia('(hover: hover)').matches,
    isFinePointer: window.matchMedia('(pointer: fine)').matches,
  };
}

export function usePointerCapabilities() {
  const [caps, setCaps] = useState(detect);

  useEffect(() => {
    const mqCoarse = window.matchMedia('(pointer: coarse)');
    const mqHover  = window.matchMedia('(hover: hover)');
    const mqFine   = window.matchMedia('(pointer: fine)');

    const handler = () => setCaps(detect());

    const addL = (mq) =>
      mq.addEventListener ? mq.addEventListener('change', handler)
                          : mq.addListener(handler);
    const remL = (mq) =>
      mq.removeEventListener ? mq.removeEventListener('change', handler)
                             : mq.removeListener(handler);

    addL(mqCoarse);
    addL(mqHover);
    addL(mqFine);

    return () => {
      remL(mqCoarse);
      remL(mqHover);
      remL(mqFine);
    };
  }, []);

  return caps;
}
