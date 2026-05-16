import { HttpStatus, Injectable } from '@nestjs/common';
import { AdminService } from '../../admin/admin.service';
import { AbstractBaseService } from '../../basic/abstract-base.service';
import { ApiErrorMappingRule, ApiErrorStatusMap, ErrorUtils } from '../../basic/error/error.utils';
import { WorldCupCoreErrorCode } from '../../basic/model/world-cup-core-error-code.enum';
import { WorldCupFeatureApiService } from '../../basic/world-cup-feature-api.service';
import { JourneyApiResponse } from './model/journey-api.interface';
import {
  JourneyMatchViewModel,
  JourneyScreenModel,
} from './model/journey-view-model';

// ==========================================
// MAPAS DE ERROR: Qué hacer cuando la API falla
// ==========================================

const JOURNEY_API_ERROR_STATUS_MAP: ApiErrorStatusMap = {
  [HttpStatus.NOT_FOUND]: {
    messageCode: WorldCupCoreErrorCode.WC_JOURNEY_UNAVAILABLE,
    message: 'Journey data for the selected team was not found.',
  },
  [HttpStatus.CONFLICT]: {
    messageCode: WorldCupCoreErrorCode.WC_JOURNEY_UNAVAILABLE,
    message: 'Journey is not available right now. Try again in a moment.',
  },
};

const JOURNEY_API_ERROR_FALLBACK: ApiErrorMappingRule = {
  messageCode: WorldCupCoreErrorCode.WC_JOURNEY_UNAVAILABLE,
  message: 'Unable to load journey from World Cup API.',
  statusCode: HttpStatus.BAD_GATEWAY,
};

// ==========================================
// SERVICIO: Lógica de negocio de Camino del Equipo
// ==========================================

@Injectable()
export class JourneyService extends AbstractBaseService {
  /** Handles team journey business flow for World Cup section. */
  constructor(
    private readonly worldCupFeatureApiService: WorldCupFeatureApiService,
    adminService: AdminService,
  ) {
    super(adminService);
  }

  /** Returns the full world cup journey for the currently selected team. */
  public async getJourney(lang?: string): Promise<JourneyScreenModel> {
    try {
      // 1. Obtener el ID del equipo y el idioma
      const teamId = this.getCurrentTeamId();
      const resolvedLang = this.resolveLang(lang);

      // 2. Llamar a la API para obtener los datos crudos
      const apiResponse: JourneyApiResponse =
        await this.worldCupFeatureApiService.getTeamJourney(teamId, resolvedLang);

      // 3. Transformar los datos de API a modelo de vista
      const matches: JourneyMatchViewModel[] = apiResponse.matches.map(
        (match) => new JourneyMatchViewModel(match),
      );

      // 4. Construir y retornar el modelo de pantalla completo
      return new JourneyScreenModel({
        teamId: apiResponse.teamId,
        teamName: apiResponse.teamName,
        worldCupId: apiResponse.worldCupId,
        worldCupStatus: apiResponse.worldCupStatus,
        stageReached: apiResponse.stageReached,
        isChampion: apiResponse.isChampion,
        isFinalPending: apiResponse.isFinalPending,
        summary: apiResponse.summary,
        eliminatedByTeamName: apiResponse.eliminatedByTeamName,
        matches,
      });
    } catch (error) {
      // 5. Si algo falla, manejar el error con los mapas definidos
      ErrorUtils.mapWorldCupApiError(
        error,
        JOURNEY_API_ERROR_STATUS_MAP,
        JOURNEY_API_ERROR_FALLBACK,
      );
    }
  }
}