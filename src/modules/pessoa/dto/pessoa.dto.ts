import { ApiProperty } from '@nestjs/swagger';

export class PessoaDTO {
  @ApiProperty()
  id_pessoa?: number;

  @ApiProperty()
  hash_registro: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  razao_social: string;

  @ApiProperty()
  nome_fantasia: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  municipio: string;

  @ApiProperty()
  cpfCnpj: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  id_naturalidade: number;

  @ApiProperty()
  empresa_id: number;

  @ApiProperty()
  tipo_pessoa: string;

  @ApiProperty()
  aber_nasc: Date;

  @ApiProperty()
  data_inclusao?: Date;

  @ApiProperty()
  user_inclusao: number;

  @ApiProperty()
  data_alteracao?: Date;

  @ApiProperty()
  user_alteracao: number;
}
