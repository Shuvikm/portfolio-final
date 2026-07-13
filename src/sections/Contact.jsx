// Contact.jsx — 07 / CONTACT
//
// Brutal final scene. LET'S BUILD SOMETHING.
// Resume: VIEW opens PDF in new tab. DOWNLOAD downloads PDF.
// All links from portfolioData.js. No HTML resume reconstruction.

import { contact, socials, resume } from '../data/portfolioData';
import SectionLabel    from '../components/SectionLabel';
import MagneticElement from '../components/MagneticElement';
import ResumeButton    from '../components/ResumeButton';

const SOCIAL_KEYS = [
  { key: 'linkedin', label: 'LINKEDIN' },
  { key: 'github',   label: 'GITHUB'   },
  { key: 'leetcode', label: 'LEETCODE' },
];

export default function Contact() {
  const socialLinks = SOCIAL_KEYS.map((s) => ({ ...s, href: socials?.[s.key] })).filter((s) => s.href);

  return (
    <section
      id="contact"
      className="section"
      aria-label="Contact Shuvik M"
      style={{ zIndex: 'var(--z-content)', position: 'relative' }}
    >
      <div style={{ padding: '0 var(--page-padding-x)' }}>
        <SectionLabel>— 07 / CONTACT</SectionLabel>

        {/* ── Primary heading ── */}
        <h2 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(2.5rem, 9vw, 10rem)',
          lineHeight:    0.88,
          letterSpacing: '-0.03em',
          marginTop:     'clamp(2rem, 4vw, 3rem)',
          marginBottom:  'clamp(2.5rem, 6vw, 6rem)',
        }}>
          LET'S<br />
          BUILD<br />
          <span style={{ color: 'var(--color-accent)' }}>SOMETHING.</span>
        </h2>

        {/* ── CTA button ── */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <MagneticElement strength={0.35}>
            <a
              href={`mailto:${contact.email}`}
              id="contact-cta"
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '1rem',
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(0.8rem, 1.8vw, 1.15rem)',
                fontWeight:     700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         'var(--color-bg)',
                background:    'var(--color-accent)',
                padding:       'clamp(1rem, 2vw, 1.4rem) clamp(1.5rem, 3vw, 2.5rem)',
                textDecoration: 'none',
                transition:    'background 200ms ease, color 200ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-fg)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-accent)'; }}
            >
              LET'S TALK
              <span aria-hidden="true" style={{ fontSize: '1.2em' }}>→</span>
            </a>
          </MagneticElement>
        </div>

        {/* ── Contact grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
          gap: 'clamp(2.5rem, 5vw, 5rem)',
          borderTop: '1px solid var(--color-border)',
          paddingTop: 'clamp(2rem, 4vw, 3rem)',
        }}>

          {/* Direct contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.55rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--color-muted)', display: 'block', marginBottom: '0.5rem',
            }}>
              Direct
            </span>
            {contact.email && (
              <MagneticElement strength={0.1}>
                <a
                  href={`mailto:${contact.email}`}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.85rem, 2vw, 1.4rem)',
                    letterSpacing: '-0.01em',
                    color: 'var(--color-fg)',
                    display: 'inline-block',
                    transition: 'color 200ms',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-fg)'; }}
                >
                  {contact.email}
                </a>
              </MagneticElement>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                  color: 'var(--color-muted)', letterSpacing: '0.05em',
                  transition: 'color 200ms', display: 'inline-block',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-fg)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; }}
              >
                {contact.phone}
              </a>
            )}
          </div>

          {/* Social + resume */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.55rem',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--color-muted)', marginBottom: '0.25rem',
              }}>
                Online
              </span>
              {socialLinks.map(({ key, label, href }) => (
                <MagneticElement key={key} strength={0.1}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(0.85rem, 1.8vw, 1.2rem)',
                      letterSpacing: '-0.01em',
                      color: 'var(--color-muted)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'color 200ms',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-fg)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; }}
                  >
                    {label}
                    <span aria-hidden="true" style={{ fontSize: '0.7em', color: 'var(--color-border)' }}>↗</span>
                  </a>
                </MagneticElement>
              ))}
            </div>

            {resume?.path && (
              <div>
                <span style={{
                  display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.55rem',
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: 'var(--color-muted)', marginBottom: '0.75rem',
                }}>
                  Resume
                </span>
                <MagneticElement strength={0.1}>
                  <ResumeButton />
                </MagneticElement>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
