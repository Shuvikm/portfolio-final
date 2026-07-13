// HeroWord.jsx — ALERAK-style character-level hero typography
//
// Renders each character as a .hero-char span.
// Hover behaviour (fill + lift) is PURE CSS — defined in globals.css.
// No React state per character. No innerHTML. No querySelector.
//
// Props:
//   text      — the word to render (e.g. "SHUVIK")
//   as        — wrapper element tag (default 'span')
//   className — forwarded to wrapper
//   style     — forwarded to wrapper

export default function HeroWord({
  text,
  as: Tag   = 'span',
  className = '',
  style     = {},
}) {
  return (
    // aria-label provides accessible text; rendered chars are aria-hidden
    <Tag
      className={className}
      style={{ display: 'inline-block', ...style }}
      aria-label={text}
    >
      {text.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i} style={{ display: 'inline-block', width: '0.4em' }} aria-hidden="true"> </span>
        ) : (
          <span key={i} className="hero-char" aria-hidden="true">
            {char}
          </span>
        )
      )}
    </Tag>
  );
}
