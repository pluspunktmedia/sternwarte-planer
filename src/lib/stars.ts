import {
  EquatorFromVector,
  Horizon,
  MakeTime,
  Observer,
  RotateVector,
  Rotation_EQJ_EQD,
  Spherical,
  VectorFromSphere,
} from 'astronomy-engine';
import type { Star } from '../data/brightStars';
import type { Location } from '../data/location';

/** Stern mit berechneter Position */
export interface StarPosition extends Star {
  /** Höhe über dem Horizont in Grad (negativ = unter dem Horizont) */
  altitude: number;
  /** Azimut in Grad, 0 = Nord, im Uhrzeigersinn */
  azimuth: number;
}

/** Berechnet Höhe und Azimut der Sterne – gleiches Vorgehen wie bei den Deep-Sky-Objekten */
export function computeStarPositions(date: Date, location: Location, stars: Star[]): StarPosition[] {
  const time = MakeTime(date);
  const observer = new Observer(location.latitude, location.longitude, location.elevation);
  // Drehung von J2000 auf den Äquator des Datums (Präzession, Nutation): einmal pro Zeitpunkt
  const toDate = Rotation_EQJ_EQD(time);

  return stars.map((star) => {
    const j2000 = VectorFromSphere(new Spherical(star.decDeg, star.raHours * 15, 1), time);
    const ofDate = EquatorFromVector(RotateVector(toDate, j2000));
    const horizontal = Horizon(time, observer, ofDate.ra, ofDate.dec, 'normal');
    return { ...star, altitude: horizontal.altitude, azimuth: horizontal.azimuth };
  });
}
