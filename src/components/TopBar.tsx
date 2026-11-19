import { useEffect, useRef, useState } from 'react';
import { formatDateTime, toLocalInputValue } from '../lib/dateInput';
import type { ObservationTime } from '../lib/useObservationTime';
import Icon from './Icons';

interface TopBarProps {
  time: ObservationTime;
}

/** Kopfzeile mit der Auswahl von Datum und Uhrzeit sowie der Live-Anzeige */
export default function TopBar({ time }: TopBarProps) {
  const [dateOpen, setDateOpen] = useState(false);
  const datePopRef = useRef<HTMLDivElement>(null);

  // Zeit-Popup schließen, sobald außerhalb geklickt oder Escape gedrückt wird
  useEffect(() => {
    if (!dateOpen) return;
    const onDown = (e: MouseEvent) => {
      if (datePopRef.current && !datePopRef.current.contains(e.target as Node)) setDateOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDateOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [dateOpen]);

  return (
    <header className="topbar">
      <div className="topbar__pop" ref={datePopRef}>
        <button
          type="button"
          className="pill"
          onClick={() => setDateOpen((open) => !open)}
          aria-expanded={dateOpen}
          aria-label="Datum und Uhrzeit wählen"
        >
          <Icon name="calendar" className="pill__icon" />
          <span className="pill__value">{formatDateTime(time.date)}</span>
          <Icon name="chevron-down" size={16} />
        </button>

        {dateOpen && (
          <div className="popover">
            <label className="field">
              <span>Datum &amp; Uhrzeit (Ortszeit)</span>
              <input
                className="field__input"
                type="datetime-local"
                value={toLocalInputValue(time.date)}
                onChange={(e) => time.setManualDate(e.target.value)}
              />
            </label>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                time.goLive();
                setDateOpen(false);
              }}
            >
              Jetzt (Live)
            </button>
          </div>
        )}
      </div>

      <div className="topbar__right">
        <button
          type="button"
          className={time.live ? 'live is-live' : 'live'}
          onClick={time.goLive}
          title={time.live ? 'Aktualisiert sich alle 3 Sekunden' : 'Fester Zeitpunkt – klicken für Live'}
        >
          <span className="live__dot" />
          {time.live ? 'Live' : 'Pausiert'}
        </button>
        <button type="button" className="icon-btn" onClick={time.goLive} aria-label="Auf jetzt zurücksetzen">
          <Icon name="refresh" size={20} />
        </button>
      </div>
    </header>
  );
}
