// ==========================================
// MODELO DE API: Datos que recibimos de WorldCupAPI
// ==========================================

/** Un partido individual en el camino del equipo */
export interface JourneyMatchApiItem {
  stage: string;           // Ej: "GROUP_STAGE", "QUARTER_FINALS", "SEMI_FINALS", "FINAL"
  matchCode: string;       // Ej: "C-M2", "QF-2"
  opponentTeamId: string;  // Ej: "sco", "uru"
  opponentTeamName: string;// Ej: "Scotland", "Uruguay"
  goalsFor: number;        // Goles a favor
  goalsAgainst: number;    // Goles en contra
  result: 'WIN' | 'LOSS' | 'DRAW';  // Resultado del partido
  resolution: string;      // Ej: "REGULAR_TIME", "PENALTIES"
  isPending: boolean;      // true si el partido no se ha jugado aún
}

/** Respuesta completa del endpoint de journey */
export interface JourneyApiResponse {
  worldCupId: string;        // ID del mundial actual
  teamId: string;            // ID del equipo consultado
  teamName: string;          // Nombre del equipo
  lang: string;              // Idioma de la respuesta
  worldCupStatus: string;    // Estado del mundial (ej: "READY_FOR_FINAL", "ENDED")
  stageReached: string;      // Etapa alcanzada (ej: "GROUP_STAGE", "FINAL", "CHAMPION")
  isChampion: boolean;       // true si el equipo fue campeón
  isFinalPending: boolean;   // true si la final aún no se jugó
  eliminatedByTeamId: string | null;    // ID del equipo que lo eliminó
  eliminatedByTeamName: string | null;  // Nombre del equipo que lo eliminó
  summary: string;           // Resumen narrativo en español
  matches: JourneyMatchApiItem[];  // Lista de partidos jugados
}