import { Prisma, acesso_acao } from '@prisma/client';


export interface AcaoInterface {
  listarAcoesGerais(): Promise<acesso_acao[]>;
}
