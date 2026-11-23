/**
 * Sichtbarkeit eines Objekts für den Ampelpunkt:
 * - visible = über dem Horizont (grün)
 * - rising  = vor weniger als EDGE_MINUTES aufgegangen (gelb)
 * - setting = geht in weniger als EDGE_MINUTES unter (gelb)
 * - down    = unter dem Horizont (rot)
 */
export type Visibility = 'visible' | 'rising' | 'setting' | 'down';

/** Zeitfenster nach dem Aufgang bzw. vor dem Untergang, in dem der Punkt gelb ist */
export const EDGE_MINUTES = 30;

const EDGE_MS = EDGE_MINUTES * 60_000;

/** Zeitpunkte EDGE_MINUTES vor und nach dem gewählten Zeitpunkt */
export function edgeTimes(date: Date): { before: Date; after: Date } {
  return {
    before: new Date(date.getTime() - EDGE_MS),
    after: new Date(date.getTime() + EDGE_MS),
  };
}

/**
 * Ampelstufe aus der Höhe vorher, jetzt und nachher (in Grad).
 * War das Objekt vorher noch unter dem Horizont, ist es gerade aufgegangen;
 * ist es nachher unter dem Horizont, geht es bald unter.
 */
export function classifyVisibility(before: number, now: number, after: number): Visibility {
  if (now <= 0) return 'down';
  if (before <= 0) return 'rising';
  if (after <= 0) return 'setting';
  return 'visible';
}
