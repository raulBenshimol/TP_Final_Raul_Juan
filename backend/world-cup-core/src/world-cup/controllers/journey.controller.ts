import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JourneyService } from '../services/journey.service';
import { JourneyScreenModel } from '../services/model/journey-view-model';

@ApiTags('world-cup')
@Controller('world-cup')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}

  @Get('team-journey')
  @ApiOperation({ summary: 'Get the full world cup journey for the configured team' })
  @ApiQuery({ name: 'lang', required: false, description: 'Response language (es, en)' })
  @ApiResponse({ status: 200, description: 'Team journey data' })
  @ApiResponse({ status: 502, description: 'World Cup API unavailable' })
  async getTeamJourney(@Query('lang') lang?: string): Promise<JourneyScreenModel> {
    return this.journeyService.getJourney(lang);
  }
}