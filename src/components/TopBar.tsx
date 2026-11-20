import { useEffect, useRef, useState } from 'react';
import { LOCATION_PRESETS } from '../data/location';
import { formatDateTime, toLocalInputValue } from '../lib/dateInput';
import { formatCoordinates } from '../lib/format';
import type { ObservationTime } from '../lib/useObservationTime';
import type { ObserverLocation } from '../lib/useObserverLocation';
import Icon from './Icons';

interface TopBarProps {
  time: ObservationTime;
  observer: ObserverLocation;
}

/** Werte der Standortauswahl, die keinem festen Ort entsprechen */
const CUSTOM = 'eigener';
const GPS = 'gps';

/** Kopfzeile mit der Auswahl von Datum, Uhrzeit und Standort sowie der Live-Anzeige */
export default function TopBar({ time, observer }: TopBarProps) {
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

  function handleLocationChange(value: string) {
    if (value === GPS) observer.locate();
    else observer.selectPreset(value);
  }

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

      <label className="pill pill--select" title={formatCoordinates(observer.location)}>
        <Icon name="pin" className="pill__icon" />
        <select
          value={observer.locating ? GPS : (observer.presetId ?? CUSTOM)}
          onChange={(e) => handleLocationChange(e.target.value)}
          aria-label="Standort"
        >
          {LOCATION_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
          <option value={CUSTOM} disabled>
            Eigener Standort
          </option>
          <option value={GPS}>{observer.locating ? 'Standort wird bestimmt …' : 'Mein Standort (GPS)'}</option>
        </select>
        <Icon name="chevron-down" size={16} />
      </label>

      {observer.geoError && (
        <p className="topbar__error" role="alert">
          {observer.geoError}
        </p>
      )}

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
