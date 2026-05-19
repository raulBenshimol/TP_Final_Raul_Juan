import { HttpStatus, Injectable } from '@nestjs/common';
import { AdminService } from '../../admin/admin.service';
import { AbstractBaseService } from '../../basic/abstract-base.service';
import { ApiErrorMappingRule, ApiErrorStatusMap, ErrorUtils } from '../../basic/error/error.utils';
import { WorldCupCoreErrorCode } from '../../basic/model/world-cup-core-error-code.enum';
import { WorldCupFeatureApiService } from '../../basic/world-cup-feature-api.service';
import { StatsApiResponse, AwardsApiResponse } from './model/stats-awards-api.interface';
import {
  TournamentStatsViewModel,
  PodiumTeamViewModel,
  TopPlayerViewModel,
  AwardViewModel,
  StatsAwardsScreenModel,
} from './model/stats-awards-view-model';

// ==========================================
// MAPAS DE ERROR
// ==========================================

const STATS_AWARDS_API_ERROR_STATUS_MAP: ApiErrorStatusMap = {
  [HttpStatus.NOT_FOUND]: {
    messageCode: WorldCupCoreErrorCode.WC_SIMULATION_FETCH_FAILED,
    message: 'Stats and awards data was not found.',
  },
  [HttpStatus.CONFLICT]: {
    messageCode: WorldCupCoreErrorCode.WC_SIMULATION_UNAVAILABLE,
    message: 'Stats and awards are not available. The world cup may not be finished yet.',
  },
};

const STATS_AWARDS_API_ERROR_FALLBACK: ApiErrorMappingRule = {
  messageCode: WorldCupCoreErrorCode.WC_SIMULATION_FETCH_FAILED,
  message: 'Unable to load stats and awards from World Cup API.',
  statusCode: HttpStatus.BAD_GATEWAY,
};

// ==========================================
// SERVICIO
// ==========================================

@Injectable()
export class StatsAwardsService extends AbstractBaseService {
  
  constructor(
    private readonly worldCupFeatureApiService: WorldCupFeatureApiService,
    adminService: AdminService,
  ) {
    super(adminService);
  }

  /** Returns aggregated tournament stats and individual awards. */
  public async getStatsAndAwards(lang?: string): Promise<StatsAwardsScreenModel> {
    try {
      const resolvedLang = this.resolveLang(lang);

      // Llamar a ambos endpoints en paralelo
      const [statsResponse, awardsResponse]: [StatsApiResponse, AwardsApiResponse] =
        await Promise.all([
          this.worldCupFeatureApiService.getCurrentWorldCupStats(resolvedLang),
          this.worldCupFeatureApiService.getCurrentWorldCupAwards(resolvedLang),
        ]);

      // Transformar estadísticas
      const stats = new TournamentStatsViewModel(statsResponse.stats);

      // Transformar podio
      const podium = statsResponse.podium.map(
        (team) => new PodiumTeamViewModel(team),
      );

      // Transformar goleadores
      const topScorers = statsResponse.topScorers.map(
        (player) =>
          new TopPlayerViewModel({
            playerName: player.playerName,
            teamName: player.teamName,
            statLabel: 'Goles',
            statValue: player.goals || 0,
          }),
      );

      // Transformar asistentes
      const topAssisters = statsResponse.topAssisters.map(
        (player) =>
          new TopPlayerViewModel({
            playerName: player.playerName,
            teamName: player.teamName,
            statLabel: 'Asistencias',
            statValue: player.assists || 0,
          }),
      );

      // Transformar premios
      const awards = awardsResponse.awards.map(
        (award) => new AwardViewModel(award),
      );

      // Construir modelo de pantalla
      return new StatsAwardsScreenModel({
        worldCupId: statsResponse.worldCupId,
        stats,
        podium,
        topScorers,
        topAssisters,
        awards,
      });
    } catch (error) {
      ErrorUtils.mapWorldCupApiError(
        error,
        STATS_AWARDS_API_ERROR_STATUS_MAP,
        STATS_AWARDS_API_ERROR_FALLBACK,
      );
    }
  }
}