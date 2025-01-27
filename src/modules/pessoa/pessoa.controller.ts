import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Put,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PessoaService } from './pessoa.service';
import { PessoaDTO } from './dto/pessoa.dto';
import { PessoaCPFDTO } from './dto/pessoa-cpf.dto';

@Controller('pessoa')
@ApiTags('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: [PessoaDTO] })
  @ApiOperation({ summary: 'Listar pessoas' })
  @Get()
  async listar(@Request() req) {
    const usuarioId = req['usuarioId'];
    return await this.pessoaService.listar(usuarioId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar por id' })
  @Get('one/:id_pessoa')
  async listarPoId(@Param('id_pessoa') id_pessoa: string, @Request() req) {
    const usuarioId = req['usuarioId'];

    return await this.pessoaService.listarPorId(id_pessoa, usuarioId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove pessoa' })
  @Delete(':id_pessoa')
  async remover(@Param('id_pessoa') id_pessoa: string, @Request() req) {
    const usuarioId = req['usuarioId'];
    return await this.pessoaService.remover(parseInt(id_pessoa), usuarioId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get next id' })
  @Get('get-next-id')
  async getNextId(@Request() req) {
    return await this.pessoaService.getNextId();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gravar pessoa' })
  @Post('gravar')
  async gravar(@Body() registro: any, @Req() req) {
    const usuarioId = req['usuarioId'];

    return this.pessoaService.gravar(registro, usuarioId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar pessoa' })
  @Put('atualizar')
  async atualizar(@Body() registro: PessoaDTO, @Req() req) {
    const usuarioId = req['usuarioId'];

    return this.pessoaService.atualizar(registro, usuarioId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: PessoaCPFDTO })
  @ApiOperation({ summary: 'Carregar pessoa por CPF' })
  @Get('buscar-por-cpf/:cpf')
  async buscarPorCPF(@Param('cpf') cpf: string, @Request() req) {
    const usuarioId = req['usuarioId'];
    return this.pessoaService.buscarPessoaCPF(cpf, usuarioId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: PessoaCPFDTO })
  @ApiOperation({ summary: 'Carregar pessoa por nome' })
  @Get('buscar-por-nome/:nome?')
  async buscarPorNome(@Param('nome') nome: string, @Request() req) {
    const usuarioId = req['usuarioId'];
    return this.pessoaService.buscarPessoaNome(nome, usuarioId);
  }
}
