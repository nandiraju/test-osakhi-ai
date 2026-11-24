import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Prerendered HTML is for crawlers/first paint; React replaces it on load
// (avoids hydration mismatches between static markup and the client app).
const rootEl = document.getElementById('root')!;
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
