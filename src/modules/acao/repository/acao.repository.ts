import { acesso_acao } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AcaoInterface } from './acao.interface';

@Injectable()
export class AcaoRepository implements AcaoInterface {
  constructor(private readonly prisma: PrismaService) {
  }

 async listarAcoesGerais(): Promise<acesso_acao[]> {
  return this.prisma.acesso_acao.findMany({
    where: {
      ind_acao_geral: true
    },
  })  }

 
}
