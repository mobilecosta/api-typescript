import { UsuarioRepository } from './repository/usuario.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PerfilTelaRetorno } from './dto/perfil-tela-retorno.dto';
import { AcaoPerfilService } from '../acao-perfil/acao-perfil.service';
import { PermissaoTelaService } from '../tela/permissao-tela.service';
import { Utilitarios } from 'src/shared/classes/utilitarios';
import { AcessoMenuUsuario } from './dto/acesso-menu-usuario.dto';
import { MenuService } from '../menu/menu.service';
import { Prisma } from '@prisma/client';

//Trocar depois
class RetornoPermissoesDTO {
  id_tela: number;
  acoes: number[];
}

@Injectable()
export class UsuarioService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly permissaoTelaService: PermissaoTelaService,
    private readonly acaoPerfilService: AcaoPerfilService,
    private readonly menuService: MenuService,
  ) { }

  async listar() {
    return this.usuarioRepository.listar();
  }

  async carregarPorEmail(
    email: string,
  ): Promise<any> {
    const permissoesRetorno: RetornoPermissoesDTO[] = [];
    const permissoesGeraisRetorno: number[] = [];

    const retorno = await this.usuarioRepository.buscarUsuarioLogin(email);

    if (retorno) {
      const telas = await this.usuarioRepository.buscarTelas(retorno.id_usuario);

      retorno.telas = [];

      const permissoesTelas =
        await this.permissaoTelaService.listarPermissoesTelas(retorno.id_usuario);
      const permissoesGerais = await this.acaoPerfilService.listarPermissoes(retorno.id_usuario);

      if (permissoesGerais.length > 0) {
        permissoesGerais.forEach((itPermissao) => {
          permissoesGeraisRetorno.push(itPermissao.id_acao);
        });
      }

      if (permissoesTelas.length > 0) {
        permissoesTelas.forEach((itPermissao) => {
          const permissaoRetorno = new RetornoPermissoesDTO();

          const existeAcoesatual = permissoesRetorno.find(
            (itPermissaoRet) =>
              itPermissaoRet.id_tela === itPermissao.acesso_acao_tela.id_tela,
          );

          if (existeAcoesatual) {
            if (
              !existeAcoesatual.acoes.find(
                (itAcao) => itPermissao.acesso_acao_tela.id_acao === itAcao,
              )
            ) {
              existeAcoesatual.acoes.push(itPermissao.acesso_acao_tela.id_acao);
              return;
            }
          } else {
            permissaoRetorno.id_tela = itPermissao.acesso_acao_tela.id_tela;
            permissaoRetorno.acoes = [itPermissao.acesso_acao_tela.id_acao];
            permissoesRetorno.push(permissaoRetorno);
          }
        });

        permissoesRetorno.reduce((itPermisao, atual) => {
          const existeIgual = itPermisao.find(
            (itRetornoDTO) => itRetornoDTO.id_tela === atual.id_tela,
          );

          if (existeIgual) {
            existeIgual.acoes = [
              ...new Set([...existeIgual.acoes, ...atual.acoes]),
            ]; // Combina e remove duplicados
          } else {
            itPermisao.push({ ...atual });
          }

          return itPermisao;
        }, []);
      }

      let item_aux: PerfilTelaRetorno;

      for (const item of telas) {
        item_aux = new PerfilTelaRetorno();

        item_aux.id_tela = item.id_tela;
        item_aux.permissoes = [];

        if (item.acesso_visual) {
          item_aux.permissoes.push('v');
        }

        if (item.acesso_criacao) {
          item_aux.permissoes.push('c');
        }

        if (item.acesso_edicao) {
          item_aux.permissoes.push('e');
        }

        if (item.acesso_impressao) {
          item_aux.permissoes.push('i');
        }

        if (item.acesso_exclusao) {
          item_aux.permissoes.push('r');
        }

        retorno.telas.push({ ...item_aux });
      }
    }

    // retorno.permissoes = permissoesRetorno;
    // retorno.permissoesGerais = permissoesGeraisRetorno;

    return retorno;
  }

  async ligarTela(data: any) {
    return await this.usuarioRepository.ligarTela(data);
  }

  async desligarTela(id_usuario: number, id_tela: number) {
    return await this.usuarioRepository.desligarTela(id_usuario, id_tela);
  }

  async listaTelas(usuario_id: number) {
    return {
      items: await this.usuarioRepository.listaTelas(usuario_id)
    }
  }

  async listaAcessos(id_usuario: number) {
    return await this.usuarioRepository.listarAcessos(id_usuario)
  }

  async buscarPorId(id_usuario: number) {
    let response = await this.usuarioRepository.carregarPorId(id_usuario);
    return { ...response };
  }

  async buscarPessoa(id_pessoa: number) {
    return this.usuarioRepository.buscarPessoa(id_pessoa);
  }

  async buscarPerfis(idUsuario: number) {
    return this.usuarioRepository.buscarTelas(idUsuario);
  }

  async gravar(usuario: any, usuarioID: number) {
    usuario.hash_registro = Utilitarios.GerarHash();
    usuario.data_inclusao = Utilitarios.ObterData();
    usuario.data_alteracao = Utilitarios.ObterData();

    usuario.user_inclusao = usuarioID ? usuarioID : 0;
    usuario.user_alteracao = usuarioID ? usuarioID : 0;

    delete usuario.id_usuario;

    usuario.senha_usuario = Utilitarios.GerarHashSenha(usuario.senha_usuario);

    usuario.ind_expira_senha = false;

    delete  usuario.percentual;
    return await this.usuarioRepository.gravar(usuario);
  }

  async listarMenu(
    usuarioId: string,
  ): Promise<AcessoMenuUsuario[]> {
    const acessoUsuario = await this.usuarioRepository.listarMenus(
      usuarioId
    );

    return this.montarArvore(acessoUsuario, null);
  }

  private montarArvore(
    array: AcessoMenuUsuario[],
    colunaPai: number | null,
  ): AcessoMenuUsuario[] {
    const menuspai = array.filter((ar) => ar.id_menu_pai === colunaPai);

    for (const mp of menuspai) {
      mp.filhos = this.montarArvore(array, mp.id_menu);
    }

    return menuspai;
  }

  async atualizar(data: any, id_usuario: number, id) {
    data.user_alteracao = id_usuario;
    data.data_alteracao = Utilitarios.ObterData();
    return await this.usuarioRepository.atualizar(data, parseInt(id));
  }

  async deletarUsuario(id_usuario: number) {
    return await this.usuarioRepository.deletarUsuario(id_usuario);
  }
}
