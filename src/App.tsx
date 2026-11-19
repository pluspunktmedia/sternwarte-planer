import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import CurrentObjectsCard from './components/CurrentObjectsCard';
import './components/Layout.css';

/** Grundgerüst: Navigation links, Kopfzeile oben, darunter der Inhalt */
export default function App() {
  // Gewählter Zeitpunkt im Format von <input type="datetime-local">: "YYYY-MM-DDTHH:mm"
  const [dateTime, setDateTime] = useState('2026-11-17T14:54');

  return (
    <div className="app">
      <Sidebar />

      <div className="app__main">
        <TopBar dateTime={dateTime} onDateTimeChange={setDateTime} />
        <main className="app__content">
          <CurrentObjectsCard dateTime={dateTime} />
        </main>
      </div>
    </div>
  );
}
