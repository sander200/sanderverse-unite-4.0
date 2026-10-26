/** Sanderverse Unite — planta métrica. Una sola fuente para documento, hitboxes y blueprint. */

export type Pt = { x: number; z: number };

export const SPEED = 4.5;
export const WATER_MULT = 0.85;
export const CAPSULE_R = 0.45;
export const CAPSULE_H = 1.6;
export const FEET_TOL = 0.15;
export const SKILL_W = 1.4;
export const TELEGRAPH_MIN = 0.32;
export const MID_HALF = 5;
export const SIDE_HALF = 4.5;
export const PIT_R = 11;
export const ARCO_R = 3.2;
export const NEXO_R = 4.6;
export const BRUSH_S = 6;
export const SHRINE_R = 1.6;
export const PILLAR_R = 0.8;
export const SHRINE_GAP = 1.5;
export const AGENT_SLOPE = 28;
export const AGENT_CLIMB = 0.3;
export const CELL = 0.15;

export const NEXO_S: Pt = { x: 0, z: -50 };
export const NEXO_N: Pt = { x: 0, z: 50 };

export const WEST: Pt[] = [
  { x: 0, z: -50 },
  { x: -16, z: -26 },
  { x: -22, z: -10 },
  { x: -22, z: 10 },
  { x: -16, z: 26 },
  { x: 0, z: 50 },
];

export const EAST: Pt[] = WEST.map((p) => ({ x: -p.x, z: p.z }));

export const MID: Pt[] = [NEXO_S, NEXO_N];

export const WATERS = [
  { cx: -14, cz: 0, rx: 6, rz: 14 },
  { cx: 14, cz: 0, rx: 6, rz: 14 },
];

export const PILLARS: Pt[] = [
  { x: 7.2, z: 2.2 },
  { x: -7.2, z: -2.2 },
];

export type BrushId =
  | "mat-o-alto"
  | "mat-o-med"
  | "mat-o-bajo"
  | "mat-e-alto"
  | "mat-e-med"
  | "mat-e-bajo";

export type ShrineId = "pulso-o" | "aliento-e" | "aliento-o" | "pulso-e";

export type Brush = { id: BrushId; name: string; x: number; z: number };
export type Shrine = {
  id: ShrineId;
  name: string;
  kind: "pulso" | "aliento";
  x: number;
  z: number;
  pair: BrushId;
};

export const BRUSHES: Brush[] = [
  { id: "mat-o-alto", name: "Mat O-Alto", x: -30, z: 34 },
  { id: "mat-o-med", name: "Mat O-Med", x: -34, z: 0 },
  { id: "mat-o-bajo", name: "Mat O-Bajo", x: -30, z: -34 },
  { id: "mat-e-alto", name: "Mat E-Alto", x: 30, z: 34 },
  { id: "mat-e-med", name: "Mat E-Med", x: 34, z: 0 },
  { id: "mat-e-bajo", name: "Mat E-Bajo", x: 30, z: -34 },
];

export const SHRINES: Shrine[] = [
  { id: "pulso-o", name: "Pulso Oeste", kind: "pulso", x: -23.2, z: 36, pair: "mat-o-alto" },
  { id: "aliento-e", name: "Aliento Este", kind: "aliento", x: 23.2, z: 36, pair: "mat-e-alto" },
  { id: "aliento-o", name: "Aliento Oeste", kind: "aliento", x: -23.2, z: -36, pair: "mat-o-bajo" },
  { id: "pulso-e", name: "Pulso Este", kind: "pulso", x: 23.2, z: -36, pair: "mat-e-bajo" },
];

export const ARCOS = [
  { id: "arco-no", name: "Arco NO", team: "norte" as const, x: -16, z: 26 },
  { id: "arco-ne", name: "Arco NE", team: "norte" as const, x: 16, z: 26 },
  { id: "arco-so", name: "Arco SO", team: "sur" as const, x: -16, z: -26 },
  { id: "arco-se", name: "Arco SE", team: "sur" as const, x: 16, z: -26 },
];

export function dist(a: Pt, b: Pt) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

export function inWater(p: Pt) {
  return WATERS.some((w) => {
    const nx = (p.x - w.cx) / w.rx;
    const nz = (p.z - w.cz) / w.rz;
    return nx * nx + nz * nz <= 1;
  });
}

