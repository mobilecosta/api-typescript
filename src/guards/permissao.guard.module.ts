import { Global, Module } from '@nestjs/common';
import { PermissaoGuardService } from './permissao.guard.service';
import { PrismaModule } from '../modules/prisma/prisma.module';
import { AcaoTelaModule } from 'src/modules/acao/modules/acao-tela/acao-tela.module';

@Global()
@Module({
  imports: [
    PrismaModule,
    AcaoTelaModule,
  ],
  providers: [PermissaoGuardService],
  exports: [PermissaoGuardService],
})
export class AuthGuardModule {}