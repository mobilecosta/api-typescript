import { Injectable } from '@nestjs/common';
import { AcaoTelaRepository } from './repository/acao-tela.repository';

@Injectable()
export class AcaoTelaService {

  constructor(
    private readonly acaoTelaRepository: AcaoTelaRepository
  )
  { }

  async carregarAcaoTela(idAcao: number, idTela: number){
    return await this.acaoTelaRepository.carregarPorTelaEAcao(idAcao, idTela)
  }

}
