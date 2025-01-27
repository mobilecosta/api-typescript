import { Injectable } from '@nestjs/common';
import { AcaoRepository } from './repository/acao.repository';

@Injectable()
export class AcaoService {
  constructor
    (
      private readonly acaoRepository: AcaoRepository,
  ) {}

  async listarAcoesGerais(){
    return await this.acaoRepository.listarAcoesGerais()
  }

}
