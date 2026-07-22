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

          {/* Credentials Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {certifications.map((cert, idx) => (
              <div
                key={cert.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2rem',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  position: 'relative',
                }}
              >
                {/* Index */}
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  marginBottom: '1.5rem',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Badge Placeholder */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'var(--color-bg)',
                  border: '2px solid var(--color-border)',
                  margin: '0 auto 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>

                {/* Content */}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  lineHeight: 1.2,
                  marginBottom: '0.5rem',
                  color: 'var(--color-fg)',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}>
                  {cert.title}
                </h3>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--color-muted)',
                  marginBottom: '2rem',
                  textAlign: 'center',
                }}>
                  <span style={{ color: 'var(--color-accent)' }}>{cert.issuer}</span>
                  <span>•</span>
                  <span>{cert.date}</span>
                </div>

                {/* Proof buttons */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  {cert.proofImages && cert.proofImages.length > 0 ? (
                    cert.proofImages.map((img, imgIdx) => (
                      <button
                        key={img.label}
                        onClick={() => openProof(cert.proofImages, imgIdx)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          background: 'none',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-fg)',
                          cursor: 'pointer',
                          transition: 'all 150ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--color-accent)';
                          e.currentTarget.style.color = 'var(--color-bg)';
                          e.currentTarget.style.borderColor = 'var(--color-accent)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'none';
                          e.currentTarget.style.color = 'var(--color-fg)';
                          e.currentTarget.style.borderColor = 'var(--color-border)';
                        }}
                      >
                        VIEW {img.label.toUpperCase()} ↗
                      </button>
                    ))
                  ) : (
                    <div style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.7rem' }}>
                      VERIFIED
                    </div>
                  )}
                </div>
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
