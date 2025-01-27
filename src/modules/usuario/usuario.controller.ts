import { Request, Controller, Body, Post, Get, Put, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsuarioCriarDto } from './dto/usuario-create.dto';

@Controller('usuario')
@ApiTags('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  @ApiOperation({ summary: 'Gravar incluir usuário' })
  @ApiBody({
    description: 'Dados para gravar o incluir usuário',
    type: UsuarioCriarDto,
  })
  @ApiResponse({ status: 201, description: 'Usuário gravado com sucesso.' })
  async gravar(@Body() body: UsuarioCriarDto, @Request() req) {
    const usuarioId = req['usuarioId'];
    return await this.usuarioService.gravar(body, usuarioId);
  }

  @Post('ligar-tela')
  async ligarTela(@Body() body: any, @Request() req) {
    return await this.usuarioService.ligarTela(body);
  }

  @Delete('desligar-tela/:userId/:telaId')
  async desligarTela(@Body() body: any, @Request() req) {
    const userId = req.params.userId;
    const telaId = req.params.telaId;
    return await this.usuarioService.desligarTela(+userId, +telaId);
  }

  @Get('listar-telas')
  async listar_telas(@Request() req) {
    const usuarioId = req['usuarioId'];
    return await this.usuarioService.listaTelas(+usuarioId);
  }

  @Get('listar-acessos/:id')
  async listar_acessos(@Request() req) {
    const id = req.params.id;
    return await this.usuarioService.listaAcessos(+id);
  }

  @Get('listar')
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários.' })
  async listar() {
    return this.usuarioService.listar();
  }

  @Get('listar-menu')
  @ApiOperation({ summary: 'Listar menu do usuário' })
  @ApiResponse({ status: 200, description: 'Menu listado com sucesso.' })
  async listarMenu(@Request() req) {
    const usuarioId = req['usuarioHash'];

    return this.usuarioService.listarMenu(usuarioId);
  }

  @Put(':id')
  async atualizar(@Body() body: any, @Request() req) {
    const usuario_id = req['usuarioId'];
    const id = req.params.id;

    return await this.usuarioService.atualizar(body, parseInt(usuario_id), parseInt(id));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listar usuário por id' })
  @ApiResponse({ status: 200, description: 'listado com sucesso.' })
  async listarPorId(@Request() req) {
    const id = req.params.id;

    return this.usuarioService.buscarPorId(parseInt(id));
  }
}
