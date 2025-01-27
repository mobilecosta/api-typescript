import { PartialType } from '@nestjs/mapped-types';

export class PessoaRetornoDTO {
  hash_registro: string;
  id_pessoa: number;

  user_inclusao: number;
  user_alteracao: number;
}
