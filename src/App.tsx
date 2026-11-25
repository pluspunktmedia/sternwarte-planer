import Sidebar from './components/Sidebar';
import SkyCard from './components/SkyCard';
import type { SkyLayer } from './components/SkyMap';
import TopBar from './components/TopBar';
import { useHashPage, type PageId } from './lib/useHashPage';
import { useObservationTime } from './lib/useObservationTime';
import { useObserverLocation } from './lib/useObserverLocation';
import HimmelPage from './pages/HimmelPage';
import ObjektePage from './pages/ObjektePage';
import PlanetenPage from './pages/PlanetenPage';
import EinstellungenPage from './pages/EinstellungenPage';
import './components/Layout.css';

/** Was die Himmelskarte auf welcher Seite zeigt */
const SKY_LAYERS: Record<PageId, SkyLayer> = {
  himmel: 'all',
  objekte: 'deepsky',
  planeten: 'planets',
  einstellungen: 'all',
};

/** Grundgerüst: Navigation links, Kopfzeile oben, darunter Himmelskarte und die gewählte Seite */
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
        {/* Himmelskarte links auf jeder Seite, rechts der Inhalt der gewählten Seite */}
        <main className="app__content page-split">
          <SkyCard date={time.date} location={observer.location} show={SKY_LAYERS[page]} />
          <div>
            {page === 'himmel' && <HimmelPage date={time.date} location={observer.location} />}
            {page === 'objekte' && <ObjektePage date={time.date} location={observer.location} />}
            {page === 'planeten' && <PlanetenPage date={time.date} location={observer.location} />}
            {page === 'einstellungen' && <EinstellungenPage />}
          </div>
        </main>
      </div>
    </div>
  );
}
