// ==========================================
// MODELO DE VISTA: Datos procesados para el frontend
// ==========================================

/** Traducción de posiciones del podio */
const PODIUM_LABELS: Record<string, string> = {
  CHAMPION: 'CAMPEÓN',
  RUNNER_UP: 'SUBCAMPEÓN',
  THIRD_PLACE: 'TERCER PUESTO',
};

/** Medallas del podio */
const PODIUM_MEDALS: Record<string, string> = {
  CHAMPION: '🥇',
  RUNNER_UP: '🥈',
  THIRD_PLACE: '🥉',
};

/** Estadísticas del torneo procesadas */
export class TournamentStatsViewModel {
  public totalMatches: number;
  public totalGoals: number;
  public averageGoalsPerMatch: string;
  public totalYellowCards: number;
  public totalRedCards: number;

  constructor(data: {
    totalMatches: number;
    totalGoals: number;
    averageGoalsPerMatch: number;
    totalYellowCards: number;
    totalRedCards: number;
  }) {
    this.totalMatches = data.totalMatches;
    this.totalGoals = data.totalGoals;
    this.averageGoalsPerMatch = data.averageGoalsPerMatch.toFixed(2);
    this.totalYellowCards = data.totalYellowCards;
    this.totalRedCards = data.totalRedCards;
  }
}

/** Un equipo en el podio procesado */
export class PodiumTeamViewModel {
  public teamId: string;
  public teamName: string;
  public position: string;
  public medal: string;

  constructor(data: {
    teamId: string;
    teamName: string;
    position: string;
  }) {
    this.teamId = data.teamId;
    this.teamName = data.teamName;
    this.position = PODIUM_LABELS[data.position] || data.position;
    this.medal = PODIUM_MEDALS[data.position] || '';
  }
}

/** Un jugador destacado procesado */
export class TopPlayerViewModel {
  public playerName: string;
  public teamName: string;
  public statLabel: string;
  public statValue: number;

  constructor(data: {
    playerName: string;
    teamName: string;
    statLabel: string;
    statValue: number;
  }) {
    this.playerName = data.playerName;
    this.teamName = data.teamName;
    this.statLabel = data.statLabel;
    this.statValue = data.statValue;
  }
}

/** Un premio individual procesado */
export class AwardViewModel {
  public awardName: string;
  public playerName: string;
  public teamName: string;
  public reason: string;

  constructor(data: {
    awardName: string;
    playerName: string;
    teamName: string;
    reason: string;
  }) {
    this.awardName = data.awardName;
    this.playerName = data.playerName;
    this.teamName = data.teamName;
    this.reason = data.reason;
  }
}

/** Modelo completo de la pantalla Estadísticas y Premios */
export class StatsAwardsScreenModel {
  public worldCupId: string;
  public stats: TournamentStatsViewModel;
  public podium: PodiumTeamViewModel[];
  public topScorers: TopPlayerViewModel[];
  public topAssisters: TopPlayerViewModel[];
  public awards: AwardViewModel[];

  constructor(data: {
    worldCupId: string;
    stats: TournamentStatsViewModel;
    podium: PodiumTeamViewModel[];
    topScorers: TopPlayerViewModel[];
    topAssisters: TopPlayerViewModel[];
    awards: AwardViewModel[];
  }) {
    this.worldCupId = data.worldCupId;
    this.stats = data.stats;
    this.podium = data.podium;
    this.topScorers = data.topScorers;
    this.topAssisters = data.topAssisters;
    this.awards = data.awards;
  }
}