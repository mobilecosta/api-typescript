import { acesso_acao_tela} from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AcaoTelaInterface } from './acao-tela.interface';

@Injectable()
export class AcaoTelaRepository implements AcaoTelaInterface {
  constructor(private readonly prisma: PrismaService) {
  }
  async carregarPorTelaEAcao(idAcao: number, idTela: number): Promise<acesso_acao_tela> {
    return await this.prisma.acesso_acao_tela.findFirst({
      where: {
        id_acao: idAcao,
        id_tela: idTela
      },
    })

  }


}
