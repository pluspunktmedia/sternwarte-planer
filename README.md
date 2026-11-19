# Sternwarte-Planer

Webanwendung zur Beobachtungsplanung für eine Sternwarte: Sternenhimmel, Deep-Sky-Objekte, Planeten und Mond für einen frei wählbaren Standort und Zeitpunkt.

> **Status:** in Entwicklung. Das Projekt wird schrittweise aufgebaut, die einzelnen Schritte sind in der Git-Historie nachvollziehbar.

## Technik

- [React 19](https://react.dev/) mit TypeScript
- [Vite](https://vite.dev/) als Entwicklungsserver und Build-Werkzeug
- [astronomy-engine](https://github.com/cosinekitty/astronomy) für die Positionsberechnung von Himmelskörpern
- ESLint für die Code-Prüfung
- Docker: Node für die Entwicklung, nginx für die Auslieferung

## Starten

Voraussetzung: [Docker](https://www.docker.com/) mit Docker Compose.

### Entwicklung (mit Live-Reload)

```bash
docker compose up -d
```

Die Anwendung ist unter <http://localhost:5173> erreichbar. Änderungen im Code erscheinen sofort im Browser.

### Produktion (gebaute App über nginx)

```bash
docker compose --profile prod up -d --build
```

Die Anwendung ist unter <http://localhost:8080> erreichbar.

### Stoppen

```bash
docker compose --profile prod down
```

### Ohne Docker

Mit installiertem [Node.js](https://nodejs.org/) (ab Version 24):

```bash
npm install
npm run dev      # Entwicklungsserver
npm run build    # Produktions-Build nach dist/
npm run lint     # Code-Prüfung
```

## Projektstruktur

```text
sternwarte-planer/
├── src/
│   ├── main.tsx              # Einstiegspunkt, bindet React ein
│   ├── App.tsx               # Grundgerüst der Seite
│   ├── index.css             # Design-Tokens und globale Stile
│   ├── components/           # Oberflächen-Bausteine (Navigation, Kopfzeile, Tabelle, Icons)
│   ├── data/                 # Daten (Standort, Mond und Planeten)
│   └── lib/                  # Hilfsfunktionen (Positionsberechnung, Formatierung)
├── public/
│   └── icons/                # Icons als SVG-Dateien
├── docs/
│   └── vorlage.png           # Designvorlage
├── index.html                # HTML-Gerüst für Vite
├── Dockerfile                # Produktions-Image (Build + nginx)
├── docker-compose.yml        # Entwicklung (Port 5173) und Produktion (Port 8080)
└── package.json
```

## Autor

Jens Katzenberger
