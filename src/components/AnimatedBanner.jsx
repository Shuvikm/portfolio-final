import React from 'react';
import styles from './AnimatedBanner.module.css';

const textItems = [
  { default: 'SCROLL TO SEE', hover: 'SCROLL TO SEE' },
  { default: 'MY BEST WORK', hover: 'MY BEST WORK' },
  { default: 'PURE PERFORMANCE', hover: 'ZERO JS OVERHEAD' },
  { default: 'MODERN DESIGNS', hover: 'PREMIUM VIBES' },
];

export default function AnimatedBanner() {
  return (
    <section className={styles.container} aria-label="Animated Banner">
      {textItems.map((item, i) => (
        <h2 key={i} className={styles.text}>
          {item.default}
          <span className={styles.spanHover}>{item.hover}</span>
        </h2>
      ))}
    </section>
  );
}
