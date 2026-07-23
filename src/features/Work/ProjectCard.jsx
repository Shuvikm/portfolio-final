import { useState, useRef, useCallback, useEffect } from 'react';

// ProjectCard.jsx — Sample 2: full-width project chapter
//
// Each project occupies ~80-90% of the desktop viewport width.
// Typography-driven — no images (image: null in data).
// Architecture supports real screenshot injection later via the `image` prop.
//
// TRANSFORM OWNERSHIP LAW:
//   Root element has NO transform.
//   HorizontalScrollSection owns track translate3d.
//   Hover effects only on inner .cardInner wrapper.

export default function ProjectCard({ project }) {
  const { number, title, date, classification, buildYear, description, highlight, stack, liveUrl, githubUrl } = project;
  
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the center of the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max tilt is 4 degrees for a subtle premium feel
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    
    setTilt({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        // Full-width chapter: ~85vw, bounded
        width:         'clamp(320px, 85vw, 1100px)',
        flexShrink:     0,
        display:       'flex',
        flexDirection: 'column',
        border:        '1px solid var(--color-border)',
        background:    'var(--color-surface)',
        position:      'relative',
        // Tilt animation
        transformStyle: 'preserve-3d',
        transform:     `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition:    tilt.x === 0 && tilt.y === 0 ? 'transform 400ms ease-out' : 'none',
      }}
      aria-label={title}
    >
      {/* ── Top metadata bar ── */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        'clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2.5rem)',
        borderBottom:   '1px solid var(--color-border)',
        gap:            '1rem',
        flexWrap:       'wrap',
        transform:      'translateZ(20px)', // pop out slightly in 3D
        flexShrink:     0,
      }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <span style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '0.55rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         'var(--color-accent)',
            fontWeight:     600,
          }}>
            {classification}
          </span>
          <span style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '0.55rem',
            letterSpacing: '0.18em',
            color:         'var(--color-border)',
          }}>
            {date}
          </span>
        </div>
        <span style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '0.55rem',
          letterSpacing: '0.18em',
          color:         'var(--color-border)',
        }}>
          BUILD / {buildYear}
        </span>
      </div>

      {/* ── Main content ── */}
      <div style={{
        flex:      1,
        display:   'flex',
        flexWrap:  'wrap',
        padding:   'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
        gap:       'clamp(1.5rem, 4vw, 3rem)',
        transform: 'translateZ(40px)', // pop out more
      }}>

        {/* Left: number + title */}
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink:    0,
          flex:          '1 1 200px',
        }}>
          {/* Oversized number */}
          <span style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(4rem, 10vw, 10rem)',
            fontWeight:     700,
            lineHeight:     1,
            color:         'var(--color-border)',
            userSelect:    'none',
            pointerEvents: 'none',
            letterSpacing: '-0.04em',
          }} aria-hidden="true">
            {number}
          </span>

          <h3 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.1rem, 2.5vw, 2.5rem)',
            lineHeight:    1.05,
            letterSpacing: '-0.02em',
            color:         'var(--color-fg)',
            marginTop:     'auto',
            paddingTop:    '1rem',
          }}>
            {title}
          </h3>
        </div>

        {/* Middle: Project Thumbnail */}
        {project.image && (
          <div style={{
            flex: '1 1 300px',
            height: '100%',
            minHeight: '200px',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            borderRadius: '4px',
          }}>
            <img 
              src={project.image} 
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        {/* Right: description + highlight + stack + links */}
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap:           '1rem',
          paddingTop:    'clamp(1rem, 2vw, 1.5rem)',
          flex:          '1 1 250px',
        }}>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'clamp(0.85rem, 1.5vw, 1rem)',
            color:      'var(--color-muted)',
            lineHeight:  1.7,
            maxWidth:   '52ch',
          }}>
            {description}
          </p>

          {highlight && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(0.8rem, 1.3vw, 0.9rem)',
              color:      'var(--color-fg)',
              lineHeight:  1.6,
              borderLeft: '2px solid var(--color-accent)',
              paddingLeft: '0.85rem',
              maxWidth:   '48ch',
            }}>
              {highlight}
            </p>
          )}

          {/* Stack tags */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.75rem' }} aria-label="Tech stack">
            {stack.map((tech) => (
              <span key={tech} style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '0.55rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding:       '0.2rem 0.65rem',
                border:        '1px solid var(--color-border)',
                color:         'var(--color-muted)',
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          {(liveUrl || githubUrl) && (
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem' }}>
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.6rem',
                  fontWeight:     600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         'var(--color-accent)',
                }}>
                  LIVE ↗
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.6rem',
                  fontWeight:     600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         'var(--color-muted)',
                }}>
                  GITHUB ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
