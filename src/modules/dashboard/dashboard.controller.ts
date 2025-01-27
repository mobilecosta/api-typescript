import { Controller, Get, Query, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('dashboard')
@ApiTags('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async findAll(@Request() req, @Query() query) {
    const usuarioId = req['usuarioId'];
    return {
      dash: await this.dashboardService.findAll()
    }
  }
}
