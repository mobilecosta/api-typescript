import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissaoGuardService } from './permissao.guard.service';

@Injectable()
export class PermissaoGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly permissaoGuardService: PermissaoGuardService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const handler = context.getHandler();
    const api = this.reflector.get<{ idTela: number, idAcao: number }>('permissaoCRM', handler);
    const externo = req['externo'];
    const id_usuario = req['usuarioId'];

    if (externo === false) {
      return true;
    }

    if (api) {

      //Carrega a Ação Específica da Tela em Questão
      const acaoTela = await this.permissaoGuardService.carregarAcaoTela(api.idTela, api.idAcao);

      //Busca se algum dos Perfis possui aquela permissao
      const possuiPermissao = await this.permissaoGuardService.carregarPermissao(id_usuario, acaoTela.id_acao_tela,);

      if (possuiPermissao === null || possuiPermissao.length < 1) {
        throw new BadRequestException('O Usuário não tem acesso para a Ação Selecionada');
      }

    }

    return true;
  }
}
