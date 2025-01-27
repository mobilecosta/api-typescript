import { Prisma, usuario } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Utilitarios } from 'src/shared/classes/utilitarios';
import { RedisService } from 'src/modules/redis/redis.service';

@Injectable()
export class UsuarioRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async listar() {
    return this.prisma.usuario.findMany({
      where: {
        ind_ativo: true,
        deleted_at: null,
      }
    });
  }

  carregarPorId(id_usuario: number) {
    return this.prisma.usuario.findFirst({
      where: {
        id_usuario,
        deleted_at: null,
      }
    });
  }

  async buscarTelas(id_usuario: number) {
    return this.prisma.acesso_usuario_tela.findMany({
      where: {
        id_usuario,
      },
    });
  }

  async atualizar(
    usuario: Prisma.usuarioUncheckedUpdateInput,
    id: number,
  ) {
    return await this.prisma.usuario.update({
      data: usuario,
      where: {
        id_usuario: id,
        deleted_at: null,
      },
    });
  }

  async buscarUsuarioLogin(email: string): Promise<any> {
    const strSQL = Prisma.sql`select au.ind_ativo, au.ind_bloqueado, au.id_usuario, au.nome_usuario, au.hash_registro,
    au.login_usuario, au.senha_usuario,
    string_agg(distinct cast(apt.id_tela as varchar(6)), ',') as telas,
    string_agg(distinct cast(pa.id_acao as varchar(6)), ',') as acoes
    from usuario au
    left join acesso_usuario_tela apt on apt.id_usuario = au.id_usuario
    left join acesso_usuario_acao pa on pa.id_usuario = au.id_usuario
    where au.login_usuario = ${email} 
    group by au.id_usuario, au.nome_usuario, au.hash_registro, au.login_usuario, au.senha_usuario`;

    const resultado = await this.prisma.$queryRaw(strSQL);

    return resultado[0] || null;
  }

  buscarPorEmail(email: string): Promise<usuario> {
    return this.prisma.usuario.findFirst({
      where: {
        login_usuario: email,
        deleted_at: null,
      },
    });
  }

  async buscarPessoa(id_pessoa: number | null) {
    return this.prisma.pessoa.findFirst({
      where: {
        id_pessoa: id_pessoa,
        deleted_at: null,
      },
    });
  }

  async gravarAcao(
    data: Prisma.acesso_acao_tela_usuarioUncheckedCreateInput,
  ): Promise<void> {
    await this.prisma.acesso_acao_tela_usuario.create({
      data: data,
    });

    return null;
  }

  async gravar(usuario: Prisma.usuarioUncheckedCreateInput) {
    return await this.prisma.usuario.create({
      data: usuario,
    });
  }

  async ligarTela(
    data: Prisma.acesso_usuario_telaUncheckedCreateInput,
  ) {
    data.ind_ativo = true;

    return await this.prisma.acesso_usuario_tela.create({
      data: data,
    });
  }

  async listarAcessos(id_usuario: number) {
    return await this.prisma.acesso_usuario_tela.findMany({
      where: {
        id_usuario,
      },
      include: {
        acesso_tela: true,
      },
    });
  }

  async desligarTela(id_usuario: number, id_tela: number) {
    return await this.prisma.acesso_usuario_tela.deleteMany({
      where: {
        id_usuario,
        id_tela,
      },
    });
  }

  async listaTelas(usuario_id: number) {
    return await this.prisma.acesso_tela.findMany({});
  }

  async listarMenus(usuarioHash: string): Promise<any> {
    const strSQL = Prisma.sql`select distinct am.*
    from acesso_menu am
    join acesso_tela at2 on at2.id_tela = am.id_tela
    join acesso_usuario_tela apt on apt.id_tela = at2.id_tela
    join acesso_usuario au on au.id_usuario = apt.id_usuario where au.hash_registro = ${usuarioHash}`;

    return await this.prisma.$queryRaw(strSQL);
  }

  async deletarUsuario(id_usuario: number) {
    return await this.prisma.usuario.delete({
      where: {
        id_usuario,
      },
    });
  }
}
