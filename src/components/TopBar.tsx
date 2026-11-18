import { useState } from 'react';
import Icon from './Icons';

/** Kopfzeile mit der Auswahl von Datum und Uhrzeit */
export default function TopBar() {
  // Format von <input type="datetime-local">: "YYYY-MM-DDTHH:mm"
  const [dateTime, setDateTime] = useState('2026-11-17T14:54');

  return (
    <header className="topbar">
      <label className="field">
        <Icon name="calendar" />
        <span className="visually-hidden">Datum und Uhrzeit</span>
        <input
          className="field__input"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
      </label>
    </header>
  );
}
