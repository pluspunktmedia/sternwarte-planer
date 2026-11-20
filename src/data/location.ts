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

/** Fester Ort zur Auswahl in der Kopfzeile */
export interface LocationPreset extends Location {
  id: string;
}

/** Standort der Sternwarte (Werte aus der Designvorlage) */
export const STERNWARTE: LocationPreset = {
  id: 'sternwarte',
  name: 'Sternwarte',
  latitude: 51,
  longitude: 10,
  elevation: 0,
};

/** Feste Orte für die Standortauswahl, der erste ist der Startwert */
export const LOCATION_PRESETS: LocationPreset[] = [STERNWARTE];
