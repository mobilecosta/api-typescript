//Swagger
import { SwaggerModule } from '@nestjs/swagger';
import { documentFactory } from './document.factory';
//Types
import { INestApplication } from '@nestjs/common';

export const swaggerModuleSetup = (app: INestApplication<any>) => {
  return SwaggerModule.setup('v1/api/docs', app, documentFactory(app));
};
