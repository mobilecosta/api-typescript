import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AcaoRepository } from './repository/acao.repository';
import { AcaoController } from './acao.controller';
import { AcaoService } from './acao.service';

@Module({
  imports: [PrismaModule],
  controllers: [AcaoController],
  providers: [AcaoService, AcaoRepository],
  exports: [AcaoService],
})

export class AcaoModule {}
