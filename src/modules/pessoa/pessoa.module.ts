import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PessoaRepository } from './repository/pessoa.repository';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [PessoaController],
  providers: [PessoaService, PessoaRepository],
  exports: [PessoaService],
})
export class PessoaModule {}
