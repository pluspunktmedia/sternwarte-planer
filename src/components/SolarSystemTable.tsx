import { useMemo } from 'react';
import type { Location } from '../data/location';
import { MOON, PLANETS } from '../data/planets';
import { computeSolarSystemPositions } from '../lib/planets';
import { computeBodyRiseSets, startOfDay } from '../lib/riseSet';
import { classifyVisibility, edgeTimes } from '../lib/visibility';
import { formatMagnitude, formatRiseSetTime } from '../lib/format';
import VisibilityDot from './VisibilityDot';

interface SolarSystemTableProps {
  /** Zeitpunkt, für den die Positionen berechnet werden */
  date: Date;
  /** Beobachtungsort */
  location: Location;
}

/** Tabelle mit Mond und Planeten: Sternbild, Auf- und Untergang, Helligkeit */
export default function SolarSystemTable({ date, location }: SolarSystemTableProps) {
  const objects = useMemo(() => {
    // Ampelpunkt: Höhe jetzt sowie EDGE_MINUTES davor und danach
    const { before, after } = edgeTimes(date);
    const altitudesAt = (t: Date) =>
      new Map(computeSolarSystemPositions(t, location).map((o) => [o.name, o.altitude]));
    const altBefore = altitudesAt(before);
    const altAfter = altitudesAt(after);

    return computeSolarSystemPositions(date, location).map((obj) => ({
      ...obj,
      visibility: classifyVisibility(altBefore.get(obj.name)!, obj.altitude, altAfter.get(obj.name)!),
    }));
  }, [date, location]);

  // Auf- und Untergang hängen nur vom Tag ab → nicht bei jedem Live-Tick neu suchen
  const dayKey = startOfDay(date).getTime();
  const riseSets = useMemo(
    () => computeBodyRiseSets(new Date(dayKey), location, [MOON, ...PLANETS]),
    [dayKey, location],
  );

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="vis-col">
              <span className="visually-hidden">Sichtbarkeit</span>
            </th>
            <th scope="col">Objekt</th>
            <th scope="col">Sternbild</th>
            <th scope="col">Aufgang</th>
            <th scope="col">Untergang</th>
            <th scope="col">Helligkeit</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((obj) => {
            const riseSet = riseSets.get(obj.name)!;
            return (
              <tr key={obj.name} className={obj.altitude < 0 ? 'is-below' : undefined}>
                <td className="vis-col">
                  <VisibilityDot visibility={obj.visibility} altitude={obj.altitude} />
                </td>
                <th scope="row">
                  {obj.name}
                  {obj.illuminated !== undefined && ` (${Math.round(obj.illuminated * 100)} %)`}
                </th>
                <td>{obj.constellation}</td>
                <td>{formatRiseSetTime(riseSet.rise, riseSet)}</td>
                <td>{formatRiseSetTime(riseSet.set, riseSet)}</td>
                <td>{formatMagnitude(obj.magnitude)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
