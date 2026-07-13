// ─────────────────────────────────────────────────────────────────────────────
// ResumeButton.jsx
//
// RESUME RULE (enforced):
//   VIEW RESUME  → opens PDF in a new browser tab (target="_blank").
//   DOWNLOAD     → triggers direct file download via <a download>.
//
// The PDF opens in a separate browser tab. The portfolio WebGL canvas, neon
// cursor, and all interactive overlays remain in the portfolio tab and cannot
// visually interfere with the PDF document. This is the correct architecture.
//
// ASSET GUARD: if the PDF path is not set or the resume object is missing,
// this component renders nothing rather than a broken link.
//
// Props:
//   compact  — renders a single small "RESUME ↗" link for use in the nav bar
//   path     — optional path override (falls back to portfolioData.resume.path)
//   filename — optional filename override (falls back to portfolioData.resume.filename)
// ─────────────────────────────────────────────────────────────────────────────
import { resume } from '../data/portfolioData';
import styles from './ResumeButton.module.css';

export default function ResumeButton({ compact = false, path, filename }) {
  const pdfPath = path     || resume?.path;
  const pdfFile = filename || resume?.filename || 'Shuvik-M-Resume.pdf';

  // Asset guard: silently render nothing if the PDF path is not configured
  if (!pdfPath) return null;

  // ── Compact variant: single VIEW link for the navigation bar ──────────────
  if (compact) {
    return (
      <a
        href={pdfPath}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btnView}
        id="resume-view-nav"
        aria-label="View resume PDF in a new tab"
      >
        <span className={styles.icon} aria-hidden="true">↗</span>
        RESUME
      </a>
    );
  }

  // ── Full variant: VIEW + DOWNLOAD ─────────────────────────────────────────
  return (
    <div className={styles.group} role="group" aria-label="Resume options">
      {/*
        VIEW: opens the real PDF in a new browser tab.
        The portfolio tab retains the neon cursor.
        The PDF tab is a native browser PDF viewer — no portfolio overlays.
      */}
      <a
        href={pdfPath}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btnView}
        id="resume-view"
        aria-label="View resume PDF in a new tab"
      >
        <span className={styles.icon} aria-hidden="true">↗</span>
        VIEW RESUME
      </a>

      {/*
        DOWNLOAD: triggers a direct file download via the browser's
        native download attribute. No custom viewer, no iframe, no canvas.
      */}
      <a
        href={pdfPath}
        download={pdfFile}
        className={styles.btnDownload}
        id="resume-download"
        aria-label="Download resume as PDF"
      >
        <span className={styles.icon} aria-hidden="true">↓</span>
        DOWNLOAD PDF
      </a>
    </div>
  );
}
