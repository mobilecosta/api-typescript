import { Injectable } from '@nestjs/common';
import { HintTelaRepository } from './repository/hint-tela-repository';

@Injectable()
export class HintTelaService {
  constructor(private readonly hintTelaRepository: HintTelaRepository) {}

  async listarPermissoes(idTela: number) {
    return await this.hintTelaRepository.listarLabels(idTela);
  }
}
