import {
  Constellation,
  EquatorFromVector,
  Horizon,
  MakeTime,
  Observer,
  RotateVector,
  Rotation_EQJ_EQD,
  Spherical,
  VectorFromSphere,
} from 'astronomy-engine';
import type { DeepSkyObject } from '../data/deepSky';
import type { Location } from '../data/location';

/** Deep-Sky-Objekt mit berechneter Position */
export interface DeepSkyPosition extends DeepSkyObject {
  constellation: string;
  /** Höhe über dem Horizont in Grad (negativ = unter dem Horizont) */
  altitude: number;
  /** Azimut in Grad, 0 = Nord, im Uhrzeigersinn */
  azimuth: number;
  /** Höhe beim Durchgang durch den Meridian in Grad */
  maxAltitude: number;
}

/** Berechnet Höhe und Azimut von Deep-Sky-Objekten für Standort und Zeitpunkt */
export function computeDeepSkyPositions(
  date: Date,
  location: Location,
  catalog: DeepSkyObject[],
): DeepSkyPosition[] {
  const time = MakeTime(date);
  const observer = new Observer(location.latitude, location.longitude, location.elevation);
  // Drehung von J2000 auf den Äquator des Datums (Präzession, Nutation): einmal pro Zeitpunkt
  const toDate = Rotation_EQJ_EQD(time);

  return catalog.map((obj) => {
    // Katalogkoordinaten als Vektor, auf das Datum gedreht
    const j2000 = VectorFromSphere(new Spherical(obj.decDeg, obj.raHours * 15, 1), time);
    const ofDate = EquatorFromVector(RotateVector(toDate, j2000));
    // 'normal' berücksichtigt die Lichtbrechung der Atmosphäre in Horizontnähe
    const horizontal = Horizon(time, observer, ofDate.ra, ofDate.dec, 'normal');

    return {
      ...obj,
      // Constellation() erwartet J2000 → Katalogwerte direkt verwenden
      constellation: Constellation(obj.raHours, obj.decDeg).name,
      altitude: horizontal.altitude,
      azimuth: horizontal.azimuth,
      maxAltitude: 90 - Math.abs(location.latitude - obj.decDeg),
    };
  });
}
