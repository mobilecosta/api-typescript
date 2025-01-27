import { Injectable } from '@nestjs/common';
import { AcaoPerfilRepository } from './repository/acao-perfil.repository';

@Injectable()
export class AcaoPerfilService {
  constructor(
    private readonly acaoPerfilRepository: AcaoPerfilRepository,
  ) { }

  async listarPermissoes(id_usuaario: number) {
    const retorno = await this.acaoPerfilRepository.listar(id_usuaario);
    return retorno;
  }
}
