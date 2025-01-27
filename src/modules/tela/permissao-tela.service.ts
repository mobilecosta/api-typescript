import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { HintTelaService } from '../hint-tela/hint-tela.service';
import { PermissaoTelaRepository } from './repository/permissao-tela.repository';

type Tela = {
  ListaBotoes: BotaoPermissao[];
  ListaLabels: Label[];
  ListaAcoesGenericas: AcaoGeral[];
};

type BotaoPermissao = {
  nomeBtn: string;
  esto: string;
  dc: string;
};

type Label = {
  nomeLbl: string;
  dc: string;
};

type AcaoGeral = {
  idAcao: number;
  nomeAcao: string;
  esto: string;
};

@Injectable()
export class PermissaoTelaService {
  constructor(
    private readonly permissaoTelaRepository: PermissaoTelaRepository,
    private readonly redisService: RedisService,
    private readonly hintTelaService: HintTelaService,
  ) { }

  async listarPermissoesTelas(id_usuario: number) {
    const retorno = await this.permissaoTelaRepository.listar(id_usuario);

    return retorno;
  }

  async possuiAcesso(idUsuario: number, idTela: number) {
    return await this.permissaoTelaRepository.obterUnicaPermissao(idUsuario, idTela);
  }

  async pegarTela(id_tela: number) {
    return await this.permissaoTelaRepository.pegarTela(id_tela);
  }

  async listarPermissoes(idUsuario: number, idTela: number) {
    // const retornoBotoesRedis = await this.redisService.obterPermissoes(idUsuario, idTela);

    const retornoBotoesRedis = null;

    if (retornoBotoesRedis === null || retornoBotoesRedis === undefined) {
      const retornoAcaoTela =
        await this.permissaoTelaRepository.listarPermissoesPorTela(
          idUsuario,
          +idTela,
        );
      const retornoHintTela =
        await this.hintTelaService.listarPermissoes(idTela);
      const retornoListaBotoes = new Array<BotaoPermissao>();
      const retornoListaLabels = new Array<Label>();
      const retornoListaAcoesGenericas = new Array<AcaoGeral>();

      const retornoTela: Tela = {
        ListaBotoes: [],
        ListaLabels: [],
        ListaAcoesGenericas: [],
      };

      for (const itRetornoAcaoTela of retornoAcaoTela) {
        const acaoHabilitada = itRetornoAcaoTela.acesso_acao_tela_usuario.find(
          (itAcaoTelaPerfil) =>
            itAcaoTelaPerfil.id_acao_tela === itRetornoAcaoTela.id_acao,
        );

        if (itRetornoAcaoTela.acesso_acao.nome_componente !== null) {
          const acaoBotao: BotaoPermissao = {
            dc: '',
            esto: '',
            nomeBtn: '',
          };

          //Pega o Nome do Componente
          acaoBotao.nomeBtn = itRetornoAcaoTela.acesso_acao.nome_componente;

          //Pega a Descrição do Botão
          if (itRetornoAcaoTela.descricao_acao !== null) {
            acaoBotao.dc = itRetornoAcaoTela.descricao_acao;
          } else {
            acaoBotao.dc = itRetornoAcaoTela.acesso_acao.descricao;
          }

          //Define as Permissões
          if (acaoHabilitada !== null && acaoHabilitada !== undefined) {
            acaoBotao.esto = 'e';
          } else {
            acaoBotao.esto = 'd';
          }

          retornoListaBotoes.push(acaoBotao);
        } else {
          const acaoGeral: AcaoGeral = {
            idAcao: 0,
            nomeAcao: '',
            esto: '',
          };

          acaoGeral.nomeAcao = itRetornoAcaoTela.acesso_acao.nome_acao;
          acaoGeral.idAcao = itRetornoAcaoTela.acesso_acao.id_acao;

          if (acaoHabilitada !== null && acaoHabilitada !== undefined) {
            acaoGeral.esto = 't';
          } else {
            acaoGeral.esto = 'f';
          }

          retornoListaAcoesGenericas.push(acaoGeral);
        }
      }

      for (const itRetornoHintTela of retornoHintTela) {
        const acaoLabel: Label = {
          dc: '',
          nomeLbl: '',
        };

        acaoLabel.nomeLbl = itRetornoHintTela.campo_tela;
        acaoLabel.dc = itRetornoHintTela.hint;

        retornoListaLabels.push(acaoLabel);
      }

      retornoTela.ListaBotoes = retornoListaBotoes;
      retornoTela.ListaLabels = retornoListaLabels;
      retornoTela.ListaAcoesGenericas = retornoListaAcoesGenericas;

      // await this.redisService.gravarPermissoes(idUsuario, idTela, retornoTela);

      return retornoTela;
    }

    return retornoBotoesRedis;
  }
}
