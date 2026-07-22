// Identity.jsx — 02 / ABOUT (id="about")
//
// ALERAK-style big-text editorial identity section.
// Large statement typography, not a resume objective.
// Education as technical metadata block.

import { profile, education } from '../../data/portfolioData';
import SectionLabel from '../../components/SectionLabel';

export default function Identity() {
  const [college, school] = education;

  return (
    <section
      id="about"
      className="section"
      aria-label="About Shuvik M"
      style={{ zIndex: 'var(--z-content)', position: 'relative' }}
    >
      <div style={{ padding: '0 var(--page-padding-x)' }}>
        <SectionLabel>— 02 / ABOUT</SectionLabel>
        {/* ── Primary editorial statement ── */}
        <h2
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.75rem, 5.5vw, 6rem)',
            lineHeight:    1.0,
            letterSpacing: '-0.02em',
            marginTop:     'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom:  'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          I BUILD{' '}
          <span style={{ color: 'var(--color-accent)' }}>PRACTICAL</span>{' '}
          DIGITAL SYSTEMS<br />
          THAT TURN IDEAS INTO{' '}
          <span style={{ color: 'var(--color-fg)' }}>WORKING</span>{' '}
          EXPERIENCES.
        </h2>

        {/* ── Supporting statements ── */}
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          gap:           '0.15rem',
          marginBottom:  'clamp(2.5rem, 5vw, 5rem)',
        }}>
          {['FULL STACK.', 'MACHINE LEARNING.', 'STRUCTURED DEVELOPMENT.'].map((s) => (
            <p key={s} style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(1.1rem, 2.5vw, 2.5rem)',
              lineHeight:    1.1,
              letterSpacing: '-0.01em',
              color:         'var(--color-border)',
              transition:    'color 200ms',
              cursor:        'default',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-border)'; }}
            >
              {s}
            </p>
          ))}
        </div>

        {/* ── Body copy ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 28rem), 1fr))',
          gap: 'clamp(2.5rem, 5vw, 5rem)',
          borderTop: '1px solid var(--color-border)',
          paddingTop: 'clamp(2rem, 4vw, 3rem)',
        }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(0.9rem, 1.6vw, 1.05rem)',
              color:      'var(--color-fg)',
              lineHeight:  1.75,
              maxWidth:   '52ch',
            }}>
              I enjoy solving technical problems, learning new technologies, and
              building applications through structured, iterative development.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(0.85rem, 1.4vw, 1rem)',
              color:      'var(--color-muted)',
              lineHeight:  1.7,
              maxWidth:   '52ch',
            }}>
              My work spans full-stack development, database systems,
              machine learning projects, and collaborative Agile development.
            </p>

            {/* Areas */}
            <div style={{ marginTop:'0.5rem', display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
              {(profile.areasOfInterest || []).map((a) => (
                <span key={a} style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         'var(--color-muted)',
                  border:        '1px solid var(--color-border)',
                  padding:       '0.25rem 0.6rem',
                }}>
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* ── Education metadata ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:'2.5rem' }}>

            {/* College */}
            <div>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.55rem',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--color-accent)', fontWeight: 600, display: 'block',
                marginBottom: '0.5rem',
              }}>
                {college.duration}
              </span>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(0.75rem, 1.5vw, 0.95rem)', color:'var(--color-fg)', lineHeight:1.3 }}>
                COMPUTER SCIENCE &amp; ENGINEERING<br />KONGU ENGINEERING COLLEGE
              </p>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
