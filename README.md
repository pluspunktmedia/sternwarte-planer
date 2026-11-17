# Sternwarte-Planer

Webanwendung zur Beobachtungsplanung für eine Sternwarte: Sternenhimmel, Deep-Sky-Objekte, Planeten und Mond für einen frei wählbaren Standort und Zeitpunkt.

> **Status:** in Entwicklung. Das Projekt wird schrittweise aufgebaut, die einzelnen Schritte sind in der Git-Historie nachvollziehbar.

## Starten

Voraussetzung: [Docker](https://www.docker.com/) mit Docker Compose.

```bash
docker compose up -d --build
```

Danach ist die Anwendung unter <http://localhost:8080> erreichbar.

Stoppen:

```bash
docker compose down
```

## Projektstruktur

```text
sternwarte-planer/
├── index.html          # Einstiegsseite
├── Dockerfile          # nginx-Image für die Auslieferung
├── docker-compose.yml  # lokaler Start auf Port 8080
└── README.md
```

## Autor

Jens Katzenberger
