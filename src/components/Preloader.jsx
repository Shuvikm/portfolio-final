import { useState, useEffect } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast counting animation
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setProgress(current);
    }, 50);

    // Hide preloader shortly after hitting 100
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${styles.preloader} ${!loading ? styles.hidden : ''}`}>
      <img src="/assets/images/intro-bg.jpg" alt="Intro Landscape" className={styles.bgImage} />
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.counter}>{progress < 10 ? `0${progress}` : progress}%</div>
        <h1 className={styles.title}>SHUVIK M</h1>
        <p className={styles.subtitle}>PORTFOLIO</p>
      </div>
    </div>
  );
}
