import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";

export class UsuarioCriarDto
  implements Prisma.usuarioUncheckedCreateInput
{
  @IsOptional()
  id_usuario: number | undefined;

  @IsString()
  @ApiProperty()
  nome_usuario: string;

  email_usuario: string;

  departamento_usuario?: string;

  @IsString()
  @ApiProperty()
  login_usuario: string;

  @IsOptional()
  @ApiProperty()
  senha_usuario: string;

  @IsOptional()
  hash_registro: string;

  @IsOptional()
  user_inclusao: number | undefined;

  @IsOptional()
  user_alteracao: number | undefined;

  id_pessoa?: number;

  data_hora_bloqueio?: Date | string | null;
  data_hora_inativa?: Date | string | null;
  data_hora_expira?: Date | string | null;

  ind_bloqueado?: boolean;
  ind_expira_senha?: boolean;

  @ApiProperty()
  ind_ativo: boolean;

  acesso_usuario_perfil?: any;
  acesso_usuario_unidade?: any;
  data_alteracao: any;
  data_inclusao: any;
}
