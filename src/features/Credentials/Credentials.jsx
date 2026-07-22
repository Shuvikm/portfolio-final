// Credentials.jsx — 05 / CREDENTIALS
//
// Visual evidence section for certifications.
// Proof images open in MediaLightbox — rendered outside the card hierarchy,
// above the cursor layer (z-index architecture preserved).
//
// NeonCursorEffect remains in the portfolio layer; MediaLightbox renders at
// z-index: var(--z-modal) which must exceed var(--z-cursor).

import { useState } from 'react';
import { certifications } from '../../data/portfolioData';
import SectionLabel   from '../../components/SectionLabel';
import MediaLightbox  from '../../components/MediaLightbox';

export default function Credentials() {
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxOpen,   setLightboxOpen]   = useState(false);
  const [lightboxIndex,  setLightboxIndex]  = useState(0);

  const openProof = (images, startIndex = 0) => {
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
  };

  const closeProof = () => {
    setLightboxOpen(false);
    setTimeout(() => setLightboxImages([]), 300);
  };

  return (
    <>
      <section
        id="credentials"
        className="section"
        aria-label="Certifications and credentials"
        style={{ zIndex: 'var(--z-content)', position: 'relative' }}
      >
        <div style={{ padding: '0 var(--page-padding-x)' }}>
          <SectionLabel>— 05 / CREDENTIALS</SectionLabel>

          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2rem, 6vw, 6rem)',
            lineHeight:    0.92,
            letterSpacing: '-0.02em',
            marginTop:     'clamp(2rem, 4vw, 3rem)',
            marginBottom:  'clamp(2rem, 5vw, 4rem)',
          }}>
            VERIFIED<br />
            <span style={{ color: 'var(--color-accent)' }}>CREDENTIALS.</span>
          </h2>

          {/* Credentials list */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {certifications.map((cert, idx) => (
              <div
                key={cert.id}
                style={{
                  display:        'grid',
                  gridTemplateColumns: 'clamp(2rem, 4vw, 3rem) 1fr auto',
                  gap:            'clamp(1rem, 3vw, 2.5rem)',
                  alignItems:     'center',
                  padding:        'clamp(1.5rem, 3vw, 2.5rem) 0',
                  borderTop:      '1px solid var(--color-border)',
                  borderBottom:   idx === certifications.length - 1 ? '1px solid var(--color-border)' : 'none',
                }}
              >
                {/* Index */}
                <span style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.55rem',
                  letterSpacing: '0.2em',
                  color:         'var(--color-border)',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily:    'var(--font-display)',
                      fontSize:      'clamp(0.9rem, 2.5vw, 1.75rem)',
                      letterSpacing: '-0.01em',
                      color:         'var(--color-fg)',
                      lineHeight:    1.1,
                    }}>
                      {cert.title.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      '0.6rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color:         'var(--color-accent)',
                      fontWeight:     600,
                    }}>
                      {cert.issuer}
                    </span>
                    <span style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      '0.6rem',
                      letterSpacing: '0.1em',
                      color:         'var(--color-muted)',
                    }}>
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Proof buttons */}
                {cert.proofImages && cert.proofImages.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {cert.proofImages.map((img, imgIdx) => (
                      <button
                        key={img.label}
                        onClick={() => openProof(cert.proofImages, imgIdx)}
                        aria-label={`View ${img.label} for ${cert.title}`}
                        id={`cert-proof-${cert.id}-${imgIdx}`}
                        style={{
                          display:       'inline-flex',
                          alignItems:    'center',
                          gap:           '0.35rem',
                          fontFamily:    'var(--font-body)',
                          fontSize:      '0.6rem',
                          fontWeight:     600,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color:         'var(--color-fg)',
                          background:    'none',
                          border:        '1px solid var(--color-border)',
                          padding:       '0.45rem 0.9rem',
                          cursor:        'pointer',
                          transition:    'background 150ms ease, color 150ms ease, border-color 150ms ease',
                          whiteSpace:    'nowrap',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background   = 'var(--color-accent)';
                          e.currentTarget.style.color        = 'var(--color-bg)';
                          e.currentTarget.style.borderColor  = 'var(--color-accent)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background   = 'none';
                          e.currentTarget.style.color        = 'var(--color-fg)';
                          e.currentTarget.style.borderColor  = 'var(--color-border)';
                        }}
                      >
                        ↗ {img.label.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox rendered outside section — above cursor layer ── */}
      <MediaLightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        initialIndex={lightboxIndex}
        onClose={closeProof}
      />
    </>
  );
}
