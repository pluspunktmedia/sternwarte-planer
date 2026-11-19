/** Deep-Sky-Objekt mit Katalogwerten */
export interface DeepSkyObject {
  /** Katalognummer, z. B. "M45" */
  id: string;
  /** Eigenname, falls gebräuchlich */
  name?: string;
  type: string;
  /** Rektaszension (J2000) in Stunden */
  raHours: number;
  /** Deklination (J2000) in Grad */
  decDeg: number;
  /** Scheinbare visuelle Helligkeit in mag */
  magnitude: number;
}

/**
 * Die 8 hellsten Messier-Objekte, die von der Sternwarte (51° N) mindestens 10° hoch steigen.
 * Helligkeiten und Koordinaten nach SEDS-Messier-Katalog.
 * Nicht aufgenommen: M7 und M6 (zu weit südlich), M24 (Sternwolke statt Einzelobjekt).
 */
export const BRIGHTEST_DEEP_SKY: DeepSkyObject[] = [
  { id: 'M45', name: 'Plejaden', type: 'Offener Sternhaufen', raHours: 3 + 47.0 / 60, decDeg: 24 + 7 / 60, magnitude: 1.6 },
  { id: 'M31', name: 'Andromedagalaxie', type: 'Galaxie', raHours: 0 + 42.7 / 60, decDeg: 41 + 16 / 60, magnitude: 3.4 },
  { id: 'M44', name: 'Praesepe', type: 'Offener Sternhaufen', raHours: 8 + 40.1 / 60, decDeg: 19 + 59 / 60, magnitude: 3.7 },
  { id: 'M42', name: 'Orionnebel', type: 'Emissionsnebel', raHours: 5 + 35.4 / 60, decDeg: -(5 + 27 / 60), magnitude: 4.0 },
  { id: 'M47', type: 'Offener Sternhaufen', raHours: 7 + 36.6 / 60, decDeg: -(14 + 30 / 60), magnitude: 4.2 },
  { id: 'M41', type: 'Offener Sternhaufen', raHours: 6 + 46.0 / 60, decDeg: -(20 + 44 / 60), magnitude: 4.5 },
  { id: 'M39', type: 'Offener Sternhaufen', raHours: 21 + 32.2 / 60, decDeg: 48 + 26 / 60, magnitude: 4.6 },
  { id: 'M25', type: 'Offener Sternhaufen', raHours: 18 + 31.6 / 60, decDeg: -(19 + 15 / 60), magnitude: 4.6 },
];
