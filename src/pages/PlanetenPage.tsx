import type { Location } from '../data/location';
import Card from '../components/Card';
import SolarSystemTable from '../components/SolarSystemTable';

interface PageProps {
  date: Date;
  location: Location;
}

/** Seite „Planeten“: Mond und Planeten */
export default function PlanetenPage({ date, location }: PageProps) {
  return (
    <Card id="planeten-titel" title="Mond und Planeten" icon="planet">
      <SolarSystemTable date={date} location={location} />
    </Card>
  );
}
