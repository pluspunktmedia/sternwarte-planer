import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import CurrentObjectsCard from './components/CurrentObjectsCard';
import { useObservationTime } from './lib/useObservationTime';
import './components/Layout.css';

/** Grundgerüst: Navigation links, Kopfzeile oben, darunter der Inhalt */
export default function App() {
  // Beobachtungszeitpunkt: läuft live mit oder ist fest gewählt
  const time = useObservationTime();

  return (
    <div className="app">
      <Sidebar />

      <div className="app__main">
        <TopBar time={time} />
        <main className="app__content">
          <CurrentObjectsCard date={time.date} />
        </main>
      </div>
    </div>
  );
}
