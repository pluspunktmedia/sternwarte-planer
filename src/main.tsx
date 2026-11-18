import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Globale Stile zuerst, damit Komponenten-CSS sie überschreiben kann
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
