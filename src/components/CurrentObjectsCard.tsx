import { useMemo } from 'react';
import { STERNWARTE } from '../data/location';
import { computeSolarSystemPositions } from '../lib/planets';
import { formatAzimuth, formatDegrees, formatRa } from '../lib/format';
import Icon from './Icons';
import './CurrentObjectsCard.css';

interface CurrentObjectsCardProps {
  /** Zeitpunkt, für den die Positionen berechnet werden */
  date: Date;
}

/** Tabelle mit den berechneten Positionen von Mond und Planeten */
export default function CurrentObjectsCard({ date }: CurrentObjectsCardProps) {
  const objects = useMemo(() => computeSolarSystemPositions(date, STERNWARTE), [date]);

  return (
    <section className="card" aria-labelledby="objekte-titel">
      <header className="card__header">
        <h2 className="card__title" id="objekte-titel">
          <Icon name="sparkles" className="card__title-icon" />
          Aktuelle Objekte
        </h2>
        <a className="card__link" href="#objekte">
          Alle anzeigen
          <Icon name="arrow-right" size={16} />
        </a>
      </header>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Objekt</th>
              <th scope="col">Sternbild</th>
              <th scope="col">Höhe</th>
              <th scope="col">Azimut</th>
              <th scope="col">RA (J2000)</th>
              <th scope="col">Dek (J2000)</th>
            </tr>
          </thead>
          <tbody>
            {objects.map((obj) => (
              <tr key={obj.name} className={obj.altitude < 0 ? 'is-below' : undefined}>
                <th scope="row">
                  {obj.name}
                  {obj.illuminated !== undefined && ` (${Math.round(obj.illuminated * 100)} %)`}
                </th>
                <td>{obj.constellation}</td>
                <td>{formatDegrees(obj.altitude)}</td>
                <td>{formatAzimuth(obj.azimuth)}</td>
                <td>{formatRa(obj.raHours)}</td>
                <td>{formatDegrees(obj.decDeg)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
