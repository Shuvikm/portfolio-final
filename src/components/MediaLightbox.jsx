// ─────────────────────────────────────────────────────────────────────────────
// MediaLightbox.jsx
// Full-screen proof image viewer — renders via ReactDOM portal into document.body.
//
// CRITICAL: Uses createPortal to escape any transform ancestor (HorizontalScrollSection
// transforms its track, which would make position:fixed relative to it instead of viewport).
// Portal ensures z-index: 200 works correctly above cursor layer (z-index: 50).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './MediaLightbox.module.css';

export default function MediaLightbox({ isOpen, images = [], initialIndex = 0, onClose }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const closeButtonRef = useRef(null);
  const overlayRef = useRef(null);

  // Reset active index when a new set of images is opened
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // ESC key handler — owned by this component, only active while open
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((i) => Math.min(i + 1, images.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
    },
    [onClose, images.length]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll while lightbox is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus to close button for accessibility
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [isOpen, handleKeyDown]);

  // Click-outside handler — clicking the dark overlay closes the lightbox
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen || images.length === 0) return null;

  const activeImage = images[activeIndex];
  const hasMultiple = images.length > 1;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate viewer — ${activeImage.alt}`}
    >
      <div className={styles.panel}>
        {/* ── Header bar ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {activeImage.label && (
              <span className={styles.imageLabel}>{activeImage.label}</span>
            )}
            {hasMultiple && (
              <span className={styles.counter}>
                {activeIndex + 1} / {images.length}
              </span>
            )}
          </div>
          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close image viewer"
            id="lightbox-close"
          >
            ✕
          </button>
        </div>

        {/* ── Image / PDF content ── */}
        <div className={styles.imageWrapper}>
          {activeImage.src.toLowerCase().endsWith('.pdf') ? (
            <iframe
              src={`${activeImage.src}#toolbar=0&navpanes=0&view=FitH`}
              title={activeImage.alt}
              className={styles.pdfFrame}
            />
          ) : (
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className={styles.image}
              draggable={false}
            />
          )}
        </div>

        {/* ── Multi-image navigation ── */}
        {hasMultiple && (
          <div className={styles.navBar}>
            <button
              className={styles.navButton}
              onClick={() => setActiveIndex((i) => Math.max(i - 1, 0))}
              disabled={activeIndex === 0}
              aria-label="Previous image"
            >
              ← PREV
            </button>

            <div className={styles.tabs} role="tablist">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === activeIndex}
                  className={`${styles.tab} ${idx === activeIndex ? styles.tabActive : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={img.label || `Image ${idx + 1}`}
                >
                  {img.label || idx + 1}
                </button>
              ))}
            </div>

            <button
              className={styles.navButton}
              onClick={() => setActiveIndex((i) => Math.min(i + 1, images.length - 1))}
              disabled={activeIndex === images.length - 1}
              aria-label="Next image"
            >
              NEXT →
            </button>
          </div>
        )}

        <p className={styles.hint} aria-hidden="true">
          {hasMultiple ? 'ESC to close · ← → to navigate' : 'ESC or click outside to close'}
        </p>
      </div>
    </div>,
    document.body
  );
}

