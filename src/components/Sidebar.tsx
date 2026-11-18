import Icon, { type IconName } from './Icons';

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: '#himmel', label: 'Himmel', icon: 'sparkles' },
  { href: '#objekte', label: 'Objekte', icon: 'star' },
  { href: '#planeten', label: 'Planeten', icon: 'planet' },
  { href: '#einstellungen', label: 'Einstellungen', icon: 'gear' },
];

/** Seitenleiste mit Logo, Hauptnavigation und Nachtmodus-Schalter */
export default function Sidebar() {
  // Seitenwechsel folgt in einem späteren Schritt, bis dahin ist "Himmel" fest aktiv
  const current = '#himmel';

  return (
    <aside className="sidebar">
      <a className="brand" href="#himmel">
        <Icon name="observatory" className="brand__logo" />
        <span className="brand__name">Astro-Planer</span>
      </a>

      <nav className="nav" aria-label="Hauptnavigation">
        <ul>
          {NAV.map(({ href, label, icon }) => (
            <li key={href}>
              <a className="nav__link" href={href} aria-current={href === current ? 'page' : undefined}>
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
