import { useState, useEffect, useCallback } from 'react';
import styles from './WheelGallery.module.css';
import SectionLabel from './SectionLabel';

const imgUrls = [
  "/assets/gallery/3.jpg",
  "/assets/gallery/4.jpg",
  "/assets/gallery/5.jpg",
  "/assets/gallery/6.jpg",
  "/assets/gallery/7.jpg",
  "/assets/gallery/8.jpg",
  "/assets/gallery/9.jpg",
  "/assets/gallery/10.jpg",
  "/assets/gallery/12.jpg"
];

const ANGLE_STEP = 22; // Distance between cards in degrees

export default function WheelGallery() {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(imgUrls.length / 2));
  const [lastScroll, setLastScroll] = useState(0);

  const move = useCallback((dir) => {
    setCurrentIndex(prev => {
      const newIndex = prev + dir;
      if (newIndex >= 0 && newIndex < imgUrls.length) {
        return newIndex;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastScroll < 600) return;
      setLastScroll(now);
      move(e.deltaY > 0 ? 1 : -1);
    };
    
    // Attach listener to window (or just this component, but window mimics the codepen)
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [lastScroll, move]);

  return (
    <section className={styles.section} id="gallery">
      {/* Dark forest gradient background */}
      <div className={styles.bgGradient}></div>
      
      <div className={styles.labelWrapper}>
        <SectionLabel>— 05 / MOMENTS</SectionLabel>
      </div>

      <div className={styles.stage}>
        <div className={styles.carouselTrack}>
          {imgUrls.map((url, i) => {
            const cardRotation = (i - currentIndex) * ANGLE_STEP;
            const isActive = i === currentIndex;
            
            return (
              <div 
                key={i}
                className={`${styles.card} ${isActive ? styles.active : ''}`}
                style={{
                  backgroundImage: `url(${url})`,
                  transform: `rotate(${cardRotation}deg)`
                }}
              />
            );
          })}
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Gather here</h1>
          <p className={styles.description}>
            A glimpse beyond the code. These are moments and memories that inspire my creativity and drive.
          </p>
          <div className={styles.nav}>
            <button onClick={() => move(-1)}>❮</button>
            <button onClick={() => move(1)}>❯</button>
          </div>
        </div>
      </div>
    </section>
  );
}
