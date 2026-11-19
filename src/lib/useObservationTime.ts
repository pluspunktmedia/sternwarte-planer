import { useEffect, useMemo, useState } from 'react';

/** Im Live-Modus wird die Zeit alle 3 Sekunden neu gesetzt */
export const UPDATE_INTERVAL_MS = 3000;

export interface ObservationTime {
  /** Zeitpunkt, für den alles berechnet wird (live = jetzt, sonst fest gewählt) */
  date: Date;
  live: boolean;
  /** Zurück auf "jetzt" und den Live-Modus einschalten */
  goLive: () => void;
  /** Festen Zeitpunkt wählen ("YYYY-MM-DDTHH:mm") → Live-Modus aus */
  setManualDate: (value: string) => void;
}

/** Beobachtungszeitpunkt: läuft live mit oder steht auf einem fest gewählten Zeitpunkt */
export function useObservationTime(): ObservationTime {
  const [now, setNow] = useState(() => new Date());
  const [live, setLive] = useState(true);
  const [manualDate, setManualDateValue] = useState<string | null>(null);

  // Uhr läuft nur im Live-Modus
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setNow(new Date()), UPDATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [live]);

  // Fester Zeitpunkt: neues Date-Objekt nur, wenn sich der Text ändert
  const manual = useMemo(() => {
    if (manualDate === null) return null;
    const d = new Date(manualDate);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [manualDate]);

  return {
    // Leeres oder unvollständiges Eingabefeld → weiter die aktuelle Zeit verwenden
    date: live || !manual ? now : manual,
    live,
    goLive: () => {
      setNow(new Date());
      setLive(true);
    },
    setManualDate: (value) => {
      setManualDateValue(value);
      setLive(false);
    },
  };
}
