import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AcaoPerfilModule } from './modules/acao-perfil/acao-perfil.module';
import { RedisModule } from './modules/redis/redis.module';
import { HintTelaModule } from './modules/hint-tela/hint-tela.module';
import { PermissaoTelaModule } from './modules/tela/permissao-tela.module';
import { MenuModule } from './modules/menu/menu.module';
import { PessoaModule } from './modules/pessoa/pessoa.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsuarioModule,
    PermissaoTelaModule,
    AcaoPerfilModule,
    MenuModule,
    RedisModule,
    HintTelaModule,
    PessoaModule,
    DashboardModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
