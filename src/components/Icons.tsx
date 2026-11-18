import type { CSSProperties } from 'react';
import './Icons.css';

/** Verfügbare Icons, entsprechen den Dateien in public/icons/<name>.svg */
export type IconName =
  | 'observatory'
  | 'sparkles'
  | 'star'
  | 'planet'
  | 'gear'
  | 'moon'
  | 'calendar'
  | 'arrow-right';

interface IconProps {
  name: IconName;
  /** Kantenlänge in Pixeln (Standard aus CSS: 22 px) */
  size?: number;
  className?: string;
}

/**
 * Zeigt ein SVG aus public/icons an.
 * Das SVG dient als CSS-Maske, eingefärbt wird mit der aktuellen Textfarbe –
 * so funktionieren Hover- und Aktiv-Farben wie bei Inline-SVGs.
 */
export default function Icon({ name, size, className }: IconProps) {
  const url = `url(${import.meta.env.BASE_URL}icons/${name}.svg)`;
  const style: CSSProperties = { maskImage: url, WebkitMaskImage: url };
  if (size) {
    style.width = size;
    style.height = size;
  }

  return <span className={className ? `icon ${className}` : 'icon'} style={style} aria-hidden="true" />;
}
