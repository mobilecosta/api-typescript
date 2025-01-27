import { Controller, Get, Headers, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/auth/constantes';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/health')
  getHealth(@Headers() headers?): string {
    this.logger.log(
      `Health check from host: ${headers?.host ?? 'null'}. Referrer: ${
        headers?.referer ?? 'null'
      }`,
    );
    return 'OK';
  }
}
