import type { Location } from '../data/location';
import CurrentObjectsCard from '../components/CurrentObjectsCard';

interface PageProps {
  date: Date;
  location: Location;
}

/** Startseite: Überblick über den aktuellen Himmel */
export default function HimmelPage({ date, location }: PageProps) {
  return <CurrentObjectsCard date={date} location={location} />;
}
