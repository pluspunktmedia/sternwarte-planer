/** Beobachtungsort auf der Erde */
export interface Location {
  name: string;
  /** Geografische Breite in Grad (Nord positiv) */
  latitude: number;
  /** Geografische Länge in Grad (Ost positiv) */
  longitude: number;
  /** Höhe über dem Meeresspiegel in Metern */
  elevation: number;
}

/**
 * Fester Standort der Sternwarte (Werte aus der Designvorlage).
 * Wird später durch eine Standortauswahl ersetzt.
 */
export const STERNWARTE: Location = {
  name: 'Sternwarte',
  latitude: 51,
  longitude: 10,
  elevation: 0,
};
