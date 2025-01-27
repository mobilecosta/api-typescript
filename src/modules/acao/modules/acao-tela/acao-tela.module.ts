import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AcaoTelaService } from './acao-tela.service';
import { AcaoTelaRepository } from './repository/acao-tela.repository';


@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [AcaoTelaService, AcaoTelaRepository],
  exports: [AcaoTelaService, AcaoTelaRepository],
})

export class AcaoTelaModule {}
