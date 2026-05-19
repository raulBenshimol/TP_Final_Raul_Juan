import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatsAwardsService } from '../services/stats-awards.service';
import { StatsAwardsScreenModel } from '../services/model/stats-awards-view-model';


@ApiTags('world-cup')
@Controller('world-cup')
export class StatsAwardsController {
  constructor(private readonly statsAwardsService: StatsAwardsService) {}

  @Get('stats-awards')
  @ApiOperation({ summary: 'Get the stats and awards for the current world cup' })
  @ApiQuery({ name: 'lang', required: false, description: 'Response language (es, en)' }) 
  @ApiResponse({ status: 200, description: 'Stats and awards data' })
  @ApiResponse({ status: 502, description: 'World Cup API unavailable' })
  async getStatsAwards(@Query('lang') lang?: string): Promise<StatsAwardsScreenModel> {
    return this.statsAwardsService.getStatsAndAwards(lang);
  }
  // TODO: Se debe implementar el controlador y el servicio correspondiente.
}
