import Card from '../components/Card';
import SolarSystemTable from '../components/SolarSystemTable';

interface PageProps {
  date: Date;
}

/** Seite „Planeten“: Mond und Planeten */
export default function PlanetenPage({ date }: PageProps) {
  return (
    <Card id="planeten-titel" title="Mond und Planeten" icon="planet">
      <SolarSystemTable date={date} />
    </Card>
  );
}
