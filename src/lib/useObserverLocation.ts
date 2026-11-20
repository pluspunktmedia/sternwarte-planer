import { useState } from 'react';
import { LOCATION_PRESETS, type Location } from '../data/location';

export interface ObserverLocation {
  /** Ort, für den alles berechnet wird */
  location: Location;
  /** Kennung des gewählten festen Orts oder null bei einem per GPS bestimmten Ort */
  presetId: string | null;
  /** Einen der festen Orte wählen */
  selectPreset: (id: string) => void;
  /** Standort über den Browser bestimmen */
  locate: () => void;
  /** Standortabfrage läuft gerade */
  locating: boolean;
  /** Fehlermeldung der letzten Standortabfrage */
  geoError: string | null;
}

/** Verständliche Meldungen zu den Fehlercodes der Geolocation-API */
function geoErrorMessage(err: GeolocationPositionError): string {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return 'Standortfreigabe wurde abgelehnt';
    case err.POSITION_UNAVAILABLE:
      return 'Standort konnte nicht bestimmt werden';
    case err.TIMEOUT:
      return 'Standortabfrage hat zu lange gedauert';
    default:
      return err.message;
  }
}

/** Beobachtungsort: einer der festen Orte oder der per GPS bestimmte eigene Standort */
export function useObserverLocation(): ObserverLocation {
  const [location, setLocation] = useState<Location>(LOCATION_PRESETS[0]);
  const [presetId, setPresetId] = useState<string | null>(LOCATION_PRESETS[0].id);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  return {
    location,
    presetId,
    selectPreset: (id) => {
      const preset = LOCATION_PRESETS.find((p) => p.id === id);
      if (!preset) return;
      setLocation(preset);
      setPresetId(preset.id);
      setGeoError(null);
    },
    locate: () => {
      if (!navigator.geolocation) {
        setGeoError('Standortbestimmung wird vom Browser nicht unterstützt');
        return;
      }
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            name: 'Mein Standort',
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            elevation: pos.coords.altitude ?? 0,
          });
          setPresetId(null);
          setGeoError(null);
          setLocating(false);
        },
        (err) => {
          setGeoError(geoErrorMessage(err));
          setLocating(false);
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 },
      );
    },
    locating,
    geoError,
  };
}
