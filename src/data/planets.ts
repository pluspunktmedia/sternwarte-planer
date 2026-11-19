import { Body } from 'astronomy-engine';

/** Himmelskörper mit deutschem Anzeigenamen und Kennung für astronomy-engine */
export interface SolarSystemBody {
  body: Body;
  name: string;
}

/** Der Mond der Erde */
export const MOON: SolarSystemBody = { body: Body.Moon, name: 'Mond' };

/** Planeten des Sonnensystems in Reihenfolge ihres Abstands zur Sonne (ohne Erde) */
export const PLANETS: SolarSystemBody[] = [
  { body: Body.Mercury, name: 'Merkur' },
  { body: Body.Venus, name: 'Venus' },
  { body: Body.Mars, name: 'Mars' },
  { body: Body.Jupiter, name: 'Jupiter' },
  { body: Body.Saturn, name: 'Saturn' },
  { body: Body.Uranus, name: 'Uranus' },
  { body: Body.Neptune, name: 'Neptun' },
];
