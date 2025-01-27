import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { HintTelaService } from './hint-tela.service';
import { HintTelaRepository } from './repository/hint-tela-repository';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [HintTelaService, HintTelaRepository],
  exports: [HintTelaService],
})
export class HintTelaModule {}
