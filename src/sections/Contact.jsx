import { useState } from 'react';
import { contact, socials } from '../data/portfolioData';
import SectionLabel    from '../components/SectionLabel';
import MagneticElement from '../components/MagneticElement';
import styles from './Contact.module.css';

// SVG Icons for footer
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
  </svg>
);

export default function Contact() {
  const [status, setStatus] = useState('STANDBY'); // STANDBY, SENDING, SENT, ERROR
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('SENDING');

    try {
      // Free Web3Forms integration - replace YOUR_ACCESS_KEY with a real key
      // Get one at https://web3forms.com/
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY", // <--- UPDATE THIS LATER
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      }).then((res) => res.json());

      if (res.success) {
        setStatus('SENT');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('STANDBY'), 3000);
      } else {
        setStatus('ERROR');
        setTimeout(() => setStatus('STANDBY'), 3000);
      }
    } catch (error) {
      setStatus('ERROR');
      setTimeout(() => setStatus('STANDBY'), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="section"
      aria-label="Contact Shuvik M"
      style={{ zIndex: 'var(--z-content)', position: 'relative' }}
    >
      <div style={{ padding: '0 var(--page-padding-x)' }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <SectionLabel>#09 OPEN A TICKET _</SectionLabel>
          <div className={styles.dot} style={{ marginLeft: '1rem' }}></div>
        </div>

        {/* Ticket Interface */}
        <div className={styles.ticketContainer}>
          
          {/* LEFT: The Form */}
          <div>
            <div className={styles.headerRow}>
              <span className={styles.headerText}>NEW TICKET // #001</span>
              <span className={styles.statusText}>STATUS: {status}</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>AGENT NAME</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="ENTER NAME" 
                  className={styles.input} 
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>RETURN FREQUENCY</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ENTER EMAIL" 
                  className={styles.input} 
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>TRANSMISSION DATA</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="ENTER MESSAGE CONTENT_" 
                  className={`${styles.input} ${styles.textarea}`} 
                  required 
                />
              </div>

              <MagneticElement strength={0.1}>
                <button type="submit" className={styles.submitBtn} disabled={status === 'SENDING'}>
                  {status === 'SENDING' ? 'TRANSMITTING...' : status === 'SENT' ? 'TICKET SENT' : 'SEND TICKET'}
                </button>
              </MagneticElement>
            </form>
          </div>

          {/* RIGHT: 3D Viewport */}
          <div className={styles.viewportContainer}>
            <div className={styles.viewportHeader}>
              <span className={styles.viewportLabel}>3D VIEWPORT</span>
              <div className={styles.liveIndicator}>
                <div className={styles.dot}></div>
                LIVE
              </div>
            </div>
            
            <div className={styles.viewportBody}>
              <img 
                src="/assets/gallery/8.jpg" 
                alt="Shuvik Portrait" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'grayscale(100%) contrast(1.2)', // fits brutalist style
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerCol}>
            <span className={styles.footerTitle}>SIGNAL CHANNEL</span>
            <span className={styles.footerSub}>Initiate direct communication protocol.</span>
          </div>

          <div className={styles.socialIcons}>
            {socials?.github && <a href={socials.github} target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="GitHub"><GithubIcon /></a>}
            {socials?.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="LinkedIn"><LinkedinIcon /></a>}
            <a href={`mailto:${contact.email}`} className={styles.socialIcon} aria-label="Email"><MailIcon /></a>
          </div>

          <div className={styles.footerCol} style={{ alignItems: 'flex-end' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--color-accent)', letterSpacing: '0.2em' }}>DIRECT LINK //</span>
            <a href={`mailto:${contact.email}`} className={styles.directLink}>
              {contact.email}
            </a>
          </div>
        </footer>

      </div>
    </section>
  );
}
