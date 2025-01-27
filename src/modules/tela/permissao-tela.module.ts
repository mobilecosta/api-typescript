import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { HintTelaModule } from '../hint-tela/hint-tela.module';
import { PermissaoTelaService } from './permissao-tela.service';
import { PermissaoTelaController } from './permissao-tela.controller';
import { PermissaoTelaRepository } from './repository/permissao-tela.repository';

@Module({
  imports: [PrismaModule, RedisModule, HintTelaModule],
  controllers: [PermissaoTelaController],
  providers: [PermissaoTelaService, PermissaoTelaRepository],
  exports: [PermissaoTelaService],
})
export class PermissaoTelaModule {}
