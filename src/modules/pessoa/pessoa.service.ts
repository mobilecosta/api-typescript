import { PessoaRepository } from './repository/pessoa.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Utilitarios } from '../../shared/classes/utilitarios';

@Injectable()
export class PessoaService {
  constructor(
    private readonly pessoaRepository: PessoaRepository
  ) {}

  async getNextId() {
    return await this.pessoaRepository.getNextId();
  }

  async listar(id_usuario: number) {
    const retorno = await this.pessoaRepository.listar(id_usuario);
    return Utilitarios.DataFormatarCliente(retorno);
  }

  async listarPorId(id_pessoa: string, id_usuario: number) {
    const retorno = await this.pessoaRepository.carregarPorId(
      +id_pessoa.replace(/^0+/, ''),
      id_usuario,
    );

    return Utilitarios.DataFormatarCliente(retorno);
  }

  async atualizar(registro: any, id_usuario: number) {
    const pessoa = await this.pessoaRepository.carregarPorHash(
      registro.hash_registro,
      id_usuario,
    );

    if (!pessoa) throw new BadRequestException('Pessoa não encontrada');

    let data: any = {
      cpfCnpj: registro.cpfCnpj,
      razao_social: registro.razao_social,
      email: registro.email,
      nome: registro.nome,
      aber_nasc: new Date(registro.aber_nasc).toISOString(),
      nome_fantasia: registro.nome_fantasia,
      status: registro.status,
      tipo_pessoa: registro.tipo_pessoa,
      user_alteracao: id_usuario,
      data_alteracao: Utilitarios.ObterData(),
      endereco: {
        update: {
          logr_endereco: registro.logr_endereco,
          num_logr_endereco: registro.num_logr_endereco,
          comp_logr_endereco: registro.comp_logr_endereco,
          bairro: registro.bairro,
          regiao: registro.regiao,
          municipio: registro.municipio,
          estado: registro.estado,
          cep: registro.cep,
        },
      },
    };

    await this.pessoaRepository.atualizar(data, pessoa.id_pessoa);
  }

  async atualizarCadastroUsuario(registro: any, id_usuario: number) {
    const pessoa = await this.pessoaRepository.carregarPorHash(
      registro.hash_registro,
      id_usuario,
    );

    if (!pessoa) throw new BadRequestException('Pessoa não encontrada');

    await this.pessoaRepository.atualizar(registro, pessoa.id_pessoa);
  }

  async remover(id_pessoa: number, id_usuario: number) {
    return await this.pessoaRepository.remover(id_pessoa, id_usuario);
  }

  async gravar(pessoa: any, id_usuario: number) {
    pessoa.user_inclusao = id_usuario;
    pessoa.user_alteracao = id_usuario;
    pessoa.hash_registro = Utilitarios.GerarHash();
    pessoa.data_inclusao = Utilitarios.ObterData();
    pessoa.data_alteracao = Utilitarios.ObterData();

    const endereco = {
      cep_endereco: pessoa.cep,
      logr_endereco: pessoa.logr_endereco,
      num_logr_endereco: pessoa.num_logr_endereco.toString(),
      comp_logr_endereco: pessoa.comp_logr_endereco,
      bairro: pessoa.bairro,
      regiao: pessoa.regiao,
      estado: pessoa.estado,
      municipio: pessoa.municipio,
      hash_registro: Utilitarios.GerarHash(),
      tipo_endereco: 'Residencial',
    };

    pessoa.endereco = {
      create: endereco,
    };

    if (pessoa.cpfCnpj) {
      const pessoa_existente = await this.pessoaRepository.buscarCPF(
        pessoa.cpfCnpj,
        id_usuario,
      );

      if (pessoa_existente && pessoa_existente.cpfCnpj == pessoa.cpfCnpj) {
        throw new BadRequestException('Cliente já cadastrado');
      }
    }

    delete pessoa.cep;
    delete pessoa.condicoes_pagamento_id;
    delete pessoa.tabela_precos_id;
    delete pessoa.logr_endereco;
    delete pessoa.num_logr_endereco;
    delete pessoa.comp_logr_endereco;
    delete pessoa.bairro;
    delete pessoa.regiao;
    delete pessoa.municipio;
    delete pessoa.estado;
    delete pessoa.percentual;
    pessoa.aber_nasc = pessoa.aber_nasc
      ? new Date(pessoa.aber_nasc).toISOString()
      : null;

    return await this.pessoaRepository.gravar(pessoa as any);
  }

  async getPessoaByCodigo(id_pessoa: number) {
    return await this.pessoaRepository.getPessoaByCodigo(id_pessoa);
  }

  async gravarEndereco(endereco: any) {
    return await this.pessoaRepository.gravarEndereco(endereco);
  }

  async buscarPessoaCPF(cpf: string, id_usuario: number) {
    const pessoa = await this.pessoaRepository.buscarCPF(cpf, id_usuario);

    if (!pessoa) return pessoa;

    return Utilitarios.DataFormatarCliente(pessoa);
  }

  async buscarPessoaNome(nome: string, id_usuario: number) {
    const pessoa = await this.pessoaRepository.buscarNome(nome, id_usuario);

    return Utilitarios.DataFormatarCliente(pessoa);
  }

  async buscarPessoaEmail(email: string, id_usuario: number) {
    const pessoa = await this.pessoaRepository.buscarEmail(email, id_usuario);

    if (!pessoa) return pessoa;

    return Utilitarios.DataFormatarCliente(pessoa);
  }
}
