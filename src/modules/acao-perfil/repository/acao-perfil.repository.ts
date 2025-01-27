import { acesso_tela } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AcaoPerfilRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(id_usuario? : number) {

    return this.prisma.acesso_usuario_acao.findMany({
      where: {
        id_usuario: id_usuario
      },
      include: {
        acesso_acao: true
      }
    });
  }

}
