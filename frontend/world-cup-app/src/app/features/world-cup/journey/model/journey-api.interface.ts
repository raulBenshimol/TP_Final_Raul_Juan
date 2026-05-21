export interface JourneyMatchApiItem {
  stage: string;
  matchCode: string;
  opponentTeamId: string;
  opponentTeamName: string;
  goalsFor: number | null;
  goalsAgainst: number | null;
  score: string;
  result: string;
  resultClass: string;
  resolution: string;
  isPending: boolean;
}

export interface JourneyApiResponse {
  worldCupId: string;
  teamId: string;
  teamName: string;
  worldCupStatus: string;
  stageReached: string;
  isChampion: boolean;
  isFinalPending: boolean;
  summary: string;
  totalMatches: number;
  eliminatedBy: string | null;
  matches: JourneyMatchApiItem[];
}