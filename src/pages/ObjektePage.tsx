import Card from '../components/Card';
import DeepSkyTable from '../components/DeepSkyTable';

interface PageProps {
  date: Date;
}

/** Seite „Objekte“: die hellsten Deep-Sky-Objekte */
export default function ObjektePage({ date }: PageProps) {
  return (
    <Card id="deepsky-titel" title="Hellste Deep-Sky-Objekte" icon="star">
      <DeepSkyTable date={date} />
    </Card>
  );
}
