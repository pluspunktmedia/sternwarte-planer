import type { ReactNode } from 'react';
import Icon, { type IconName } from './Icons';
import './Card.css';

interface CardProps {
  /** Eindeutige Kennung für die Verknüpfung von Überschrift und Bereich */
  id: string;
  title: string;
  icon: IconName;
  /** Optionaler Link rechts im Kopf, z. B. "Alle anzeigen" */
  link?: { href: string; label: string };
  children: ReactNode;
}

/** Karte mit Kopfzeile (Icon, Titel, optionaler Link) und beliebigem Inhalt */
export default function Card({ id, title, icon, link, children }: CardProps) {
  return (
    <section className="card" aria-labelledby={id}>
      <header className="card__header">
        <h2 className="card__title" id={id}>
          <Icon name={icon} className="card__title-icon" />
          {title}
        </h2>
        {link && (
          <a className="card__link" href={link.href}>
            {link.label}
            <Icon name="arrow-right" size={16} />
          </a>
        )}
      </header>

      {children}
    </section>
  );
}
