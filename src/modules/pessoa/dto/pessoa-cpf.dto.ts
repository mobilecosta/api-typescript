import { PartialType } from '@nestjs/swagger';
import { PessoaDTO } from './pessoa.dto';

export class PessoaCPFDTO extends PartialType(PessoaDTO) {}
