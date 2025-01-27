import { acesso_tela } from '@prisma/client';

export interface PermissaoTelaInterface {
  listar(ids?: number[]);
  listarPermissoesPorTela(idPerfis: number[], idTela: number);
  obterUnicaPermissao(perfis: number[], idTela: number);
}
