// ==========================================
// MODELO DE VISTA: Camino del Equipo
// Sigue el mismo patrón que TeamHistory
// ==========================================

/** Traducción de resultados a español (constante privada) */
const RESULT_LABELS: Record<string, string> = {
  WIN: 'VICTORIA',
  LOSS: 'DERROTA',
  DRAW: 'EMPATE',
};

/** Un partido procesado listo para mostrar en el timeline */
export class JourneyMatchViewModel {
  public stage: string;
  public matchCode: string;
  public opponentTeamId: string;
  public opponentTeamName: string;
  public goalsFor: number;
  public goalsAgainst: number;
  public score: string;
  public result: string;
  public resultClass: string;
  public resolution: string;
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
    this.matchCode = match.matchCode;
    this.opponentTeamId = match.opponentTeamId;
    this.opponentTeamName = match.opponentTeamName;
    this.goalsFor = match.goalsFor;
    this.goalsAgainst = match.goalsAgainst;
    this.score = match.isPending
      ? 'Pendiente'
      : `${match.goalsFor} - ${match.goalsAgainst}`;
    this.result = RESULT_LABELS[match.result] || match.result;
    this.resultClass = match.result.toLowerCase();
    this.resolution = match.resolution;
    this.isPending = match.isPending;
  }
}

/** Modelo completo de la pantalla Camino del Equipo */
export class JourneyScreenModel {
  public teamId: string;
  public teamName: string;
  public worldCupId: string;
  public worldCupStatus: string;
  public stageReached: string;
  public isChampion: boolean;
  public isFinalPending: boolean;
  public summary: string;
  public totalMatches: number;
  public eliminatedBy: string | null;
  public matches: JourneyMatchViewModel[];

  constructor(data: {
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
    this.teamId = data.teamId;
    this.teamName = data.teamName;
    this.worldCupId = data.worldCupId;
    this.worldCupStatus = data.worldCupStatus;
    this.stageReached = data.stageReached;
    this.isChampion = data.isChampion;
    this.isFinalPending = data.isFinalPending;
    this.summary = data.summary;
    this.totalMatches = data.matches.length;
    this.eliminatedBy = data.eliminatedByTeamName
      ? `Eliminado por: ${data.eliminatedByTeamName}`
      : null;
    this.matches = data.matches;
  }
}