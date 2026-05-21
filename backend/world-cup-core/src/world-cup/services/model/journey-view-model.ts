// ==========================================
// MODELO DE VISTA: Camino del Equipo
// ==========================================

const RESULT_LABELS: Record<string, string> = {
  WIN: 'VICTORIA',
  LOSS: 'DERROTA',
  DRAW: 'EMPATE',
};

const STAGE_LABELS: Record<string, string> = {
  GROUP_STAGE: 'Fase de grupos',
  ROUND_OF_32: 'Dieciseisavos',
  ROUND_OF_16: 'Octavos',
  QUARTER_FINALS: 'Cuartos',
  SEMI_FINALS: 'Semifinal',
  THIRD_PLACE: 'Tercer puesto',
  FINAL: 'Final',
};

const RESOLUTION_LABELS: Record<string, string> = {
  REGULAR_TIME: 'Tiempo regular',
  EXTRA_TIME: 'Prórroga',
  PENALTIES: 'Penales',
};

export class JourneyMatchViewModel {
  public stage: string;
  public stageLabel: string;
  public matchCode: string;
  public opponentTeamId: string;
  public opponentTeamName: string;
  public opponentFlag: string;
  public goalsFor: number;
  public goalsAgainst: number;
  public score: string;
  public scoreLabel: string;
  public result: string;
  public resultLabel: string;
  public resultClass: string;
  public resultStyle: string;
  public resolution: string;
  public resolutionLabel: string;
  public isPending: boolean;

  constructor(match: {
    stage: string;
    matchCode: string;
    opponentTeamId: string;
    opponentTeamName: string;
    goalsFor: number;
    goalsAgainst: number;
    result: string;
    resolution: string;
    isPending: boolean;
  }) {
    this.stage = match.stage;
    this.stageLabel = STAGE_LABELS[match.stage] || match.stage;
    this.matchCode = match.matchCode;
    this.opponentTeamId = match.opponentTeamId;
    this.opponentTeamName = match.opponentTeamName;
    this.opponentFlag = '';
    this.goalsFor = match.goalsFor;
    this.goalsAgainst = match.goalsAgainst;
    this.score = match.isPending
      ? 'Pendiente'
      : `${match.goalsFor} - ${match.goalsAgainst}`;
    this.scoreLabel = this.score;
    this.result = RESULT_LABELS[match.result] || match.result;
    this.resultLabel = this.result;
    this.resultClass = match.result.toLowerCase();
    this.resultStyle = match.isPending ? 'PENDING' : match.result;
    this.resolution = match.resolution;
    this.resolutionLabel = match.isPending
      ? 'Pendiente'
      : RESOLUTION_LABELS[match.resolution] || match.resolution;
    this.isPending = match.isPending;
  }
}

export class JourneyScreenModel {
  public lang: string;
  public teamId: string;
  public teamName: string;
  public worldCupId: string;
  public worldCupStatus: string;
  public stageReached: string;
  public stageReachedLabel: string;
  public isChampion: boolean;
  public isFinalPending: boolean;
  public summary: string;
  public matchesPlayed: number;
  public eliminatedBy: string | null;
  public eliminatedByTeamId: string | null;
  public eliminatedByTeamName: string | null;
  public matches: JourneyMatchViewModel[];

  constructor(data: {
    lang?: string;
    teamId: string;
    teamName: string;
    worldCupId: string;
    worldCupStatus: string;
    stageReached: string;
    isChampion: boolean;
    isFinalPending: boolean;
    summary: string;
    eliminatedByTeamName: string | null;
    matches: JourneyMatchViewModel[];
  }) {
    this.lang = data.lang || 'es';
    this.teamId = data.teamId;
    this.teamName = data.teamName;
    this.worldCupId = data.worldCupId;
    this.worldCupStatus = data.worldCupStatus;
    this.stageReached = data.stageReached;
    this.stageReachedLabel = STAGE_LABELS[data.stageReached] || data.stageReached;
    this.isChampion = data.isChampion;
    this.isFinalPending = data.isFinalPending;
    this.summary = data.summary;
    this.matchesPlayed = data.matches.length;
    this.eliminatedBy = data.eliminatedByTeamName
      ? `Eliminado por: ${data.eliminatedByTeamName}`
      : null;
    this.eliminatedByTeamId = null;
    this.eliminatedByTeamName = data.eliminatedByTeamName;
    this.matches = data.matches;
  }
}