export function travel(pts: Pt[]) {
  let meters = 0;
  let water = 0;
  const steps = 12;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const seg = dist(a, b);
    meters += seg;
    for (let s = 0; s < steps; s++) {
      const t = (s + 0.5) / steps;
      const p = { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t };
      if (inWater(p)) water += seg / steps;
    }
  }
  const dry = meters - water;
  const seconds = dry / SPEED + water / (SPEED * WATER_MULT);
  return { meters, water, seconds };
}

/** Cinta caminable alrededor de una centerline. Mitad izquierda, luego derecha invertida. */
export function ribbon(pts: Pt[], half: number): Pt[] {
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < pts.length; i++) {
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];
    const dx = next.x - prev.x;
    const dz = next.z - prev.z;
    const len = Math.hypot(dx, dz) || 1;
    const nx = -dz / len;
    const nz = dx / len;
    left.push({ x: pts[i].x + nx * half, z: pts[i].z + nz * half });
    right.push({ x: pts[i].x - nx * half, z: pts[i].z - nz * half });
  }
  return [...left, ...right.reverse()];
}

function distPointSeg(p: Pt, a: Pt, b: Pt) {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const l2 = dx * dx + dz * dz || 1;
  let t = ((p.x - a.x) * dx + (p.z - a.z) * dz) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + dx * t), p.z - (a.z + dz * t));
}

function brushClearsLane(brush: Brush, lane: Pt[], half: number) {
  const h = BRUSH_S / 2;
  const samples: Pt[] = [];
  for (const sx of [-1, 0, 1]) {
    for (const sz of [-1, 0, 1]) {
      samples.push({ x: brush.x + sx * h, z: brush.z + sz * h });
    }
  }
  for (const p of samples) {
    for (let i = 1; i < lane.length; i++) {
      if (distPointSeg(p, lane[i - 1], lane[i]) < half - 0.05) return false;
    }
  }
  return true;
}

function shrineGap(shrine: Shrine) {
  const brush = BRUSHES.find((b) => b.id === shrine.pair);
  if (!brush) return 0;
  const h = BRUSH_S / 2;
  const dx = Math.abs(shrine.x - brush.x) - h;
  const dz = Math.abs(shrine.z - brush.z) - h;
  let outside = 0;
  if (dx > 0) outside += dx * dx;
  if (dz > 0) outside += dz * dz;
  if (dx <= 0 && dz <= 0) return Math.max(dx, dz) - SHRINE_R;
  return Math.sqrt(outside) - SHRINE_R;
}

const sidestep = CAPSULE_R + SKILL_W / 2;
const sidestepTime = sidestep / SPEED;

export const ROUTES = {
  mid: { id: "mid", name: "Mid seco", pts: MID },
  oeste: { id: "oeste", name: "Lateral oeste", pts: WEST },
  este: { id: "este", name: "Lateral este", pts: EAST },
  corte: {
    id: "corte",
    name: "Corte Arco SO → foso",
    pts: [ARCOS[2], { x: 0, z: 0 }] as Pt[],
  },
  vado: {
    id: "vado",
    name: "Arco SE → foso por vado",
    pts: [ARCOS[3], { x: 14, z: -6 }, { x: 0, z: 0 }] as Pt[],
  },
};

export type Verdict = {
  id: string;
  name: string;
  measured: string;
  limit: string;
  pass: boolean;
  detail: string;
};

