import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AcaoPerfilService } from './acao-perfil.service';
import { AcaoPerfilRepository } from './repository/acao-perfil.repository';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [AcaoPerfilService, AcaoPerfilRepository],
  exports: [AcaoPerfilService],
})
export class AcaoPerfilModule {}
