// System.jsx — 03 / SKILLS (id="skills")
//
// ALERAK brutal zone layout — four large technical territories.
// Oversized numbers, huge category titles, lime for tech labels.
// No skill bars. No progress rings. No generic cards.
// CSS hover only — no RAF, no state per territory.

import { tools } from '../../data/portfolioData';
import SectionLabel from '../../components/SectionLabel';
import MagneticElement from '../../components/MagneticElement';

const TERRITORIES = [
  { id: '01', label: 'INTERFACE',    items: ['React', 'HTML', 'CSS', 'JavaScript'],         accent: true  },
  { id: '02', label: 'LOGIC',        items: ['Java', 'C', 'JavaScript'],                    accent: false },
  { id: '03', label: 'SYSTEMS',      items: ['Node.js', 'Express.js', 'MongoDB', 'MERN'],   accent: false },
  { id: '04', label: 'INTELLIGENCE', items: ['Python', 'Scikit-learn', 'XGBoost'],          accent: false },
];

const TechIcon = ({ name }) => {
  switch (name.toLowerCase()) {
    case 'react':
      return <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg" width="30" height="30" aria-hidden="true"><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>;
    case 'node.js':
      return <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.966 2.015L3 7.195v10.37L11.966 22l9.034-5.183V7.195l-9.034-5.18zM12 4.093l7.034 4.041v7.712L12 19.866l-7.034-4.02V8.134L12 4.093zM10.153 14.654c-.16-.395-.366-1.127-.616-2.197H8.258c-.083.568-.135 1.096-.153 1.583-.021.488-.031.85-.031 1.085h-1.18c0-.623.023-1.49.068-2.6.046-1.109.117-2.03.214-2.76H8.7l.617 2.148c.205.748.36 1.34.464 1.776.082-.375.188-.813.318-1.312l.666-2.612h1.492v5.89h-1.155v-3.79c0-.441-.013-1.077-.04-1.905l-.909 3.694h-1.018zM15.42 14.86c-.722 0-1.285-.205-1.688-.614-.403-.41-.605-1.011-.605-1.802 0-.853.228-1.5.684-1.942.456-.441 1.066-.662 1.83-.662.612 0 1.094.131 1.446.393.351.262.587.625.707 1.09l-1.118.239c-.063-.235-.175-.42-.336-.554-.161-.135-.386-.202-.676-.202-.387 0-.67.143-.849.429-.18.286-.27.705-.27 1.258 0 .524.088.922.264 1.196.176.273.447.41.815.41.25 0 .47-.057.658-.171.189-.115.342-.293.458-.534l1.103.353c-.19.418-.465.753-.823 1.003-.358.25-.802.375-1.332.375z"/></svg>;
    case 'python':
       return <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.012 1.318c-3.148 0-3.527.135-4.526.417-1.198.337-1.488.947-1.571 2.379-.063 1.085-.04 2.327-.04 2.327h6.166v1.17H6.015c-1.849 0-2.825.963-3.082 2.766-.273 1.906-.312 3.197 0 5.127.279 1.748 1.144 2.724 3.082 2.724h1.492v-3.488c0-2.072 1.746-3.819 3.868-3.819h4.316c1.193 0 2.203-1.001 2.203-2.196V5.422c0-1.83-1.316-3.32-3.111-3.664-1.251-.239-2.771-.44-2.771-.44zm-.757 1.84a.972.972 0 0 1 .974.973.972.972 0 0 1-.974.974.972.972 0 0 1-.974-.974.972.972 0 0 1 .974-.973zm6.685 4.385c0 2.072-1.746 3.818-3.868 3.818h-4.316c-1.192 0-2.203 1.001-2.203 2.196v3.301c0 1.831 1.316 3.321 3.111 3.665 1.25.24 2.772.44 2.772.44 3.147 0 3.526-.135 4.525-.417 1.198-.337 1.488-.948 1.572-2.38.062-1.085.04-2.327.04-2.327H13.407v-1.17h6.027c1.849 0 2.825-.963 3.081-2.767.274-1.906.312-3.196 0-5.126-.278-1.748-1.143-2.724-3.081-2.724h-1.492v3.488zm-6.685 13.064a.972.972 0 0 1 .974.974.972.972 0 0 1-.974.974.972.972 0 0 1-.974-.974.972.972 0 0 1 .974-.974z"/></svg>;
    case 'mongodb':
      return <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.666 0c0 0-4.048 2.023-4.048 10.428 0 4.269 1.621 7.204 4.048 9.255 2.427-2.051 4.048-4.986 4.048-9.255C15.714 2.023 11.666 0 11.666 0zm0 21.053c-1.973 0-3.57-1.636-3.57-3.658 0-2.022 1.597-3.658 3.57-3.658 1.973 0 3.57 1.636 3.57 3.658 0 2.022-1.597 3.658-3.57 3.658zm0-1.842c-1.01 0-1.826-.838-1.826-1.874 0-1.036.817-1.874 1.826-1.874 1.01 0 1.826.838 1.826 1.874 0 1.036-.817 1.874-1.826 1.874z"/></svg>;
    default:
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>;
  }
};

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
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: i === 0 ? 'var(--color-fg)' : 'var(--color-border)',
                      transition: 'color 180ms ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = i === 0 ? 'var(--color-fg)' : 'var(--color-border)'; }}
                  >
                    <TechIcon name={item} />
                    <span
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontSize:      'clamp(1.1rem, 3.5vw, 3.5rem)',
                        letterSpacing: '-0.015em',
                        lineHeight:     1,
                      }}
                    >
                      {item}
                    </span>
                  </div>
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
          marginTop:  'clamp(2rem, 4vw, 4rem)',
          flexWrap:   'wrap',
        }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--color-accent)' }}>
            TOOLS —
          </span>
          {(tools || []).map((tool) => (
            <span key={tool} style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(1.5rem, 4vw, 4rem)',
              letterSpacing: '-0.015em',
              lineHeight:     1,
              color:         'var(--color-muted)',
              transition:    'color 200ms',
              cursor:        'default'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-fg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
