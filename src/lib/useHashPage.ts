import { useSyncExternalStore } from 'react';

/** Seiten der Anwendung, entsprechen dem Anker in der Adresse (#himmel, #objekte, …) */
export const PAGES = ['himmel', 'objekte', 'planeten', 'einstellungen'] as const;
export type PageId = (typeof PAGES)[number];

const DEFAULT_PAGE: PageId = 'himmel';

function readPage(): PageId {
  const hash = window.location.hash.slice(1);
  return (PAGES as readonly string[]).includes(hash) ? (hash as PageId) : DEFAULT_PAGE;
}

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}

/** Aktuelle Seite aus dem Anker der Adresse – Zurück/Vor im Browser funktionieren damit */
export function useHashPage(): PageId {
  return useSyncExternalStore(subscribe, readPage);
}
