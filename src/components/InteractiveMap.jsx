import React from 'react';

export default function InteractiveMap() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--dark-bg, #030712)' }}>
      <iframe 
        src="/assets/tactical-map.html" 
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Tactical Attack Map"
      />
    </div>
  );
}
