import { CURRENT_OBJECTS } from '../data/currentObjects';
import { formatAzimuth, formatDegrees, formatRa } from '../lib/format';
import Icon from './Icons';
import './CurrentObjectsCard.css';

/** Tabelle der aktuell interessanten Objekte (vorerst feste Daten) */
export default function CurrentObjectsCard() {
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
            {CURRENT_OBJECTS.map((obj) => (
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
