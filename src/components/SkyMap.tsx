import { useMemo } from 'react';
import { BRIGHT_STARS, CONSTELLATION_LINES } from '../data/brightStars';
import { BRIGHTEST_DEEP_SKY } from '../data/deepSky';
import type { Location } from '../data/location';
import { BODY_COLORS } from '../data/planets';
import { computeDeepSkyPositions } from '../lib/deepSky';
import { computeSolarSystemPositions } from '../lib/planets';
import { computeStarPositions } from '../lib/stars';
import starsBackground from '../assets/sky-stars.png';
import './SkyMap.css';

/** Welche Objekte über den Sternen gezeichnet werden */
export type SkyLayer = 'all' | 'planets' | 'deepsky';

interface SkyMapProps {
  /** Zeitpunkt, für den die Positionen berechnet werden */
  date: Date;
  /** Beobachtungsort */
  location: Location;
  /** all = alles, planets = nur Mond und Planeten, deepsky = nur Deep-Sky-Objekte */
  show?: SkyLayer;
}

/** Radius des Kartenkreises in SVG-Einheiten (= Horizont) */
const R = 100;

/** Halbe Breite der viewBox: Kreis plus Rand für die Himmelsrichtungen */
const VIEW_HALF = 114;

/** Höhenkreise in Grad */
const GRID_ALTITUDES = [30, 60];

/** Beschriftet werden nur Sterne heller als diese Grenze */
const LABEL_MAGNITUDE = 1;

const CARDINALS = [
  { label: 'N', x: 0, y: -R - 9 },
  { label: 'O', x: R + 9, y: 0 },
  { label: 'S', x: 0, y: R + 9 },
  { label: 'W', x: -R - 9, y: 0 },
];

/**
 * Höhe/Azimut → Punkt im Kreis (azimutale, längentreue Projektion):
 * Mitte = Zenit, Rand = Horizont. Draufsicht wie auf einen Kuppel-Grundriss,
 * also Norden oben und Osten rechts.
 */
function project(altitude: number, azimuth: number) {
  const r = ((90 - altitude) / 90) * R;
  const a = (azimuth * Math.PI) / 180;
  return { x: r * Math.sin(a), y: -r * Math.cos(a), visible: altitude > 0 };
}

/** Hellere Sterne (kleinere Magnitude) → größere Punkte */
const starRadius = (magnitude: number) => Math.min(3.2, Math.max(0.7, 2.3 - 0.5 * magnitude));

/** Kreisförmige Himmelskarte: ganzer Himmel bis zum Horizont mit Sternen, Sternbildern, Deep-Sky-Objekten und Planeten */
export default function SkyMap({ date, location, show = 'all' }: SkyMapProps) {
  const showDeepSky = show !== 'planets';
  const showBodies = show !== 'deepsky';
  const stars = useMemo(() => computeStarPositions(date, location, BRIGHT_STARS), [date, location]);
  // Ausgeblendete Ebenen gar nicht erst berechnen
  const deepSky = useMemo(
    () => (showDeepSky ? computeDeepSkyPositions(date, location, BRIGHTEST_DEEP_SKY) : []),
    [date, location, showDeepSky],
  );
  const bodies = useMemo(
    () => (showBodies ? computeSolarSystemPositions(date, location) : []),
    [date, location, showBodies],
  );

  // Sternbildlinie nur zeichnen, wenn beide Sterne über dem Horizont stehen
  const starByName = new Map(stars.map((s) => [s.name, s]));
  const lines = CONSTELLATION_LINES.flatMap(([a, b]) => {
    const sa = starByName.get(a);
    const sb = starByName.get(b);
    if (!sa || !sb || sa.altitude <= 0 || sb.altitude <= 0) return [];
    return [{ key: `${a}-${b}`, p1: project(sa.altitude, sa.azimuth), p2: project(sb.altitude, sb.azimuth) }];
  });

  return (
    <svg
      className="sky-map"
      viewBox={`${-VIEW_HALF} ${-VIEW_HALF} ${2 * VIEW_HALF} ${2 * VIEW_HALF}`}
      role="img"
      aria-label="Sternenhimmel über dem Standort"
    >
      <defs>
        <radialGradient id="sky-map-gradient">
          <stop offset="0%" stopColor="#13204a" stopOpacity="0.55" />
          <stop offset="75%" stopColor="#1a2a62" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#31448f" stopOpacity="0.6" />
        </radialGradient>
        <clipPath id="sky-map-clip">
          <circle r={R} />
        </clipPath>
      </defs>

      {/* Hintergrund: dunkler Himmel, Sternenbild, Verlauf zum Horizont hin heller */}
      <g clipPath="url(#sky-map-clip)">
        <rect x={-R} y={-R} width={2 * R} height={2 * R} fill="#070c22" />
        <image
          href={starsBackground}
          x={-R * 1.6}
          y={-R}
          width={R * 3.2}
          height={R * 2}
          preserveAspectRatio="xMidYMid slice"
          opacity={0.75}
        />
        <circle r={R} fill="url(#sky-map-gradient)" />

        {GRID_ALTITUDES.map((alt) => (
          <circle key={alt} r={((90 - alt) / 90) * R} className="sky-map__grid" />
        ))}
        <line x1={0} y1={-R} x2={0} y2={R} className="sky-map__grid" />
        <line x1={-R} y1={0} x2={R} y2={0} className="sky-map__grid" />

        {lines.map(({ key, p1, p2 }) => (
          <line key={key} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className="sky-map__constellation" />
        ))}

        {stars.map((s) => {
          const { x, y, visible } = project(s.altitude, s.azimuth);
          if (!visible) return null;
          return (
            <g key={s.name}>
              <circle cx={x} cy={y} r={starRadius(s.magnitude)} className="sky-map__star">
                <title>{`${s.name} (${s.magnitude.toFixed(1)} mag)`}</title>
              </circle>
              {s.magnitude < LABEL_MAGNITUDE && (
                <text x={x + 3.5} y={y + 1.2} className="sky-map__star-label">
                  {s.name}
                </text>
              )}
            </g>
          );
        })}

        {deepSky.map((o) => {
          const { x, y, visible } = project(o.altitude, o.azimuth);
          if (!visible) return null;
          return (
            <g key={o.id}>
              <ellipse cx={x} cy={y} rx={3.4} ry={2} className="sky-map__deepsky">
                <title>{`${o.id}${o.name ? ` – ${o.name}` : ''} (${o.type})`}</title>
              </ellipse>
              <text x={x + 3.6} y={y + 4.4} className="sky-map__deepsky-label">
                {o.id}
              </text>
            </g>
          );
        })}

        {bodies.map((b) => {
          const { x, y, visible } = project(b.altitude, b.azimuth);
          if (!visible) return null;
          // Mond etwas größer als die Planeten
          const isMoon = b.name === 'Mond';
          const color = BODY_COLORS[b.name];
          return (
            <g key={b.name}>
              <circle cx={x} cy={y} r={isMoon ? 4.2 : 2.8} fill={color} className="sky-map__body">
                <title>{`${b.name} (${b.magnitude.toFixed(1)} mag)`}</title>
              </circle>
              <text x={x + (isMoon ? 5.5 : 4.2)} y={y - 1.8} fill={color} className="sky-map__body-label">
                {b.name}
              </text>
            </g>
          );
        })}
      </g>

      <circle r={R} className="sky-map__horizon" />

      {CARDINALS.map(({ label, x, y }) => (
        <text key={label} x={x} y={y} className="sky-map__cardinal">
          {label}
        </text>
      ))}
    </svg>
  );
}
