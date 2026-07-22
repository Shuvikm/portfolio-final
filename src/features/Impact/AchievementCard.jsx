// AchievementCard.jsx — Phase 6 full visual design
// Updated to support proofImage with lightbox trigger.
// If proofImage is null: renders as a pure typography panel.
// If proofImage exists: renders a "VIEW PROOF" button that opens MediaLightbox.
//
// TRANSFORM OWNERSHIP LAW:
//   This component must NOT modify its root element's transform.
//   All motion must be on an inner wrapper (.cardInner).

import { useState } from 'react';
import MediaLightbox from '../../components/MediaLightbox';

export default function AchievementCard({ achievement }) {
  const { number, type, title, organization, description, date, proofImage } = achievement;
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // proofImages — always an array for lightbox
  const proofImages = proofImage ? [proofImage] : [];

  return (
    <>
      <article
        style={{
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          minWidth: 'clamp(280px, 32vw, 480px)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          // NO transform here — HorizontalScrollSection owns the track transform
        }}
        aria-label={title}
      >
        {/* ── Oversized number ── */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            fontWeight: 700,
            lineHeight: 1,
            color: 'var(--color-border)',
            padding: '1.5rem 2rem 0',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          {number}
        </div>

        {/* ── Content ── */}
        <div style={{ padding: '1rem 2rem 2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* TYPE badge */}
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              color: 'var(--color-accent)',
              borderLeft: '2px solid var(--color-accent)',
              paddingLeft: '0.5rem',
            }}
          >
            {type}
          </span>

          {/* TITLE */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)',
              lineHeight: 1.2,
              color: 'var(--color-fg)',
              marginTop: '0.25rem',
            }}
          >
            {title}
          </h3>

          {/* ORGANISATION or DESCRIPTION
              Privacy rule: only show up to the first sentence of the description.
              This prevents blood group (and similar sensitive metadata) from
              being displayed publicly even if it exists in the raw data. */}
          {(organization || description) && (() => {
            const rawText   = organization || description;
            // Show only the first sentence (up to and including the first period)
            const firstSentence = rawText.split(/\.\s/)[0];
            const safeText  = firstSentence.replace(/\.$/, '');
            return (
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.85rem',
                color:      'var(--color-muted)',
                lineHeight:  1.5,
              }}>
                {safeText}.
              </p>
            );
          })()}

          {/* DATE */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              color: 'var(--color-muted)',
              marginTop: 'auto',
              paddingTop: '1rem',
            }}
          >
            {date}
          </p>

          {/* VIEW PROOF button — only when proofImage exists */}
          {proofImages.length > 0 && (
            <button
              onClick={() => setLightboxOpen(true)}
              aria-label={`View proof image for ${title}`}
              id={`ach-proof-${achievement.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginTop: '1rem',
                alignSelf: 'flex-start',
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-fg)',
                background: 'none',
                border: '1px solid var(--color-border)',
                padding: '0.45rem 0.9rem',
                cursor: 'pointer',
                transition: 'background 150ms ease, color 150ms ease, border-color 150ms ease',
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
              ↗ VIEW PROOF
            </button>
          )}
        </div>
      </article>

      {/* ── Lightbox (rendered outside the card to avoid z-index conflicts) ── */}
      <MediaLightbox
        isOpen={lightboxOpen}
        images={proofImages}
        initialIndex={0}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
