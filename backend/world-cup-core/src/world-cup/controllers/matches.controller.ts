import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery,ApiOperation, ApiResponse} from '@nestjs/swagger';
import { MatchesService } from '../services/matches.service';

@ApiTags('world-cup')
@Controller('world-cup')
export class MatchesController {
  //constructor(private readonly matchesService: MatchesService) {}
 // @Get('matches')
  // TODO: Se debe implementar el controlador y el servicio correspondiente.
}
