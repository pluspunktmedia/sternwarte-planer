import { useMemo } from 'react';
import { BRIGHTEST_DEEP_SKY } from '../data/deepSky';
import type { Location } from '../data/location';
import { computeDeepSkyPositions } from '../lib/deepSky';
import { formatAzimuth, formatDegrees, formatMagnitude } from '../lib/format';

interface DeepSkyTableProps {
  /** Zeitpunkt, für den die Positionen berechnet werden */
  date: Date;
  /** Beobachtungsort */
  location: Location;
}

/** Tabelle der hellsten Deep-Sky-Objekte, sortiert nach Helligkeit */
export default function DeepSkyTable({ date, location }: DeepSkyTableProps) {
  const objects = useMemo(() => computeDeepSkyPositions(date, location, BRIGHTEST_DEEP_SKY), [date, location]);

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Objekt</th>
            <th scope="col">Typ</th>
            <th scope="col">Sternbild</th>
            <th scope="col">Höhe</th>
            <th scope="col">Azimut</th>
            <th scope="col">max. Höhe</th>
            <th scope="col">Helligkeit</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((obj) => (
            <tr key={obj.id} className={obj.altitude < 0 ? 'is-below' : undefined}>
              <th scope="row">
                {obj.id}
                {obj.name && <span className="table__sub"> {obj.name}</span>}
              </th>
              <td>{obj.type}</td>
              <td>{obj.constellation}</td>
              <td>{formatDegrees(obj.altitude)}</td>
              <td>{formatAzimuth(obj.azimuth)}</td>
              <td>{formatDegrees(obj.maxAltitude)}</td>
              <td>{formatMagnitude(obj.magnitude)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
