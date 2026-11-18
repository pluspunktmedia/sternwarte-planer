import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import CurrentObjectsCard from './components/CurrentObjectsCard';
import './components/Layout.css';

/** Grundgerüst: Navigation links, Kopfzeile oben, darunter der Inhalt */
export default function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="app__main">
        <TopBar />
        <main className="app__content">
          <CurrentObjectsCard />
        </main>
      </div>
    </div>
  );
}
