import { useState, useEffect } from 'react';

export default function LocalTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Local time in India (IST)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      setTime(formatter.format(new Date()) + ' IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontFamily: 'var(--font-body)',
      fontSize: '0.65rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--color-accent)',
      border: '1px solid var(--color-border)',
      padding: '0.4rem 0.8rem',
      borderRadius: '4px',
    }}>
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'var(--color-accent)',
        animation: 'pulse 1.5s infinite ease-in-out'
      }}></div>
      LOCAL TIME: {time}
    </div>
  );
}
