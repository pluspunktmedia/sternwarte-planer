import type { PageId } from '../lib/useHashPage';
import Icon, { type IconName } from './Icons';

const NAV: { page: PageId; label: string; icon: IconName }[] = [
  { page: 'himmel', label: 'Himmel', icon: 'sparkles' },
  { page: 'objekte', label: 'Objekte', icon: 'star' },
  { page: 'planeten', label: 'Planeten', icon: 'planet' },
  { page: 'einstellungen', label: 'Einstellungen', icon: 'gear' },
];

interface SidebarProps {
  /** Aktuell angezeigte Seite */
  current: PageId;
}

/** Seitenleiste mit Logo, Hauptnavigation und Nachtmodus-Schalter */
export default function Sidebar({ current }: SidebarProps) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#himmel">
        <Icon name="observatory" className="brand__logo" />
        <span className="brand__name">Astro-Planer</span>
      </a>

      <nav className="nav" aria-label="Hauptnavigation">
        <ul>
          {NAV.map(({ page, label, icon }) => (
            <li key={page}>
              <a className="nav__link" href={`#${page}`} aria-current={page === current ? 'page' : undefined}>
                <Icon name={icon} />
                <span className="nav__label">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button className="nightmode" type="button" aria-pressed="false">
        <Icon name="moon" />
        <span className="nav__label">Nachtmodus</span>
      </button>
    </aside>
  );
}
