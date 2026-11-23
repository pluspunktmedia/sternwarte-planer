import { EDGE_MINUTES, type Visibility } from '../lib/visibility';
import './VisibilityDot.css';

const LABELS: Record<Visibility, string> = {
  visible: 'Sichtbar',
  rising: `Gerade aufgegangen (vor weniger als ${EDGE_MINUTES} min)`,
  setting: `Geht in weniger als ${EDGE_MINUTES} min unter`,
  down: 'Nicht sichtbar',
};

interface VisibilityDotProps {
  visibility: Visibility;
  /** Aktuelle Höhe in Grad, erscheint im Tooltip */
  altitude: number;
}

/** Ampelpunkt: grün = sichtbar, gelb = kurz nach Aufgang / kurz vor Untergang, rot = unter dem Horizont */
export default function VisibilityDot({ visibility, altitude }: VisibilityDotProps) {
  return (
    <span
      className={`vis-dot is-${visibility}`}
      role="img"
      aria-label={LABELS[visibility]}
      title={`${LABELS[visibility]} – Höhe ${altitude.toFixed(1)}°`}
    />
  );
}