function m(n: number) {
  const digits = Math.abs(n) < 10 && !Number.isInteger(n) ? 2 : 1;
  return `${n.toFixed(digits).replace(".", ",")} m`;
}
function s(n: number) {
  return `${n.toFixed(2).replace(".", ",")} s`;
}
function pct(n: number) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(1).replace(".", ",")}%`;
}

export function buildVerdicts(): Verdict[] {
  const mid = travel(MID);
  const west = travel(WEST);
  const east = travel(EAST);
  const cut = travel(ROUTES.corte.pts);
  const ford = travel(ROUTES.vado.pts);
  const sideDelta = ((west.meters - mid.meters) / mid.meters) * 100;
  const mirror = (Math.abs(west.meters - east.meters) / west.meters) * 100;
  const gaps = SHRINES.map((sh) => shrineGap(sh));
  const minGap = Math.min(...gaps);
  const brushesOk = BRUSHES.every((b) => {
    const lane = b.x < 0 ? WEST : EAST;
    return brushClearsLane(b, lane, b.x < 0 ? SIDE_HALF : SIDE_HALF);
  });
  const laneBodies = Math.floor((MID_HALF * 2) / (CAPSULE_R * 2));

  return [
    {
      id: "mid-time",
      name: "Mid nexo a nexo",
      measured: `${m(mid.meters)} · ${s(mid.seconds)}`,
      limit: "21–23 s a 4,5 m/s",
      pass: mid.seconds >= 21 && mid.seconds <= 23,
      detail: "La espina seca es la autopista. Si se alarga, el lateral deja de ser la opción lenta.",
    },
    {
      id: "side-delta",
      name: "Lateral contra mid",
      measured: `${m(west.meters)} · ${pct(sideDelta)}`,
      limit: "+8% a +14%",
      pass: sideDelta >= 8 && sideDelta <= 14,
      detail: "El lateral existe para el duelo y el brush, no para llegar antes que el mid.",
    },
    {
      id: "mirror",
      name: "Simetría este / oeste",
      measured: `Δ ${mirror.toFixed(1).replace(".", ",")} %`,
      limit: "Δ < 2%",
      pass: mirror < 2,
      detail: "Este es el espejo exacto de oeste. La asimetría solo entra por el reloj, nunca por el metro.",
    },
    {
      id: "rotate",
      name: "Rotación arco → foso",
      measured: `${m(cut.meters)} · ${s(cut.seconds)} · vado ${m(cut.water)}`,
      limit: "≤ 8,00 s",
      pass: cut.seconds <= 8,
      detail:
        "El corte diagonal es legal porque el matorral no desconecta la malla. Cerrar ese suelo rompe la regla.",
    },
    {
      id: "ford-tax",
      name: "Impuesto del vado",
      measured: `${s(ford.seconds)} frente a ${s(cut.seconds)} del corte seco`,
      limit: "El vado es más lento que el corte",
      pass: ford.seconds > cut.seconds + 0.4,
      detail: "Entrar al foso por el agua es castigo, no atajo. El mid y el corte seco siguen siendo mejores.",
    },
    {
      id: "shrine-gap",
      name: "Santuario fuera del brush",
      measured: `hueco mínimo ${m(minGap)}`,
      limit: `≥ ${m(SHRINE_GAP)}`,
      pass: minGap >= SHRINE_GAP - 0.05,
      detail: "El pad del relicario queda abierto. Nadie body-bloquea el buff dentro de la niebla.",
    },
    {
      id: "brush-lane",
      name: "Matorral fuera del carril",
      measured: brushesOk ? "sin solape" : "solapa la cinta",
      limit: "cero intersección con la cinta",
      pass: brushesOk,
      detail: "El brush es adyacente. Si invade la cinta, el carril deja de ser un duelo y pasa a ser un túnel ciego.",
    },
    {
      id: "capsule-lane",
      name: "Cuerpos en el mid",
      measured: `${laneBodies} cápsulas de Ø ${(CAPSULE_R * 2).toFixed(2)} m en ${MID_HALF * 2} m`,
      limit: "≥ 8 de ancho",
      pass: laneBodies >= 8,
      detail: "Holgura real de esquive, no solo ‘el carril se siente ancho’.",
    },
    {
      id: "sidestep",
      name: "Ventana de esquive",
      measured: `${sidestep.toFixed(2)} m · ${s(sidestepTime)}`,
      limit: `telegraph ≥ ${s(TELEGRAPH_MIN)}`,
      pass: TELEGRAPH_MIN >= sidestepTime * 1.2,
      detail:
        "Para salir de un skillshot de 1,4 m hay que mover cápsula + mitad del disparo. El viento del ataque dura más que ese paso.",
    },
    {
      id: "feet",
      name: "Pies contra cápsula",
      measured: `tolerancia ${m(FEET_TOL)}`,
      limit: "≤ 0,15 m",
      pass: FEET_TOL <= 0.15,
      detail: "El arte puede volar 0,40 m solo por encima del pecho. El ancla del suelo no miente.",
    },
    {
      id: "slope",
      name: "Rampas, no off-mesh",
      measured: `pendiente máx. ${AGENT_SLOPE}° · climb ${m(AGENT_CLIMB)}`,
      limit: "0 enlaces off-mesh",
      pass: AGENT_SLOPE <= 28 && AGENT_CLIMB <= 0.35,
      detail:
        "La escalera del render es rampa de navmesh. Si QA necesita un jump-link, la escalera está mal construida.",
    },
    {
      id: "cell",
      name: "Celda contra radio",
      measured: `celda ${m(CELL)} · radio ${m(CAPSULE_R)} = ${(CAPSULE_R / CELL).toFixed(0)} celdas`,
      limit: "radio ≥ 3 celdas",
      pass: CAPSULE_R / CELL >= 3 - 0.01,
      detail: "Recast estable: el agente no cabe ‘a medias’ en un voxel y no tiembla en las jambas del foso.",
    },
  ];
}

export const VOLUMES = [
  {
    id: "hurt",
    name: "Cápsula de daño",
    size: "r 0,45 · h 1,60",
    move: "Separación blanda",
    shot: "Bloquea",
    sight: "No",
    rule: "Polo usa la misma cápsula. El mesh del ave es más chico; la hitbox no.",
  },
  {
    id: "arco",
    name: "Arco exterior",
    size: "r 3,20 · alto 0,20",
    move: "No",
    shot: "No",
    sight: "No",
    rule: "Trigger de depósito. Hold 0,8 s. Escudo 30. No es muro.",
  },
  {
    id: "nexo",
    name: "Nexo",
    size: "r 4,60",
    move: "No",
    shot: "No",
    sight: "No",
    rule: "Solo recibe depósito cuando los dos arcos de ese lado están rotos.",
  },
  {
    id: "brush",
    name: "Matorral",
    size: "6 × 6 × 2,40",
    move: "No",
    shot: "No",
    sight: "Sí",
    rule: "Oculta. No recorta la malla. Salir revela al instante.",
  },
  {
    id: "vado",
    name: "Vado",
    size: "elipse 12 × 28",
    move: "×0,85",
    shot: "No",
    sight: "No",
    rule: "Impuesto de velocidad. No es muro y no es cobertura.",
  },
  {
    id: "curb",
    name: "Brocal del foso",
    size: "alto de bloqueo 0,40",
    move: "Sí, salvo rampas",
    shot: "No",
    sight: "No",
    rule: "El borde visual sube a 1,10 m. La cabeza siempre queda por encima.",
  },
  {
    id: "pilar",
    name: "Pilar duro ×2",
    size: "r 0,80",
    move: "Sí",
    shot: "Sí",
    sight: "Sí",
    rule: "Única cobertura real del foso. Fuera del eje del mid para no estrangular la autopista.",
  },
  {
    id: "shrine",
    name: "Relicario",
    size: "r 1,60",
    move: "No",
    shot: "No",
    sight: "No",
    rule: "Pad abierto, a ≥ 1,5 m del brush. Pulso o Aliento al salir, 1,5 s.",
  },
] as const;

export type ZoneId =
  | "nexo-n"
  | "nexo-s"
  | "foso"
  | "mid"
  | "oeste"
  | "este"
  | "vado"
  | (typeof ARCOS)[number]["id"]
  | (typeof BRUSHES)[number]["id"]
  | (typeof SHRINES)[number]["id"]
  | "pilares";

export type ZoneInfo = {
  id: ZoneId;
  name: string;
  metric: string;
  rules: string[];
};

export function zoneInfo(id: ZoneId): ZoneInfo {
  const table: Record<ZoneId, ZoneInfo> = {
    "nexo-n": {
      id,
      name: "Nexo Norte",
      metric: "centro (0, +50) · r 4,6 m · anillo violeta",
      rules: [
        "Gol interior. No se destruye.",
        "Recibe Fragmentos solo con los dos arcos norte rotos.",
        "El ala es marca. El color del anillo es el equipo.",
      ],
    },
    "nexo-s": {
      id,
      name: "Nexo Sur",
      metric: "centro (0, −50) · r 4,6 m · anillo cian",
      rules: [
        "Base inferior de pantalla. Convención de aliado en la práctica.",
        "Misma regla de escudo que el norte. Simetría estricta.",
      ],
    },
    foso: {
      id,
      name: "Foso Némesis Omega",
      metric: "Ø 22 m · cuatro entradas · revelado mientras Omega está vivo",
      rules: [
        "Se gana por posición, no por niebla.",
        "Pulso de visión cada 8 s con el objetivo en pie.",
        "Brocal bloquea paso, no proyectil ni visión.",
        "Solo dos pilares duros, fuera del eje del mid.",
      ],
    },
    mid: {
      id,
      name: "Carril central",
      metric: `ancho ${MID_HALF * 2} m · seco de nexo a nexo`,
      rules: [
        "Sin brush sobre la cinta.",
        "Escaleras del render = rampa ≤ 28°. Cero off-mesh.",
        "Es la rotación corta. El lateral no puede ganarle en metros.",
      ],
    },
    oeste: {
      id,
      name: "Carril oeste",
      metric: `ancho ${SIDE_HALF * 2} m · espejo del este`,
      rules: [
        "Más largo que el mid, dentro del +8% al +14%.",
        "Los matorrales quedan fuera de la cinta.",
        "El suelo entre este carril y el mid es caminable: es el corte de los 8 s.",
      ],
    },
    este: {
      id,
      name: "Carril este",
      metric: `ancho ${SIDE_HALF * 2} m · espejo del oeste`,
      rules: ["Misma longitud que el oeste.", "Misma lógica de brush y de corte."],
    },
    vado: {
      id,
      name: "Vados este y oeste",
      metric: "dos elipses 12 × 28 m · velocidad ×0,85",
      rules: [
        "Castigan la entrada lateral al foso.",
        "No tapan visión ni proyectiles.",
        "El eje norte–sur del mid está seco a propósito.",
      ],
    },
    pilares: {
      id,
      name: "Pilares duros",
      metric: "r 0,80 m · (±7,2 , ±2,2)",
      rules: [
        "Único volumen del foso que bloquea disparo y visión.",
        "No invaden el carril de 10 m.",
      ],
    },
    "arco-no": arco("Arco NO", "norte"),
    "arco-ne": arco("Arco NE", "norte"),
    "arco-so": arco("Arco SO", "sur"),
    "arco-se": arco("Arco SE", "sur"),
    "mat-o-alto": brush("Mat O-Alto"),
    "mat-o-med": brush("Mat O-Med"),
    "mat-o-bajo": brush("Mat O-Bajo"),
    "mat-e-alto": brush("Mat E-Alto"),
    "mat-e-med": brush("Mat E-Med"),
    "mat-e-bajo": brush("Mat E-Bajo"),
    "pulso-o": shrine("Pulso Oeste", "velocidad 1,5 s al salir"),
    "aliento-e": shrine("Aliento Este", "escudo menor al salir"),
    "aliento-o": shrine("Aliento Oeste", "escudo menor al salir"),
    "pulso-e": shrine("Pulso Este", "velocidad 1,5 s al salir"),
  };
  return table[id];
}

function arco(name: string, team: string): ZoneInfo {
  return {
    id: "arco-so",
    name,
    metric: `r ${ARCO_R.toFixed(1)} m · escudo 30 · equipo ${team}`,
    rules: [
      "En partida la pantalla muestra el escudo, no el wordmark.",
      "El básico se convierte en ANOTAR dentro del trigger. No hay botón fijo.",
      "Al romperse, cae la defensa de ese carril.",
    ],
  };
}

function brush(name: string): ZoneInfo {
  return {
    id: "mat-o-alto",
    name,
    metric: "6 × 6 m · alto de visión 2,4 m",
    rules: [
      "Nombre corto de comms. No hay un séptimo matorral decorativo.",
      "No bloquea movimiento ni el navmesh.",
      "Separado de la cinta del carril.",
    ],
  };
}

function shrine(name: string, buff: string): ZoneInfo {
  return {
    id: "pulso-o",
    name,
    metric: `pad r ${SHRINE_R.toFixed(1)} m · ${buff}`,
    rules: [
      "Identidad por icono, nunca por cian o violeta.",
      "Colocado en diagonal para que ningún lateral tenga el camino corto a los dos buffs.",
      "Hueco mínimo de 1,5 m respecto a su matorral.",
    ],
  };
}

export const NAV = {
  cell: CELL,
  tile: 16,
  tiles: "8 × 8 cubren 128 m",
  radius: CAPSULE_R,
  height: 1.8,
  climb: AGENT_CLIMB,
  slope: AGENT_SLOPE,
  edgeError: 0.2,
  neighbors: 8,
  horizon: 1.2,
  neighborDist: 4,
} as const;
