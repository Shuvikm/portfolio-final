// ─────────────────────────────────────────────────────────────────────────────
// main.jsx — Application entry point
// React StrictMode is intentionally enabled.
// All components must survive double-invocation in development.
// ─────────────────────────────────────────────────────────────────────────────
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
