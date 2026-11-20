import type { Location } from '../data/location';
import Card from '../components/Card';
import DeepSkyTable from '../components/DeepSkyTable';

interface PageProps {
  date: Date;
  location: Location;
}

/** Seite „Objekte“: die hellsten Deep-Sky-Objekte */
export default function ObjektePage({ date, location }: PageProps) {
  return (
    <Card id="deepsky-titel" title="Hellste Deep-Sky-Objekte" icon="star">
      <DeepSkyTable date={date} location={location} />
    </Card>
  );
}
