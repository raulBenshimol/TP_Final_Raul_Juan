// ==========================================
// MODELO DE API: Datos que recibimos de WorldCupAPI
// Endpoints:
//   GET /world-cup/current/stats
//   GET /world-cup/current/awards?lang=es
// ==========================================

/** Estadísticas agregadas del torneo */
export interface TournamentStatsApiResponse {
  totalMatches: number;
  totalGoals: number;
  averageGoalsPerMatch: number;
  totalYellowCards: number;
  totalRedCards: number;
}

/** Un equipo en el podio */
export interface PodiumTeamApiItem {
  teamId: string;
  teamName: string;
  position: 'CHAMPION' | 'RUNNER_UP' | 'THIRD_PLACE';
}

/** Un jugador en el top de goleadores/asistentes */
export interface TopPlayerApiItem {
  playerName: string;
  teamId: string;
  teamName: string;
  goals?: number;
  assists?: number;
}

/** Un premio individual */
export interface AwardApiItem {
  awardName: string;
  playerName: string;
  teamId: string;
  teamName: string;
  reason: string;
}

/** Respuesta completa del endpoint de stats */
export interface StatsApiResponse {
  worldCupId: string;
  stats: TournamentStatsApiResponse;
  podium: PodiumTeamApiItem[];
  topScorers: TopPlayerApiItem[];
  topAssisters: TopPlayerApiItem[];
}

/** Respuesta completa del endpoint de awards */
export interface AwardsApiResponse {
  worldCupId: string;
  awards: AwardApiItem[];
}