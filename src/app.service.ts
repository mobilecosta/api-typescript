import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './modules/prisma/prisma.service';
import { Utilitarios } from './shared/classes/utilitarios';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly prisma: PrismaService) {}

}
