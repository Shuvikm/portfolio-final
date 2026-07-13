// System.jsx — 03 / SKILLS (id="skills")
//
// ALERAK brutal zone layout — four large technical territories.
// Oversized numbers, huge category titles, lime for tech labels.
// No skill bars. No progress rings. No generic cards.
// CSS hover only — no RAF, no state per territory.

import { tools } from '../data/portfolioData';
import SectionLabel from '../components/SectionLabel';
import MagneticElement from '../components/MagneticElement';

const TERRITORIES = [
  { id: '01', label: 'INTERFACE',    items: ['React', 'HTML', 'CSS', 'JavaScript'],         accent: true  },
  { id: '02', label: 'LOGIC',        items: ['Java', 'C', 'JavaScript'],                    accent: false },
  { id: '03', label: 'SYSTEMS',      items: ['Node.js', 'Express.js', 'MongoDB', 'MERN'],   accent: false },
  { id: '04', label: 'INTELLIGENCE', items: ['Python', 'Scikit-learn', 'XGBoost'],          accent: false },
];

export default function System() {
  return (
    <section
      id="skills"
      className="section"
      aria-label="Technical skills and system"
      style={{ zIndex: 'var(--z-content)', position: 'relative' }}
    >
      <div style={{ padding: '0 var(--page-padding-x)' }}>
        <SectionLabel>— 03 / SKILLS</SectionLabel>

        {/* Heading */}
        <div style={{
          display:        'flex',
          alignItems:     'flex-end',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            '1rem',
          marginTop:      'clamp(1.5rem, 3vw, 2.5rem)',
          marginBottom:   'clamp(2rem, 4vw, 3.5rem)',
        }}>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2.5rem, 8vw, 8rem)',
            lineHeight:    0.9,
            letterSpacing: '-0.02em',
          }}>
            SYSTEM<br />
            <span style={{ color: 'var(--color-accent)' }}>ARCHITECTURE.</span>
          </h2>
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'clamp(0.7rem, 1.2vw, 0.85rem)',
            color:         'var(--color-muted)',
            maxWidth:      '26ch',
            lineHeight:    1.7,
            alignSelf:     'flex-end',
          }}>
            Four technical territories. One unified system.
          </p>
        </div>

        {/* Territory rows */}
        <div style={{ borderTop: '1px solid var(--color-border)' }}>
          {TERRITORIES.map((t) => (
            <div
              key={t.id}
              style={{
                display:     'grid',
                gridTemplateColumns: 'clamp(2rem, 5vw, 4rem) clamp(6rem, 16vw, 16rem) 1fr',
                gap:         'clamp(1rem, 3vw, 2.5rem)',
                alignItems:  'center',
                padding:     'clamp(1.25rem, 2.5vw, 2rem) 0',
                borderBottom: '1px solid var(--color-border)',
                cursor:      'default',
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '0.55rem',
                letterSpacing: '0.2em',
                color:         'var(--color-border)',
              }}>
                {t.id}
              </span>

              {/* Territory label */}
              <MagneticElement strength={0.2}>
                <span style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(0.8rem, 1.8vw, 1.1rem)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color:         t.accent ? 'var(--color-accent)' : 'var(--color-muted)',
                }}>
                  {t.label}
                </span>
              </MagneticElement>

              {/* Items — large text, dim → bright on hover */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:'clamp(0.75rem, 2vw, 1.5rem)', alignItems:'center' }}>
                {t.items.map((item, i) => (
                  <span
                    key={item}
                    style={{
                      fontFamily:    'var(--font-display)',
                      fontSize:      'clamp(1.1rem, 3.5vw, 3.5rem)',
                      letterSpacing: '-0.015em',
                      lineHeight:     1,
                      color:          i === 0 ? 'var(--color-fg)' : 'var(--color-border)',
                      transition:    'color 180ms ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = i === 0 ? 'var(--color-fg)' : 'var(--color-border)'; }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools strip */}
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        'clamp(1rem, 2vw, 2rem)',
          marginTop:  'clamp(1.5rem, 3vw, 2.5rem)',
          flexWrap:   'wrap',
        }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'0.55rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--color-border)' }}>
            TOOLS —
          </span>
          {(tools || []).map((tool) => (
            <span key={tool} style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         'var(--color-muted)',
            }}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
