//Core
import { Module } from '@nestjs/common';
//Services
import { UserService } from './user.service';
//Controllers
import { UserController } from './user.controller';
//Modules
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
