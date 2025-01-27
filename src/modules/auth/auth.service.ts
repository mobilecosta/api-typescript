import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { Utilitarios } from 'src/shared/classes/utilitarios';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
  ) {}

  async Login(email: string) {
    const usuario = await this.usuarioService.carregarPorEmail(
      email
    );

    const payload = {
      email: usuario.login_usuario,
      sub: usuario.hash_registro,
      id: usuario.id_usuario,
      perfis: usuario.perfis,
      telas: usuario.telas,
      acoes: usuario.acoes?.split(','),
      id_pessoa: usuario.id_pessoa,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario,
    };
  }

  async validarUsuario(email: string, senha: string, urlHost: string) {
    const usuario = await this.usuarioService.carregarPorEmail(email);

    const senhaHash = Utilitarios.GerarHashSenha(senha);

    if (!usuario || usuario.senha_usuario !== senhaHash) {
      throw new UnauthorizedException('Email ou senha incorreto');
    }

    if (!usuario.ind_ativo) {
      throw new UnauthorizedException('Usuário Desativado');
    }

    if (usuario.ind_bloqueado) {
      throw new UnauthorizedException('Usuário Bloqueado');
    }

    let pessoa;

    if (usuario.id_pessoa) {
      pessoa = await this.usuarioService.buscarPessoa(usuario.id_pessoa);
    }

    const hostsPermitidos = ['http://localhost:4200', 'https://inntecnet.up.railway.app'];

    const retorno = hostsPermitidos.find(
      (itHostPermitido) => itHostPermitido === urlHost,
    );

    const payload = {
      email: email,
      sub: usuario.hash_registro,
      id: usuario.id_usuario,
      perfis: usuario.perfis,
      acoes: usuario.acoes?.split(','),
      telas: usuario.telas,
      id_pessoa: usuario.id_pessoa,
      externo: retorno !== undefined ? false : true,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario,
      pessoa,
    };
  }
}
