/** Stern mit Katalogwerten für die Himmelskarte */
export interface Star {
  name: string;
  /** Rektaszension (J2000) in Stunden */
  raHours: number;
  /** Deklination (J2000) in Grad */
  decDeg: number;
  /** Scheinbare visuelle Helligkeit in mag */
  magnitude: number;
}

/** Rektaszension aus Stunden, Minuten, Sekunden → Stunden */
const ra = (h: number, m: number, s = 0) => h + m / 60 + s / 3600;
/** Deklination aus Grad, Bogenminuten, Bogensekunden → Grad (auch bei −0° richtig negativ) */
const dec = (d: number, m: number, s = 0) =>
  (d < 0 || Object.is(d, -0) ? -1 : 1) * (Math.abs(d) + m / 60 + s / 3600);

/** Die hellsten Sterne und die Sterne, die für die bekannten Sternbildfiguren gebraucht werden */
export const BRIGHT_STARS: Star[] = [
  { name: 'Sirius', raHours: ra(6, 45, 9), decDeg: dec(-16, 43), magnitude: -1.46 },
  { name: 'Canopus', raHours: ra(6, 23, 57), decDeg: dec(-52, 42), magnitude: -0.74 },
  { name: 'Rigil Kentaurus', raHours: ra(14, 39, 36), decDeg: dec(-60, 50), magnitude: -0.27 },
  { name: 'Arktur', raHours: ra(14, 15, 40), decDeg: dec(19, 11), magnitude: -0.05 },
  { name: 'Wega', raHours: ra(18, 36, 56), decDeg: dec(38, 47), magnitude: 0.03 },
  { name: 'Kapella', raHours: ra(5, 16, 41), decDeg: dec(46, 0), magnitude: 0.08 },
  { name: 'Rigel', raHours: ra(5, 14, 32), decDeg: dec(-8, 12), magnitude: 0.13 },
  { name: 'Prokyon', raHours: ra(7, 39, 18), decDeg: dec(5, 14), magnitude: 0.34 },
  { name: 'Achernar', raHours: ra(1, 37, 43), decDeg: dec(-57, 14), magnitude: 0.46 },
  { name: 'Beteigeuze', raHours: ra(5, 55, 10), decDeg: dec(7, 24), magnitude: 0.5 },
  { name: 'Hadar', raHours: ra(14, 3, 49), decDeg: dec(-60, 22), magnitude: 0.61 },
  { name: 'Atair', raHours: ra(19, 50, 47), decDeg: dec(8, 52), magnitude: 0.76 },
  { name: 'Acrux', raHours: ra(12, 26, 36), decDeg: dec(-63, 6), magnitude: 0.76 },
  { name: 'Aldebaran', raHours: ra(4, 35, 55), decDeg: dec(16, 31), magnitude: 0.86 },
  { name: 'Antares', raHours: ra(16, 29, 24), decDeg: dec(-26, 26), magnitude: 0.96 },
  { name: 'Spica', raHours: ra(13, 25, 12), decDeg: dec(-11, 10), magnitude: 0.97 },
  { name: 'Pollux', raHours: ra(7, 45, 19), decDeg: dec(28, 2), magnitude: 1.14 },
  { name: 'Fomalhaut', raHours: ra(22, 57, 39), decDeg: dec(-29, 37), magnitude: 1.16 },
  { name: 'Deneb', raHours: ra(20, 41, 26), decDeg: dec(45, 17), magnitude: 1.25 },
  { name: 'Mimosa', raHours: ra(12, 47, 43), decDeg: dec(-59, 41), magnitude: 1.25 },
  { name: 'Regulus', raHours: ra(10, 8, 22), decDeg: dec(11, 58), magnitude: 1.35 },
  { name: 'Adhara', raHours: ra(6, 58, 38), decDeg: dec(-28, 58), magnitude: 1.5 },
  { name: 'Kastor', raHours: ra(7, 34, 36), decDeg: dec(31, 53), magnitude: 1.58 },
  { name: 'Shaula', raHours: ra(17, 33, 36), decDeg: dec(-37, 6), magnitude: 1.62 },
  { name: 'Gacrux', raHours: ra(12, 31, 10), decDeg: dec(-57, 7), magnitude: 1.64 },
  { name: 'Bellatrix', raHours: ra(5, 25, 8), decDeg: dec(6, 21), magnitude: 1.64 },
  { name: 'Elnath', raHours: ra(5, 26, 18), decDeg: dec(28, 36), magnitude: 1.65 },
  { name: 'Miaplacidus', raHours: ra(9, 13, 12), decDeg: dec(-69, 43), magnitude: 1.68 },
  { name: 'Alnilam', raHours: ra(5, 36, 13), decDeg: dec(-1, 12), magnitude: 1.69 },
  { name: 'Alnair', raHours: ra(22, 8, 14), decDeg: dec(-46, 58), magnitude: 1.74 },
  { name: 'Alnitak', raHours: ra(5, 40, 46), decDeg: dec(-1, 57), magnitude: 1.77 },
  { name: 'Alioth', raHours: ra(12, 54, 2), decDeg: dec(55, 58), magnitude: 1.77 },
  { name: 'Dubhe', raHours: ra(11, 3, 44), decDeg: dec(61, 45), magnitude: 1.79 },
  { name: 'Mirfak', raHours: ra(3, 24, 19), decDeg: dec(49, 52), magnitude: 1.79 },
  { name: 'Wezen', raHours: ra(7, 8, 23), decDeg: dec(-26, 24), magnitude: 1.84 },
  { name: 'Kaus Australis', raHours: ra(18, 24, 10), decDeg: dec(-34, 23), magnitude: 1.85 },
  { name: 'Avior', raHours: ra(8, 22, 31), decDeg: dec(-59, 31), magnitude: 1.86 },
  { name: 'Alkaid', raHours: ra(13, 47, 32), decDeg: dec(49, 19), magnitude: 1.86 },
  { name: 'Sargas', raHours: ra(17, 37, 19), decDeg: dec(-43, 0), magnitude: 1.86 },
  { name: 'Menkalinan', raHours: ra(5, 59, 32), decDeg: dec(44, 57), magnitude: 1.9 },
  { name: 'Atria', raHours: ra(16, 48, 40), decDeg: dec(-69, 2), magnitude: 1.91 },
  { name: 'Alhena', raHours: ra(6, 37, 43), decDeg: dec(16, 24), magnitude: 1.93 },
  { name: 'Peacock', raHours: ra(20, 25, 39), decDeg: dec(-56, 44), magnitude: 1.94 },
  { name: 'Polaris', raHours: ra(2, 31, 49), decDeg: dec(89, 16), magnitude: 1.98 },
  { name: 'Mirzam', raHours: ra(6, 22, 42), decDeg: dec(-17, 57), magnitude: 1.98 },
  { name: 'Alphard', raHours: ra(9, 27, 35), decDeg: dec(-8, 40), magnitude: 1.98 },
  { name: 'Hamal', raHours: ra(2, 7, 10), decDeg: dec(23, 28), magnitude: 2.0 },
  { name: 'Algieba', raHours: ra(10, 19, 58), decDeg: dec(19, 51), magnitude: 2.01 },
  { name: 'Diphda', raHours: ra(0, 43, 35), decDeg: dec(-17, 59), magnitude: 2.04 },
  { name: 'Nunki', raHours: ra(18, 55, 16), decDeg: dec(-26, 18), magnitude: 2.05 },
  { name: 'Mirach', raHours: ra(1, 9, 44), decDeg: dec(35, 37), magnitude: 2.05 },
  { name: 'Saiph', raHours: ra(5, 47, 45), decDeg: dec(-9, 40), magnitude: 2.06 },
  { name: 'Alpheratz', raHours: ra(0, 8, 23), decDeg: dec(29, 5), magnitude: 2.06 },
  { name: 'Rasalhague', raHours: ra(17, 34, 56), decDeg: dec(12, 34), magnitude: 2.07 },
  { name: 'Kochab', raHours: ra(14, 50, 42), decDeg: dec(74, 9), magnitude: 2.08 },
  { name: 'Almach', raHours: ra(2, 3, 54), decDeg: dec(42, 20), magnitude: 2.1 },
  { name: 'Algol', raHours: ra(3, 8, 10), decDeg: dec(40, 57), magnitude: 2.12 },
  { name: 'Denebola', raHours: ra(11, 49, 4), decDeg: dec(14, 34), magnitude: 2.13 },
  { name: 'Mintaka', raHours: ra(5, 32, 0), decDeg: dec(-0, 18), magnitude: 2.23 },
  { name: 'Mizar', raHours: ra(13, 23, 56), decDeg: dec(54, 56), magnitude: 2.23 },
  { name: 'Sadr', raHours: ra(20, 22, 14), decDeg: dec(40, 15), magnitude: 2.23 },
  { name: 'Alphecca', raHours: ra(15, 34, 41), decDeg: dec(26, 43), magnitude: 2.23 },
  { name: 'Schedar', raHours: ra(0, 40, 30), decDeg: dec(56, 32), magnitude: 2.24 },
  { name: 'Eltanin', raHours: ra(17, 56, 36), decDeg: dec(51, 29), magnitude: 2.24 },
  { name: 'Caph', raHours: ra(0, 9, 11), decDeg: dec(59, 9), magnitude: 2.28 },
  { name: 'Merak', raHours: ra(11, 1, 51), decDeg: dec(56, 23), magnitude: 2.37 },
  { name: 'Izar', raHours: ra(14, 44, 59), decDeg: dec(27, 4), magnitude: 2.37 },
  { name: 'Enif', raHours: ra(21, 44, 11), decDeg: dec(9, 52), magnitude: 2.38 },
  { name: 'Scheat', raHours: ra(23, 3, 46), decDeg: dec(28, 5), magnitude: 2.42 },
  { name: 'Phekda', raHours: ra(11, 53, 50), decDeg: dec(53, 42), magnitude: 2.44 },
  { name: 'Navi', raHours: ra(0, 56, 43), decDeg: dec(60, 43), magnitude: 2.47 },
  { name: 'Gienah', raHours: ra(20, 46, 13), decDeg: dec(33, 58), magnitude: 2.48 },
  { name: 'Markab', raHours: ra(23, 4, 46), decDeg: dec(15, 12), magnitude: 2.49 },
  { name: 'Menkar', raHours: ra(3, 2, 17), decDeg: dec(4, 5), magnitude: 2.53 },
  { name: 'Zubeneschamali', raHours: ra(15, 17, 0), decDeg: dec(-9, 23), magnitude: 2.61 },
  { name: 'Unukalhai', raHours: ra(15, 44, 16), decDeg: dec(6, 25), magnitude: 2.63 },
  { name: 'Ruchbah', raHours: ra(1, 25, 49), decDeg: dec(60, 14), magnitude: 2.68 },
  { name: 'Tarazed', raHours: ra(19, 46, 15), decDeg: dec(10, 37), magnitude: 2.72 },
  { name: 'Algenib', raHours: ra(0, 13, 14), decDeg: dec(15, 11), magnitude: 2.83 },
  { name: 'Delta Cygni', raHours: ra(19, 44, 58), decDeg: dec(45, 8), magnitude: 2.87 },
  { name: 'Albireo', raHours: ra(19, 30, 43), decDeg: dec(27, 58), magnitude: 3.08 },
  { name: 'Sulafat', raHours: ra(18, 58, 56), decDeg: dec(32, 41), magnitude: 3.25 },
  { name: 'Megrez', raHours: ra(12, 15, 26), decDeg: dec(57, 2), magnitude: 3.31 },
  { name: 'Segin', raHours: ra(1, 54, 24), decDeg: dec(63, 40), magnitude: 3.37 },
  { name: 'Sheliak', raHours: ra(18, 50, 5), decDeg: dec(33, 22), magnitude: 3.52 },
];

