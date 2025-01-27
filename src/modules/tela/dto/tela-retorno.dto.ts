import { acesso_acao_tela } from '@prisma/client';

export class TelaRetornoDTO implements acesso_acao_tela {
  descricao_acao: string;
  id_acao_tela: number;
  hash_registro: string;
  id_acao: number;
  id_tela: number;
  user_inclusao: number;
  data_inclusao: Date;
  user_alteracao: number;
  data_alteracao: Date;
  acesso_perfil_acaoId_acesso_perfil_acao: number;
  id_acesso_acao_tela: number;
  ativo: boolean;
}
