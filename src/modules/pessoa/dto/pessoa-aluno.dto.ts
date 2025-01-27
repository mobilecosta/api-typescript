import { PartialType } from '@nestjs/swagger';
import { PessoaDTO } from './pessoa.dto';

export class PessoaAlunoDTO extends PartialType(PessoaDTO) {}
