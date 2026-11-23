import { Body, DefineStar, Equator, Horizon, Observer, SearchRiseSet } from 'astronomy-engine';
import type { DeepSkyObject } from '../data/deepSky';
import type { Location } from '../data/location';
import type { SolarSystemBody } from '../data/planets';

/** Auf- und Untergang innerhalb eines Kalendertages */
export interface RiseSet {
  rise: Date | null;
  set: Date | null;
  /**
   * Nur gesetzt, wenn an diesem Tag weder Auf- noch Untergang stattfindet:
   * 'up' = den ganzen Tag über dem Horizont (zirkumpolar), 'down' = geht nicht auf
   */
  allDay?: 'up' | 'down';
}

/** 0:00 Uhr (Ortszeit des Browsers) des Tages, an dem `date` liegt */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Sucht Auf- und Untergang zwischen 0:00 und 24:00 Uhr.
 * Fällt beides aus, entscheidet die Höhe um Mitternacht, ob das Objekt
 * dauerhaft über oder dauerhaft unter dem Horizont ist.
 */
function riseSetForDay(body: Body, observer: Observer, dayStart: Date): RiseSet {
  const rise = SearchRiseSet(body, observer, +1, dayStart, 1)?.date ?? null;
  const set = SearchRiseSet(body, observer, -1, dayStart, 1)?.date ?? null;
  if (rise || set) return { rise, set };

  const eq = Equator(body, dayStart, observer, true, true);
  const altitude = Horizon(dayStart, observer, eq.ra, eq.dec, 'normal').altitude;
  return { rise, set, allDay: altitude > 0 ? 'up' : 'down' };
}

/** Auf- und Untergänge von Mond und Planeten am Tag von `date`, Schlüssel = Name */
export function computeBodyRiseSets(
  date: Date,
  location: Location,
  bodies: SolarSystemBody[],
): Map<string, RiseSet> {
  const observer = new Observer(location.latitude, location.longitude, location.elevation);
  const dayStart = startOfDay(date);
  return new Map(bodies.map(({ body, name }) => [name, riseSetForDay(body, observer, dayStart)]));
}

/**
 * Auf- und Untergänge der Deep-Sky-Objekte am Tag von `date`, Schlüssel = Katalognummer.
 * astronomy-engine rechnet feste Himmelspunkte über die Platzhalter Star1 bis Star8;
 * Star1 wird für jedes Objekt neu belegt (die Entfernung spielt dabei keine Rolle).
 */
export function computeDeepSkyRiseSets(
  date: Date,
  location: Location,
  catalog: DeepSkyObject[],
): Map<string, RiseSet> {
  const observer = new Observer(location.latitude, location.longitude, location.elevation);
  const dayStart = startOfDay(date);
  return new Map(
    catalog.map((obj) => {
      DefineStar(Body.Star1, obj.raHours, obj.decDeg, 1000);
      return [obj.id, riseSetForDay(Body.Star1, observer, dayStart)];
    }),
  );
}