/** Sternbildfiguren als Linien zwischen Sternen (Namen wie oben) */
export const CONSTELLATION_LINES: ReadonlyArray<readonly [string, string]> = [
  // Großer Wagen
  ['Dubhe', 'Merak'], ['Merak', 'Phekda'], ['Phekda', 'Megrez'], ['Megrez', 'Dubhe'],
  ['Megrez', 'Alioth'], ['Alioth', 'Mizar'], ['Mizar', 'Alkaid'],
  // Kassiopeia
  ['Caph', 'Schedar'], ['Schedar', 'Navi'], ['Navi', 'Ruchbah'], ['Ruchbah', 'Segin'],
  // Orion
  ['Beteigeuze', 'Bellatrix'], ['Beteigeuze', 'Alnitak'], ['Bellatrix', 'Mintaka'],
  ['Mintaka', 'Alnilam'], ['Alnilam', 'Alnitak'], ['Alnitak', 'Saiph'], ['Mintaka', 'Rigel'],
  // Schwan
  ['Deneb', 'Sadr'], ['Sadr', 'Albireo'], ['Delta Cygni', 'Sadr'], ['Sadr', 'Gienah'],
  // Leier
  ['Wega', 'Sheliak'], ['Sheliak', 'Sulafat'], ['Sulafat', 'Wega'],
  // Pegasus-Quadrat + Andromeda
  ['Alpheratz', 'Scheat'], ['Scheat', 'Markab'], ['Markab', 'Algenib'], ['Algenib', 'Alpheratz'],
  ['Alpheratz', 'Mirach'], ['Mirach', 'Almach'],
  // Zwillinge
  ['Kastor', 'Pollux'],
  // Löwe (Teil)
  ['Regulus', 'Algieba'], ['Algieba', 'Denebola'], ['Denebola', 'Regulus'],
  // Kreuz des Südens (Längsbalken)
  ['Acrux', 'Gacrux'],
];
