import type { Location } from '../data/location';
import Card from './Card';
import SolarSystemTable from './SolarSystemTable';

interface CurrentObjectsCardProps {
  /** Zeitpunkt, für den die Positionen berechnet werden */
  date: Date;
  /** Beobachtungsort */
  location: Location;
}

/** Karte „Aktuelle Objekte“ auf der Startseite */
export default function CurrentObjectsCard({ date, location }: CurrentObjectsCardProps) {
  return (
    <Card id="objekte-titel" title="Aktuelle Objekte" icon="sparkles" link={{ href: '#objekte', label: 'Alle anzeigen' }}>
      <SolarSystemTable date={date} location={location} />
    </Card>
  );
}
