import CurrentObjectsCard from '../components/CurrentObjectsCard';

interface PageProps {
  date: Date;
}

/** Startseite: Überblick über den aktuellen Himmel */
export default function HimmelPage({ date }: PageProps) {
  return <CurrentObjectsCard date={date} />;
}
