import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsuarioRepository } from './repository/usuario.repository';
import { AcaoPerfilModule } from '../acao-perfil/acao-perfil.module';
import { PermissaoTelaModule } from '../tela/permissao-tela.module';
import { UsuarioController } from './usuario.controller';
import { MenuModule } from '../menu/menu.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    PrismaModule,
    PermissaoTelaModule,
    AcaoPerfilModule,
    MenuModule,
    RedisModule
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
  exports: [UsuarioService],
})
export class UsuarioModule {}
