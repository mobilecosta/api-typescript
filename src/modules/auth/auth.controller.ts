import {
  Controller,
  Post,
  Body,
  Req,
  Param,
  Get,
  Headers,
} from '@nestjs/common';
import { Public } from './constantes';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('validar-usuario')
  async validarUsuario(
    @Body() data: LoginDto,
    @Req() request: Request,
    @Headers() headers,
  ) {
    const urlHost = request.headers['origin'];

    return this.authService.validarUsuario(data.login, data.senha, urlHost);
  }

  @Get('login/:hash')
  async login(@Param('hash') hash: string, @Req() req) {
    const email = req['email'];

    return this.authService.Login(email);
  }

  @Get('cadastro')
  async cadastro(@Body() hash: string, @Req() req) {
    const email = req['email'];

    return this.authService.Login(email);
  }
}
