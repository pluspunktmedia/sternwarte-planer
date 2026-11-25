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

/** Farben von Mond und Planeten in der Himmelskarte, Schlüssel = Name */
export const BODY_COLORS: Record<string, string> = {
  Mond: '#f5f1d8',
  Merkur: '#c9b8a3',
  Venus: '#fff4c2',
  Mars: '#ff7a4d',
  Jupiter: '#f2d3a0',
  Saturn: '#f5b14c',
  Uranus: '#9fe3e8',
  Neptun: '#5b8cff',
};
