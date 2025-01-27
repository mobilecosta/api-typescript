import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissaoTelaRepository {
  constructor(private readonly prisma: PrismaService) { }

  listar(id_usuario?: number) {
    return this.prisma.acesso_acao_tela_usuario.findMany({
      where: {
        id_usuario: id_usuario,
      },
      include: {
        acesso_acao_tela: {
          include: {
            acesso_tela: true,
          },
        },
      },
    });
  }

  listarPermissoesPorTela(id_usuario: number, idTela: number) {
    return this.prisma.acesso_acao_tela.findMany({
      include: {
        acesso_tela: {
          where: {
            id_tela: idTela,
          },
        },
        acesso_acao_tela_usuario: {
          where: {
            id_usuario: id_usuario,
          },
        },
        acesso_acao: true,
      },
      where: {
        id_tela: idTela,
      },
    });
  }

  async pegarTela(id_tela: number) {
    return await this.prisma.acesso_tela.findFirst({
      where: {
        id_tela: id_tela,
      },
    });
  }

  async obterUnicaPermissao(id_usuario: number, idTela: number) {
    return await this.prisma.acesso_usuario_tela.findFirst({
      include: {
        acesso_tela: true,
      },
      where: {
        id_tela: idTela,
        id_usuario: id_usuario,
        ind_ativo: true,
        acesso_visual: true,
      },
    });
  }
}
