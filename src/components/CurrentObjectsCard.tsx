import Card from './Card';
import SolarSystemTable from './SolarSystemTable';

interface CurrentObjectsCardProps {
  /** Zeitpunkt, für den die Positionen berechnet werden */
  date: Date;
}

/** Karte „Aktuelle Objekte“ auf der Startseite */
export default function CurrentObjectsCard({ date }: CurrentObjectsCardProps) {
  return (
    <Card id="objekte-titel" title="Aktuelle Objekte" icon="sparkles" link={{ href: '#objekte', label: 'Alle anzeigen' }}>
      <SolarSystemTable date={date} />
    </Card>
  );
}
