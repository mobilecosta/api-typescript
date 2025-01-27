import { SetMetadata } from '@nestjs/common';

export const jwtConstantes = {
  chave: '60219b59906d4dc996988525ec1a1c78',
  expiresIn: '24h',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
