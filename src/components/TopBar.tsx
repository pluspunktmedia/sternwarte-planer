import Icon from './Icons';

interface TopBarProps {
  /** Zeitpunkt im Format "YYYY-MM-DDTHH:mm" */
  dateTime: string;
  onDateTimeChange: (value: string) => void;
}

/** Kopfzeile mit der Auswahl von Datum und Uhrzeit */
export default function TopBar({ dateTime, onDateTimeChange }: TopBarProps) {
  return (
    <header className="topbar">
      <label className="field">
        <Icon name="calendar" />
        <span className="visually-hidden">Datum und Uhrzeit</span>
        <input
          className="field__input"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => onDateTimeChange(e.target.value)}
        />
      </label>
    </header>
  );
}
