import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AcaoService } from './acao.service';
import { acesso_acao } from '@prisma/client';

@Controller('acao')
@ApiTags('acao')
export class AcaoController {
  constructor(private readonly acaoService: AcaoService) {}

  @Get('listar-gerais')
  async listarAcoesGerais(): Promise<acesso_acao[]> {
    return this.acaoService.listarAcoesGerais()
  }

}
