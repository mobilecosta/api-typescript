//Swagger
import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('API Base Autenticação')
  .setDescription(
    'Documentação do gerenciamento de autenticação e usuários',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();
