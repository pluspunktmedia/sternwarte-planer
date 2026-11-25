import type { Location } from '../data/location';
import { BODY_COLORS } from '../data/planets';
import Card from './Card';
import SkyMap, { type SkyLayer } from './SkyMap';

interface SkyCardProps {
  /** Zeitpunkt, für den die Positionen berechnet werden */
  date: Date;
  /** Beobachtungsort */
  location: Location;
  /** Welche Objekte die Karte zeigt (Sterne immer) */
  show?: SkyLayer;
}

/** Karte „Sternenhimmel“ mit Himmelskarte und Legende */
export default function SkyCard({ date, location, show = 'all' }: SkyCardProps) {
  return (
    <Card id="himmel-titel" title="Sternenhimmel" icon="star">
      <div className="sky-card__map">
        <SkyMap date={date} location={location} show={show} />

        <ul className="legend">
          <li>
            <span className="legend__dot" style={{ background: '#fff' }} />
            Sterne
          </li>
          {show !== 'planets' && (
            <li>
              <span className="legend__ring" />
              Deep-Sky-Objekte
            </li>
          )}
          {show !== 'deepsky' && (
            <li>
              <span className="legend__dot" style={{ background: BODY_COLORS.Saturn }} />
              Mond und Planeten
            </li>
          )}
        </ul>
      </div>
    </Card>
  );
}
