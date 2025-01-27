import { Injectable } from '@nestjs/common';
import { AcaoTelaService } from 'src/modules/acao/modules/acao-tela/acao-tela.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';


@Injectable()
export class PermissaoGuardService {
  constructor(
    private readonly acaoTelaService: AcaoTelaService,
    private readonly prisma: PrismaService
  ) { }

  async carregarAcaoTela(idTela: number, idAcao: number){
    return this.prisma.acesso_acao_tela.findFirst({
      where: {
        id_tela: idTela,
        id_acao: idAcao
      }
    })
  }

  async carregarPermissao(id_usuario: number, idAcaoTela: number){
    return this.prisma.acesso_acao_tela_usuario.findMany({
      where: {
        id_usuario,
        id_acao_tela: idAcaoTela
      }
    })
  }

}
