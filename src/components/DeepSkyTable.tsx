import { useMemo } from 'react';
import { BRIGHTEST_DEEP_SKY } from '../data/deepSky';
import type { Location } from '../data/location';
import { computeDeepSkyPositions } from '../lib/deepSky';
import { computeDeepSkyRiseSets, startOfDay } from '../lib/riseSet';
import { classifyVisibility, edgeTimes } from '../lib/visibility';
import { formatMagnitude, formatRiseSetTime } from '../lib/format';
import VisibilityDot from './VisibilityDot';

interface DeepSkyTableProps {
  /** Zeitpunkt, für den die Positionen berechnet werden */
  date: Date;
  /** Beobachtungsort */
  location: Location;
}

/** Tabelle der hellsten Deep-Sky-Objekte: Sternbild, Auf- und Untergang, Helligkeit */
export default function DeepSkyTable({ date, location }: DeepSkyTableProps) {
  const objects = useMemo(() => {
    // Ampelpunkt: Höhe jetzt sowie EDGE_MINUTES davor und danach
    const { before, after } = edgeTimes(date);
    const altitudesAt = (t: Date) =>
      new Map(computeDeepSkyPositions(t, location, BRIGHTEST_DEEP_SKY).map((o) => [o.id, o.altitude]));
    const altBefore = altitudesAt(before);
    const altAfter = altitudesAt(after);

    return computeDeepSkyPositions(date, location, BRIGHTEST_DEEP_SKY).map((obj) => ({
      ...obj,
      visibility: classifyVisibility(altBefore.get(obj.id)!, obj.altitude, altAfter.get(obj.id)!),
    }));
  }, [date, location]);

  // Auf- und Untergang hängen nur vom Tag ab → nicht bei jedem Live-Tick neu suchen
  const dayKey = startOfDay(date).getTime();
  const riseSets = useMemo(
    () => computeDeepSkyRiseSets(new Date(dayKey), location, BRIGHTEST_DEEP_SKY),
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
            const riseSet = riseSets.get(obj.id)!;
            return (
              <tr key={obj.id} className={obj.altitude < 0 ? 'is-below' : undefined}>
                <td className="vis-col">
                  <VisibilityDot visibility={obj.visibility} altitude={obj.altitude} />
                </td>
                <th scope="row">
                  {obj.id}
                  {obj.name && <span className="table__sub"> {obj.name}</span>}
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
