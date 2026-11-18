/** Position eines Himmelskörpers für einen Beobachtungsort und Zeitpunkt */
export interface SkyObject {
  name: string;
  constellation: string;
  /** Höhe über dem Horizont in Grad (negativ = unter dem Horizont) */
  altitude: number;
  /** Azimut in Grad, 0 = Nord, im Uhrzeigersinn */
  azimuth: number;
  /** Rektaszension (J2000) in Stunden */
  raHours: number;
  /** Deklination (J2000) in Grad */
  decDeg: number;
  /** Beleuchteter Anteil 0–1 (nur beim Mond angezeigt) */
  illuminated?: number;
}

/**
 * Feste Beispieldaten aus der Designvorlage
 * (Sternwarte 51° N / 10° O, 17.11.2026 14:54).
 * Werden später durch berechnete Werte ersetzt.
 */
export const CURRENT_OBJECTS: SkyObject[] = [
  { name: 'Mond', constellation: 'Capricornus', altitude: 10.5, azimuth: 127, raHours: 21 + 54 / 60, decDeg: -13.6, illuminated: 0.51 },
  { name: 'Merkur', constellation: 'Virgo', altitude: 8.8, azimuth: 240, raHours: 14 + 18 / 60, decDeg: -11.3 },
  { name: 'Venus', constellation: 'Virgo', altitude: 2.4, azimuth: 252, raHours: 13 + 23 / 60, decDeg: -9.7 },
  { name: 'Mars', constellation: 'Leo', altitude: -8.7, azimuth: 307, raHours: 9 + 56 / 60, decDeg: 14.7 },
  { name: 'Jupiter', constellation: 'Leo', altitude: -10.0, azimuth: 307, raHours: 9 + 53 / 60, decDeg: 13.7 },
  { name: 'Saturn', constellation: 'Cetus', altitude: -0.9, azimuth: 87, raHours: 0 + 34 / 60, decDeg: 0.8 },
  { name: 'Uranus', constellation: 'Taurus', altitude: -12.0, azimuth: 32, raHours: 4 + 7 / 60, decDeg: 20.7 },
  { name: 'Neptun', constellation: 'Pisces', altitude: 1.7, azimuth: 93, raHours: 0 + 7 / 60, decDeg: -0.7 },
];
