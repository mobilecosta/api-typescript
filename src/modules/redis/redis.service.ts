import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
  ) {}

  async obterPermissoes(idUsuario: number, idTela: number) {
    const chavePesquisa = `permissao:${idUsuario}:${idTela}`;

    return this.redis.get(chavePesquisa);
  }

  async gravarPermissoes(
    idUsuario: number,
    idTela: number,
    objeto: any,
  ) {
    return await this.redis.set(
      `permissao:${idUsuario}:${idTela}`,
      JSON.stringify(objeto),
      { EX: 60 * 10 },
    );
  }

  async removerChave() {
    const chavePesquisa = `permissao`;
    await this.redis.del(chavePesquisa);
  }
}
