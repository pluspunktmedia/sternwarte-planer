import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { useHashPage } from './lib/useHashPage';
import { useObservationTime } from './lib/useObservationTime';
import { useObserverLocation } from './lib/useObserverLocation';
import HimmelPage from './pages/HimmelPage';
import ObjektePage from './pages/ObjektePage';
import PlanetenPage from './pages/PlanetenPage';
import EinstellungenPage from './pages/EinstellungenPage';
import './components/Layout.css';

/** Grundgerüst: Navigation links, Kopfzeile oben, darunter die gewählte Seite */
export default function App() {
  // Beobachtungszeitpunkt: läuft live mit oder ist fest gewählt
  const time = useObservationTime();
  // Beobachtungsort: Sternwarte oder per GPS bestimmter Standort
  const observer = useObserverLocation();
  const page = useHashPage();

  return (
    <div className="app">
      <Sidebar current={page} />

      <div className="app__main">
        <TopBar time={time} observer={observer} />
        <main className="app__content">
          {page === 'himmel' && <HimmelPage date={time.date} location={observer.location} />}
          {page === 'objekte' && <ObjektePage date={time.date} location={observer.location} />}
          {page === 'planeten' && <PlanetenPage date={time.date} location={observer.location} />}
          {page === 'einstellungen' && <EinstellungenPage />}
        </main>
      </div>
    </div>
  );
}
