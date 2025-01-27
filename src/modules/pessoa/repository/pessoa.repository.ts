import { Prisma, pessoa } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Utilitarios } from 'src/shared/classes/utilitarios';

@Injectable()
export class PessoaRepository {
  constructor(private readonly prisma: PrismaService) {}

  getNextId() {
    return this.prisma.pessoa.findMany({
      select: {
        id_pessoa: true,
      },
      orderBy: {
        id_pessoa: 'desc',
      },
    });
  }

  async listar_por_id_comissoes(id_pessoa: number) {
    return await this.prisma.pessoa.findFirst({
      where: {
        id_pessoa,
        deleted_at: null,
      },
    });
  }

  listar(id_usuario: number): Promise<pessoa[]> {
    return this.prisma.pessoa.findMany({
      include: {
        endereco: true
      },
      where: {
        user_inclusao: id_usuario,
        deleted_at: null,
      },
    });
  }

  async getPessoaByCodigo(id_pessoa: number) {
    return this.prisma.pessoa.findMany({
      where: {
        id_pessoa: id_pessoa,
        deleted_at: null,
      },
      select: {
        id_pessoa: true,
        cpfCnpj: true,
      },
    });
  }

  async gravarEndereco(endereco: any) {
    return this.prisma.pessoa_endereco.create({
      data: endereco,
    });
  }

  async gravar(registro: Prisma.pessoaUncheckedCreateInput): Promise<pessoa> {
    return this.prisma.pessoa.create({
      data: registro,
    });
  }

  async remover(id_pessoa: number, id_usuario: number) {
    return await this.prisma.pessoa.delete({
      where: {
        id_pessoa,
      },
    });
  }

  async atualizar(
    registro: Prisma.pessoaUncheckedUpdateInput,
    id: number,
  ): Promise<void> {
    await this.prisma.pessoa.update({
      data: registro,
      where: {
        id_pessoa: id,
      },
    });
  }

  carregarPorHash(hash: string, id_usuario: number): Promise<pessoa> {
    return this.prisma.pessoa.findFirst({
      where: {
        hash_registro: hash,
        user_inclusao: id_usuario,
        deleted_at: null,
      },
      include: {
        endereco: true
      },
    });
  }

  async carregarPorId(id_pessoa: number, id_usuario: number) {
    return await this.prisma.pessoa.findFirst({
      where: {
        id_pessoa,
        user_inclusao: id_usuario,
        deleted_at: null,
      },
      include: {
        endereco: true
      },
    });
  }

  buscarCPF(cpfCnpj: string, id_usuario: number) {
    return this.prisma.pessoa.findFirst({
      where: {
        cpfCnpj,
        user_inclusao: id_usuario,
        deleted_at: null,
      },
      include: {
        endereco: true
      },
    });
  }

  buscarNome(nome: string, id_usuario: number) {
    return this.prisma.pessoa.findMany({
      where: {
        nome: {
          contains: nome,
        },
        user_inclusao: id_usuario,
        deleted_at: null,
      },
      include: {
        endereco: true
      },
      take: 50,
    });
  }

  buscarEmail(email: string, id_usuario: number) {
    return this.prisma.pessoa.findFirst({
      where: {
        email,
        user_inclusao: id_usuario,
        deleted_at: null,
      },
      include: {
        endereco: true
      },
    });
  }
}
