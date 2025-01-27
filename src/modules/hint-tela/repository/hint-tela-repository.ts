import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { HintTelaInterface } from './hint-tela-interface';

@Injectable()
export class HintTelaRepository implements HintTelaInterface {
  constructor(private readonly prisma: PrismaService) {}

  async listarLabels(idTela: number) {
    return this.prisma.aux_hint_tela.findMany({
      where: {
        id_tela: idTela,
      },
    });
  }
}
