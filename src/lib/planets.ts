import { Constellation, Equator, Horizon, Illumination, Observer } from 'astronomy-engine';
import type { Location } from '../data/location';
import { MOON, PLANETS, type SolarSystemBody } from '../data/planets';

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
  /** Beleuchteter Anteil 0–1 (nur beim Mond angegeben) */
  illuminated?: number;
}

/** Berechnet die Position eines Himmelskörpers */
function computePosition({ body, name }: SolarSystemBody, date: Date, observer: Observer): SkyObject {
  // Koordinaten zum Standard-Äquinoktium J2000 – für Tabelle und Sternbild
  const j2000 = Equator(body, date, observer, false, true);
  // Koordinaten zum aktuellen Datum – Grundlage für Höhe und Azimut
  const ofDate = Equator(body, date, observer, true, true);
  // 'normal' berücksichtigt die Lichtbrechung der Atmosphäre in Horizontnähe
  const horizontal = Horizon(date, observer, ofDate.ra, ofDate.dec, 'normal');

  return {
    name,
    constellation: Constellation(j2000.ra, j2000.dec).name,
    altitude: horizontal.altitude,
    azimuth: horizontal.azimuth,
    raHours: j2000.ra,
    decDeg: j2000.dec,
  };
}

/** Berechnet die Positionen von Mond und Planeten für Standort und Zeitpunkt */
export function computeSolarSystemPositions(date: Date, location: Location): SkyObject[] {
  const observer = new Observer(location.latitude, location.longitude, location.elevation);

  const moon: SkyObject = {
    ...computePosition(MOON, date, observer),
    illuminated: Illumination(MOON.body, date).phase_fraction,
  };
  const planets = PLANETS.map((planet) => computePosition(planet, date, observer));

  return [moon, ...planets];
}
