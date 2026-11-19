/** Date → "YYYY-MM-DDTHH:mm" in lokaler Zeit (Format von <input type="datetime-local">) */
export function toLocalInputValue(d: Date): string {
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

/** Date → "17.11.2026 · 14:54" für die Kopfzeile */
export function formatDateTime(d: Date): string {
  const date = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const time = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  return `${date} · ${time}`;
}
