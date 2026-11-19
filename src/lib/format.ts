/** Himmelsrichtungen in 22,5°-Schritten, beginnend bei Nord */
const DIRECTIONS = ['N', 'NNO', 'NO', 'ONO', 'O', 'OSO', 'SO', 'SSO', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

/** Azimut in Grad → Himmelsrichtung, z. B. 127 → "SO" */
export function azimuthToDirection(azimuth: number): string {
  const index = Math.round((((azimuth % 360) + 360) % 360) / 22.5) % DIRECTIONS.length;
  return DIRECTIONS[index];
}

/** Gradzahl mit einer Nachkommastelle und echtem Minuszeichen, z. B. -8.7 → "−8,7°" */
export function formatDegrees(value: number): string {
  const text = value.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return `${text.replace('-', '−')}°`;
}

/** Azimut mit Himmelsrichtung, z. B. 127 → "127° SO" */
export function formatAzimuth(azimuth: number): string {
  return `${Math.round(azimuth)}° ${azimuthToDirection(azimuth)}`;
}

/** Rektaszension in Stunden → "21h 54m" */
export function formatRa(hours: number): string {
  const totalMinutes = Math.round(hours * 60) % (24 * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

/** Helligkeit in Größenklassen, z. B. 1.6 → "1,6 mag" */
export function formatMagnitude(value: number): string {
  const text = value.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return `${text.replace('-', '−')} mag`;
}
