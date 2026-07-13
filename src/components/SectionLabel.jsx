// SectionLabel.jsx — utility component for section markers

export default function SectionLabel({ children, className = '' }) {
  return (
    <span
      className={`section-label ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
