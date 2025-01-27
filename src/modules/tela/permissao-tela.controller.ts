import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/constantes';
import { PermissaoTelaService } from './permissao-tela.service';

@Controller('permissoes')
@ApiTags('permissoes')
export class PermissaoTelaController {
  constructor(private readonly permissaoTelaService: PermissaoTelaService) { }

  @Get('listar-permissoes/:idTela')
  async listarPermissoes(@Param('idTela') idTela: string, @Req() req) {
    const usuarioId = req['usuarioId'];

    return await this.permissaoTelaService.listarPermissoes(usuarioId, +idTela);
  }

  @Get('info/:idTela')
  async pergarTela(@Param('idTela') idTela: string, @Req() req) {
    return await this.permissaoTelaService.pegarTela(+idTela);
  }


  @Get('acesso-tela/:idTela')
  async listarPermissaoAcessarTela(
    @Param('idTela') idTela: string,
    @Req() req,
  ) {
    const usuarioId = req['usuarioId'];

    return await this.permissaoTelaService.possuiAcesso(usuarioId, +idTela);
  }
}
