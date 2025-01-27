import { Prisma, acesso_acao_tela } from '@prisma/client';


export interface AcaoTelaInterface {
  carregarPorTelaEAcao(idAcao: number, idTela: number): Promise<acesso_acao_tela>
}
